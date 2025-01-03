import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { HomeService } from '../../services/product.service';
import { ShopCarService } from '../../services/shop-car.service';
import { errorIziStore } from '../../interfaces/error.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopcar-page',

  templateUrl: './shopcar-page.component.html',
  styles: `
    .shop-car-card{
      max-height: 50vh;
      overflow-y: auto;
      overflow-x: hidden;
      
    }
  `,
})
export class ShopcarPageComponent {
  private shopCarService = inject(ShopCarService);
  public homeService = inject(HomeService);
  public products = this.shopCarService.getItems();

  public isValidating = this.shopCarService.isValidating;

  public total = this.shopCarService.total$;

  public itemsCount = this.shopCarService.numItems$;

  public productsRecent: Product[] = [];

  public hasHttpError: boolean = false;

  public suggestedProductsLoading: boolean = true;

  public router = inject(Router);

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

  public validateShopCar(){
    let isValid = this.shopCarService.validateShopCar();
    if(!isValid){
      Swal.fire({
        title: 'Productos no disponibles',
        text: 'Hay productos en el carrito que ya no están disponibles 😢, por favor eliminalos antes de continuar',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    this.router.navigate(['home/checkout']);
  }

}
