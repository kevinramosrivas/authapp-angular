import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Product } from '../../interfaces/products.interface';

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

  public products = this.shopCarService.getItems();

  public total = this.shopCarService.total$;


  public addProductToShopCar(product: Product) {
    this.shopCarService.addProduct({ product, quantity: 1 });
  }

  public removeProductFromShopCar(product: Product) {
    this.shopCarService.removeProduct({ product, quantity: 1 });
  }

}
