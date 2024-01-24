import { Component, ViewChild } from '@angular/core';
import { Categorie } from '../model/categorie';
import { ToastComponent } from '../toast/toast.component';
import { CategoriesService } from '../services/categories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent {
  nouvelleCategorie: Categorie = new Categorie();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  constructor( 
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    this.ajouterCategorie(form.value)
    form.reset()    
  }

  ajouterCategorie(nouveau: Categorie) {
    //Appeler la méthode 'addCategorie' du service pour ajouter une categorie 
    this.categoriesService.addCategorie(nouveau)
      .subscribe(
        {
          //En cas de succès
          next: createdCategorie => {
            console.log("Succès POST");
            console.log('nouveau');
            // Ajout de la nouvelle categorie aussi dans le tableau "categories" (FrontEnd)
            console.log(nouveau)
            console.log(createdCategorie)
            console.log("Ajout d'une nouvelle catégorie:" + nouveau.libelle);
            this.toastComponent.openToast("Catégorie ajoutée !");
          },
          //En cas d'erreur
          error: err => {
            console.log("Erreur POST");
          }
        }
      )
  }
}
