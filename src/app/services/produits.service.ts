import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  // Url du service web de gestion de produits
  // commune pour toutes les méthodes
  urlHote = "http://localhost:9999/produits/";

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  deleteProduit(idP: number | undefined) {
    return this.http.delete(this.urlHote + idP);
  }

  addProduit(nouveau: Produit) {
    return this.http.post<Produit>(this.urlHote, nouveau);
  }

  updateProduit(idP: number | undefined, nouveau: Produit) {
    return this.http.put<Produit>(this.urlHote + idP, nouveau);
  }
}
