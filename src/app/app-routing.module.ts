import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { CategoriesComponent } from './categories/categories.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';

const routes: Routes = [
  {path: "accueil", component: AccueilComponent},
  {path: "produits", component: ProduitsComponent},
  {path: "ajouterProduit", component: AjoutProduitComponent},
  {path: "categories", component: CategoriesComponent},
  {path: "ajouterCategorie", component: AjoutCategorieComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
