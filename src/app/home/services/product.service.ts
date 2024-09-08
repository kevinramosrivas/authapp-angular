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
  private _productsByCategorie$ = new BehaviorSubject<Product[]>([]);


  private _getProductsList(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  private _getCategoryList(){
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }
  private _getProductsByCategorie(id: string){
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${id}/products`);
  }

  private _getProductsByRangePrice(minPrice: number, maxPrice: number){
    return this.http.get<Product[]>(`${this.baseUrl}/products/?price_min=${minPrice}&price_max=${maxPrice}`);
  }

  private _getProductsByCategoryAndRangePrice(id: number, minPrice: number, maxPrice: number){
    return this.http.get<Product[]>(`${this.baseUrl}/products/?categoryId=${id}&price_min=${minPrice}&price_max=${maxPrice}`);
  }

  private _getProductsByName(name: string){
    return this.http.get<Product[]>(`${this.baseUrl}/products/?title=${name}`);
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

  public getProductsByCategorie(id: string){
    return this._productsByCategorie$.pipe(
      switchMap(() => this._getProductsByCategorie(id)),
      shareReplay()
    )
  }

  public getProductsByRangePrice(minPrice: number, maxPrice: number){
    return this._products$.pipe(
      switchMap(() => this._getProductsByRangePrice(minPrice, maxPrice)),
      shareReplay()
    )
  }

  public getProductsByCategoryAndPrice(id: number, minPrice: number, maxPrice: number){
    return this._products$.pipe(
      switchMap(() => this._getProductsByCategoryAndRangePrice(id, minPrice, maxPrice)),
      shareReplay()
    )
  }

  public getProductsByName(name: string){
    return this._products$.pipe(
      switchMap(() => this._getProductsByName(name)),
      shareReplay()
    )
  }

  


}
