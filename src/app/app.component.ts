import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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
    {titre: "Liste des categories", route: "/categories", icon: "bi bi-list-task"},
    {titre: "Ajouter catégorie", route: "/ajouterCategorie", icon: "bi bi-plus-circle"},
  ]

  actionCourante: any;

  constructor(private router: Router) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        /* Your code goes here on every router change */
        this.actionCourante = this.actions.find(action => action.route == router.url);
      }
    });
  }

  setActionCourante(a:any) {
    this.actionCourante=a;
  }
}
