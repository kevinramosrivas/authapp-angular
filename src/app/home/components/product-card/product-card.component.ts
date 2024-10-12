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
      font-size: 1.3rem;
    }
    .card{
      background-color: #fefefd;
      border : 1px solid #FEFEFD;
    }
    .card-title{
      font-size: 1.1rem;
    }
  `,
})
export class ProductCardComponent {
  @Input() product!:Product;
  //es una oferta
  @Input() offer:boolean = false;

  public isAddedToShopCar: 'Agregar' | 'Agregado' = 'Agregar';
  public isAddedToShopCarIcon: 'bi-cart-plus' | 'bi-check2' = 'bi-cart-plus';

  private shopCarService = inject(ShopCarService);

  public addProductToShopCar(product: Product){
    this.shopCarService.addProduct({product, quantity: 1,isAvailable: true});
    //mostrar el mensaje de agregado por medio segundo y luego volver a mostrar el boton con el texto original
    this.isAddedToShopCar = 'Agregado';
    this.isAddedToShopCarIcon = 'bi-check2';
    setTimeout(() => {
      this.isAddedToShopCar = 'Agregar';
      this.isAddedToShopCarIcon = 'bi-cart-plus';
    }, 700);
  
  }

 }
