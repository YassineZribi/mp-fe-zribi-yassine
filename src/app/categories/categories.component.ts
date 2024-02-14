import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { Categorie } from '../model/categorie';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    this.dtOptions = {
      pageLength: 5,
      pagingType: 'full_numbers'
    }
    //charger les données
    this.consulterProduits();
    this.consulterCategories();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  categorieCourante = new Categorie();
  afficherFormulaire: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  supprimer(c: Categorie) {
    // Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez vous supprimer la catégorie : " + c.libelle + " ?");
    if (reponse == true) {
      this.supprimerCategorie(c);
    }
    else {
      console.log("Suppression annulée...");
    }
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    //this.categories.push(this.categorieCourante);
    if (form.value.id != undefined) {
      console.log("id non vide...");
      for (const c of this.categories) {
        console.log(c.code + ' : ' + c.libelle);
        if (c.id == form.value.id) {
          // supprimerCategorie existe (mode EDIT)
          console.log('ancien');
          let reponse: boolean =
            confirm("Confirmez vous la mise à jour de :" + c.libelle + " ?");
          if (reponse == true) {
            this.mettreAJourCategorie(form.value, c);
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

  mettreAJourCategorie(nouveau: Categorie, ancien: Categorie) {
    //Appeler la méthode 'updateCategorie' du service pour mettre à jour une categorie 
    this.categoriesService.updateCategorie(nouveau.id, nouveau)
      .subscribe(
        {
          //En cas de succès
          next: updatedCategorie => {
            console.log("Succès PUT");
            console.log(updatedCategorie)
            //mettre à jour la categorie aussi dans le tableau "categories" (FrontEnd)
            ancien.code = nouveau.code;
            ancien.libelle = nouveau.libelle;
            this.toastComponent.openToast(`Catégorie ${ancien.id} modifiée !`);
            this.rerender();
            console.log('Mise à jour de la categorie:'
              + ancien.libelle);
              // Cacher le formulaire après validation de la modification de la categorie existante
            this.afficherFormulaire = false;
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur PUT");
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
            this.rerender();
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur GET");
          }
        }
      )
  }

  supprimerCategorie(categorie: Categorie) {
    //Appeler la méthode 'deleteCategorie' du service pour supprimer une categorie
    this.categoriesService.deleteCategorie(categorie.id)
      .subscribe(
        {
          //En cas de succès
          next: deletedCategorie => {
            console.log("Succès DELETE");
            // Suppression de la categorie aussi dans le tableau "categories" (FrontEnd)
            // Chercher l'indice de la categorie à supprimer 
            let index: number = this.categories.indexOf(categorie);
            console.log("indice de la catégorie à supprimer: " + index);
            if (index !== -1) {
              // Supprimer la categorie référencée
              this.categories.splice(index, 1);
              this.toastComponent.openToast(`Catégorie "${categorie.libelle}" supprimée !`);
              this.rerender();
              console.log("Suppression de la categorie:" + categorie.libelle);
            }
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur DELETE");
          }
        }
      )
  }

  selectionnerCategorie(categorie: Categorie) {
    this.afficherFormulaire = true;
    console.log(categorie)
    // méthodes pour éviter le passage par référence
    
    // méthode 1
    this.categorieCourante.id = categorie.id;
    this.categorieCourante.code = categorie.code;
    this.categorieCourante.libelle = categorie.libelle;

    // méthode 2 (en utilisant le spread operator)
    // this.produitCourant = {...categorie}
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

  nbProduits(categoryId: number|undefined) {
    let nb = 0;
    for (const p of this.produits) {
      if (p.categorie?.id === categoryId)
        nb++;
    }

    return nb;
  }
}
