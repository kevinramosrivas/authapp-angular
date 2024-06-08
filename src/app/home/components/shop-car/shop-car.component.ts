import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Product } from '../../interfaces/products.interfaces';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styles: `
  .dropdown-menu {
    max-height: 75vh;
  }
  `,
})
export class ShopCarComponent {
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
