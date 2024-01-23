import { Component, OnInit, ViewChild } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Categorie } from '../model/categorie';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produits: Array<Produit> = [];
  nouveauProduit: Produit = new Produit();
  categories: Array<Categorie> = [];
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(
    private produitsService: ProduitsService, 
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
    this.consulterCategories();
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
    this.ajouterProduit(form.value)
    form.reset()    
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
            console.log(nouveau)
            console.log(createdProduit)
            this.produits.push(createdProduit);
            console.log("Ajout d'un nouveau produit:" + nouveau.designation);
            this.toastComponent.openToast("Produit ajouté !");
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur POST");
          }
        }
      )
  }

  consulterCategories() {
    console.log("Récupérer la liste des categories");
    //Appeler la méthode 'getCategories' du service pour récupérer les données du JSON
    this.categoriesService.getCategories()
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            this.categories = data;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }
}
