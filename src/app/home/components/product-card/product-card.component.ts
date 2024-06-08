import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Product } from '../../interfaces/products.interfaces';
import { ShopCarService } from '../../services/shop-car.service';

@Component({
  selector: 'home-product-card',
  templateUrl: './product-card.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ProductCardComponent {
  @Input() product!:Product;
  //es una oferta
  @Input() offer:boolean = false;

  private shopCarService = inject(ShopCarService);

  public addProductToShopCar(product: Product){
    this.shopCarService.addProduct({product, quantity: 1});
  }

 }
