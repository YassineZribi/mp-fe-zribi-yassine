import { Component, OnInit, ViewChild } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Categorie } from '../model/categorie';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
    this.consulterCategories();
  }

  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  produitCourant = new Produit();
  categorieCouranteId = -1;
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
    console.log(form.value.categorie)
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
            console.log(updatedProduit)
            //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd)
            ancien.code = nouveau.code;
            ancien.designation = nouveau.designation;
            ancien.prix = nouveau.prix;
            ancien.categorie = nouveau.categorie;
            this.toastComponent.openToast(`Produit ${ancien.id} modifié !`);
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

  consulterProduits(categoryId?: number) {
    console.log("Récupérer la liste des produits");
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON
    this.produitsService.getProduits(categoryId)
      .subscribe(
        {
          //En cas de succès
          next: data => {
            console.log("Succès GET");
            console.log(data);
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
              this.toastComponent.openToast(`Produit "${produit.designation}" supprimé !`);
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
    console.log(produit)
    // méthodes pour éviter le passage par référence
    
    // méthode 1
    this.produitCourant.id = produit.id;
    this.produitCourant.code = produit.code;
    this.produitCourant.designation = produit.designation;
    this.produitCourant.prix = produit.prix;
    this.produitCourant.categorie = produit.categorie;

    // méthode 2 (en utilisant le spread operator)
    // this.produitCourant = {...produit}
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
  
  onSelectChange(newOption: string) {
    console.log('Selected Option:', newOption);
    this.consulterProduits(newOption == "" ? undefined : Number(newOption))
  }
}

