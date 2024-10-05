import { Component, inject } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { HomeService } from '../../services/product.service';
import { ShopCarService } from '../../services/shop-car.service';
import { errorIziStore } from '../../interfaces/error.interface';
import { HttpErrorResponse } from '@angular/common/http';

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

  public total = this.shopCarService.total$;

  public productsRecent: Product[] = [];

  public hasHttpError: boolean = false;

  constructor() {
    this.getproductsListLimited();
  }


  public addProductToShopCar(product: Product) {
    this.shopCarService.addProduct({ product, quantity: 1 });
  }

  public removeProductFromShopCar(product: Product) {
    this.shopCarService.removeProduct({ product, quantity: 1 });
  }

  public getproductsListLimited(){
    this.homeService.getProductsList().subscribe(
      {
        next: (response: Product[]) => {
          this.productsRecent = response.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()).slice(0, 8);
          this.hasHttpError = false;
        },
        error: (error: errorIziStore) => {
          this.hasHttpError = true;
        }
      }
     );
  }

  public loadProducts(){
    this.getproductsListLimited();
  }

}
