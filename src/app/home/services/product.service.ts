import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError,map,tap,throwError } from 'rxjs';
import { Categorie, Product } from '../interfaces/products.interface';
import { errorIziStore } from '../interfaces/error.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'https://api.escuelajs.co/api/v1';
  private http = inject(HttpClient);


  private handleError(error: HttpErrorResponse){
    return throwError(() => {
      let message = 'Un error ha ocurrido, por favor intenta de nuevo';
      let timestamp = new Date().getTime().toString();

      return {message, timestamp} as errorIziStore
    })
  }


  private _getProductsList(){
    return this.http.get<Product[]>(`${this.baseUrl}/products`).pipe(
      catchError(this.handleError)
    )
  }

  private _getCategoryList(){
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`).pipe(
      catchError(this.handleError)
    )
  }
  private _getProductsByCategorie(id: string, offset?:number, limit?:number){
    if(offset!=undefined && limit!=undefined){
      return this.http.get<Product[]>(`${this.baseUrl}/categories/${id}/products?offset=${offset}&limit=${limit}`).pipe(
        catchError(this.handleError)
      )
    }
    else{
      return this.http.get<Product[]>(`${this.baseUrl}/categories/${id}/products`).pipe(
        catchError(this.handleError)
      )
    }
  }

  private _getProductsByRangePrice(minPrice: number, maxPrice: number){
    return this.http.get<Product[]>(`${this.baseUrl}/products/?price_min=${minPrice}&price_max=${maxPrice}`).pipe(
      catchError(this.handleError)
    )
  }

  private _getProductsByCategoryAndRangePrice(id: number, minPrice: number, maxPrice: number,offset?:number, limit?:number){
    if(offset!=undefined && limit!=undefined){
      return this.http.get<Product[]>(`${this.baseUrl}/products/?categoryId=${id}&price_min=${minPrice}&price_max=${maxPrice}&offset=${offset}&limit=${limit}`).pipe(
        catchError(this.handleError)
      )
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products/?categoryId=${id}&price_min=${minPrice}&price_max=${maxPrice}`).pipe(
      catchError(this.handleError)
    )
  }

  private _getProductsByName(name: string){
    return this.http.get<Product[]>(`${this.baseUrl}/products/?title=${name}`).pipe(
      catchError(this.handleError)
    )
  }
  private _getProductById(id:string){
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    )
  }



  public getProductsList(){
    return this._getProductsList()
  }

  public getCategoryList(){
    return  this._getCategoryList()
  }

  public getProductsByCategorie(id: string, offset?:number, limit?:number){
    return this._getProductsByCategorie(id,offset,limit)

  }

  public getProductsByRangePrice(minPrice: number, maxPrice: number){
    return this._getProductsByRangePrice(minPrice, maxPrice)
  }

  public getProductsByCategoryAndPrice(id: number, minPrice: number, maxPrice: number,offset?:number, limit?:number){
    return  this._getProductsByCategoryAndRangePrice(id, minPrice, maxPrice,offset,limit)
  }

  public getProductsByName(name: string){
    return this._getProductsByName(name)
  }
  public getProductById(id:string){
    return this._getProductById(id)
  }

  public productIsAvailable(id:string){
    return this._getProductById(id).pipe(
      map(
        (product) => {
          return (product.id) ? true : false
        }
      )
    )
  }

  


}
