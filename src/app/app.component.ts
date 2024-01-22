import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions: Array<any> = [
    {titre: "Accueil", route: "/accueil", icon: "bi bi-house"},
    {titre: "Liste des produits", route: "/produits", icon: "bi bi-list-task"},
    {titre: "Ajouter produit", route: "/ajouterProduit", icon: "bi bi-plus-circle"},
  ]

  actionCourante:any;

  setActionCourante(a:any) {
    this.actionCourante=a;
  }
}
