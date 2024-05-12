import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { Categorie, Product } from '../interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = 'https://api.escuelajs.co/api/v1';

  private http = inject(HttpClient);


  public getProductsList(){

    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  public getCategoryList(){
    return this.http.get<Categorie[]>(`${this.baseUrl}/categories`);
  }
  public getProductsByCategorie(id: string){
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${id}/products`);
  }

}
