import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:3333/produits/";

  constructor(private http: HttpClient) { }

  getProduits(categoryId?: number): Observable<Array<Produit>> {
    let params = new HttpParams();
    if (categoryId !== undefined) {
      params = params.set('categoryId', categoryId);
    }
    return this.http.get<Array<Produit>>(this.urlHote, {params: params});
  }

  deleteProduit(idP: number | undefined) {
    // return this.http.delete(this.urlHote + idP);
    return this.http.get(this.urlHote + "delete/" + idP);
  }

  addProduit(nouveau: Produit) {
    return this.http.post<Produit>(this.urlHote, nouveau);
  }

  updateProduit(idP: number | undefined, nouveau: Produit) {
    // return this.http.put<Produit>(this.urlHote + idP, nouveau);
    return this.http.put<Produit>(this.urlHote, nouveau);
  }
}
