import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, shareReplay, switchMap, tap } from 'rxjs';
import { Categorie, Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'https://api.escuelajs.co/api/v1';

  private http = inject(HttpClient);
  private _products$ = new BehaviorSubject<Product[]>([]);
  private _categories$ = new BehaviorSubject<Categorie[]>([]);


  public _getProductsList(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  public _getCategoryList(){
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }
  public _getProductsByCategorie(id: string){
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${id}/products`);
  }

  public getProductsList(){
    return this._products$.pipe(
      switchMap(() => this._getProductsList()),
      shareReplay()
    )
  }

  public getCategoryList(){
    return this._categories$.pipe(
      switchMap(() => this._getCategoryList()),
      shareReplay()
    )
  }


}
