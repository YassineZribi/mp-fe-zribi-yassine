import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  constructor(private produitsService: ProduitsService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
  }

  produits: Array<Produit> = [];
  produitCourant = new Produit();
  afficherFormulaire: boolean = false;

  supprimer(p: Produit) {
    // Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez vous supprimer le produit : " + p.designation + " ?");
    if (reponse == true) {
      this.supprimerProduit(p);
    }
    else {
      console.log("Suppression annulée...");
    }
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined) {
      console.log("id non vide...");
      for (const p of this.produits) {
        console.log(p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id == form.value.id) {
          // Produit existe (mode EDIT)
          console.log('ancien');
          let reponse: boolean =
            confirm("Confirmez vous la mise à jour de :" + p.designation + " ?");
          if (reponse == true) {
            this.mettreAJourProduit(form.value, p);
          } 
          else {
            console.log("Mise à jour annulée");
          }
          // Quitter la méthode
          return;
        }
      }
    }
    else {
      console.log("id vide...");
    }
  }

  mettreAJourProduit(nouveau: Produit, ancien: Produit) {
    //Appeler la méthode 'updateProduit' du service pour mettre à jour un produit 
    this.produitsService.updateProduit(nouveau.id, nouveau)
      .subscribe(
        {
          //En cas de succès
          next: updatedProduit => {
            console.log("Succès PUT");
            //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
            ancien.code = nouveau.code;
            ancien.designation = nouveau.designation;
            ancien.prix = nouveau.prix;
            console.log('Mise à jour du produit:'
              + ancien.designation);
              // Cacher le formulaire après validation de la modification du produit existant
            this.afficherFormulaire = false;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur PUT");
          }
        }
      )
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

  supprimerProduit(produit: Produit) {
    //Appeler la méthode 'deleteProduit' du service pour supprimer un produit
    this.produitsService.deleteProduit(produit.id)
      .subscribe(
        {
          //En cas de succès
          next: deletedProduit => {
            console.log("Succès DELETE");
            // Suppression du produit aussi dans le tableau "produits" (FrontEnd)
            // Chercher l'indice du produit à supprimer 
            let index: number = this.produits.indexOf(produit);
            console.log("indice du produit à supprimer: " + index);
            if (index !== -1) {
              // Supprimer le produit référencé
              this.produits.splice(index, 1);
              console.log("Suppression du produit:" + produit.designation);
            }
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur DELETE");
          }
        }
      )
  }

  selectionnerProduit(produit: Produit) {
    this.afficherFormulaire = true;
    
    // méthodes pour éviter le passage par référence
    
    // méthode 1
    this.produitCourant.id = produit.id;
    this.produitCourant.code = produit.code;
    this.produitCourant.designation = produit.designation;
    this.produitCourant.prix = produit.prix;

    // méthode 2 (en utilisant le spread operator)
    // this.produitCourant = {...produit}
  }
}

