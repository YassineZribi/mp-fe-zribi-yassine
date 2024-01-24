import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { Categorie } from '../model/categorie';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  produits: Array<Produit> = [];
  categories: Array<Categorie> = [];
  data = [
    {name: "produits", route: "/produits", icon: "bi bi-cart3"},
    {name: "categories", route: "/categories", icon: "bi bi-diagram-3"},
  ] as const;

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) { }
  
  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant
    console.log("Initialisation du composant:.....");
    //charger les données
    this.consulterProduits();
    this.consulterCategories();
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

  getNbElements(name: typeof this.data[number]['name']) {
    if (name == 'produits')
      return this.produits.length;
    else if (name == 'categories')
      return this.categories.length;
    // sinon
    return 0;
  }
}
