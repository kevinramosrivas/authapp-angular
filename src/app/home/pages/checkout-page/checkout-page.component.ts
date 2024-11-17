import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Product } from '../../interfaces/products.interface';
import { HomeService } from '../../services/product.service';
import { errorIziStore } from '../../interfaces/error.interface';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent { 

  private shopCarService = inject(ShopCarService);

  private fb = inject(FormBuilder);
  public homeService = inject(HomeService);
  public products = this.shopCarService.getItems();

  public isValidating = this.shopCarService.isValidating;

  public total = this.shopCarService.total$;

  public productsRecent: Product[] = [];

  public hasHttpError: boolean = false;

  public suggestedProductsLoading: boolean = true;

  public distritos = [
    { "nombre": "Lima", "codigo": "150101" },
    { "nombre": "Ancon", "codigo": "150102" },
    { "nombre": "Ate", "codigo": "150103" },
    { "nombre": "Barranco", "codigo": "150104" },
    { "nombre": "Breña", "codigo": "150105" },
    { "nombre": "Carabayllo", "codigo": "150106" },
    { "nombre": "Chaclacayo", "codigo": "150107" },
    { "nombre": "Chorrillos", "codigo": "150108" },
    { "nombre": "Cieneguilla", "codigo": "150109" },
    { "nombre": "Comas", "codigo": "150110" },
    { "nombre": "El Agustino", "codigo": "150111" },
    { "nombre": "Independencia", "codigo": "150112" },
    { "nombre": "Jesus Maria", "codigo": "150113" },
    { "nombre": "La Molina", "codigo": "150114" },
    { "nombre": "La Victoria", "codigo": "150115" },
    { "nombre": "Lince", "codigo": "150116" },
    { "nombre": "Los Olivos", "codigo": "150117" },
    { "nombre": "Lurigancho", "codigo": "150118" },
    { "nombre": "Lurin", "codigo": "150119" },
    { "nombre": "Magdalena Del Mar", "codigo": "150120" },
    { "nombre": "Miraflores", "codigo": "150122" },
    { "nombre": "Pachacamac", "codigo": "150123" },
    { "nombre": "Pucusana", "codigo": "150124" },
    { "nombre": "Pueblo Libre", "codigo": "150121" },
    { "nombre": "Puente Piedra", "codigo": "150125" },
    { "nombre": "Punta Hermosa", "codigo": "150126" },
    { "nombre": "Punta Negra", "codigo": "150127" },
    { "nombre": "Rimac", "codigo": "150128" },
    { "nombre": "San Bartolo", "codigo": "150129" },
    { "nombre": "San Borja", "codigo": "150130" },
    { "nombre": "San Isidro", "codigo": "150131" },
    { "nombre": "San Juan De Lurigancho", "codigo": "150132" },
    { "nombre": "San Juan De Miraflores", "codigo": "150133" },
    { "nombre": "San Luis", "codigo": "150134" },
    { "nombre": "San Martin De Porres", "codigo": "150135" },
    { "nombre": "San Miguel", "codigo": "150136" },
    { "nombre": "Santa Anita", "codigo": "150137" },
    { "nombre": "Santa Maria Del Mar", "codigo": "150138" },
    { "nombre": "Santa Rosa", "codigo": "150139" },
    { "nombre": "Santiago De Surco", "codigo": "150140" },
    { "nombre": "Surquillo", "codigo": "150141" },
    { "nombre": "Villa El Salvador", "codigo": "150142" },
    { "nombre": "Villa Maria Del Triunfo", "codigo": "150143" }
  ];
  
  public payForm = this.fb.group({
    direccion: ['Av. República de Panamá 257'],
    ciudad: ['Lima'],
    distrito: ['150122'],
    numero_tarjeta: ['4970110000001029'],
    fecha_expiracion: ['2024-04'],
    cvv: ['123'],
    nombre_titular: ['Juan Perez Prado'],

  });

  constructor() {
    this.getproductsListLimited();
  }


  public addProductToShopCar(product: Product) {
    this.shopCarService.addProduct({ product, quantity: 1,isAvailable: true });
  }

  public removeProductFromShopCar(product: Product) {
    this.shopCarService.removeProduct({ product, quantity: 1,isAvailable: true });
  }

  public getproductsListLimited(){
    this.homeService.getProductsList().subscribe(
      {
        next: (response: Product[]) => {
          this.productsRecent = response.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()).slice(0, 8);
          this.hasHttpError = false;
          this.suggestedProductsLoading = false;
        },
        error: (error: errorIziStore) => {
          this.hasHttpError = true;
          this.suggestedProductsLoading = false;
        }
      }
     );
  }

  public loadProducts(){
    this.getproductsListLimited();
  }
  
  public removeAllProduct(product: Product) {
    this.shopCarService.removeAllProduct(product);
  }
}
