import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Product } from '../../interfaces/products.interface';
import { ShopCarService } from '../../services/shop-car.service';

@Component({
  selector: 'home-product-card',
  templateUrl: './product-card.component.html',
  styles: `
    :host {
      display: block;
    }
    .product-price-old{
      font-size: 1rem;
    }
    .product-price-new{
      font-size: 1rem;
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
