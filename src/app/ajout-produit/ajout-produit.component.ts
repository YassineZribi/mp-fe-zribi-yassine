import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produits: Array<Produit> = [];
  nouveauProduit: Produit = new Produit();

  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
  }

  consulterProduits() {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits()
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.produits = data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined) {
      console.log("id non vide...");
      for (const p of this.produits) {
        console.log(p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id == form.value.id) {
          // Produit existe
          alert("Identificateur de produit déjà existant..");
          // Quitter toute la méthode
          return;
        }
      }
      this.ajouterProduit(form.value)
      form.reset()
    }
    else {
      console.log("id vide...");
    }
  }

  ajouterProduit(nouveau: Produit) {
    //Appeler la méthode 'addProduit' du service pour ajouter un produit 
    this.produitsService.addProduit(nouveau)
      .subscribe(
        {
          //En cas de succès
          next: createdProduit => {
            console.log("Succès POST");
            console.log('nouveau');
            // Ajout du nouveau produit aussi dans le tableau "produits" (FrontEnd)
            this.produits.push(nouveau);
            console.log("Ajout d'un nouveau produit:" + nouveau.designation);
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur POST");
          }
        }
      )
  }
}
