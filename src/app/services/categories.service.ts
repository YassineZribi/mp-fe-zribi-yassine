import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  
  // Url du service web de gestion de categroies
  // commune pour toutes les méthodes
  urlHote="http://localhost:3333/categories/";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Array<Categorie>> {
    return this.http.get<Array<Categorie>>(this.urlHote);
  }

  deleteCategorie(idP: number | undefined) {
    // return this.http.delete(this.urlHote + idP);
    return this.http.get(this.urlHote + "delete/" + idP);
  }

  addCategorie(nouveau: Categorie) {
    return this.http.post<Categorie>(this.urlHote, nouveau);
  }

  updateCategorie(idP: number | undefined, nouveau: Categorie) {
    // return this.http.put<Produit>(this.urlHote + idP, nouveau);
    return this.http.put<Categorie>(this.urlHote, nouveau);
  }
}
