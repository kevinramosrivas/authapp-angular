import { Component, computed, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-shop-car',
  templateUrl: './shop-car.component.html',
  styles: `
  .dropdown-menu {
    max-height: 75vh;
  }

  .shake{
    animation: shake 0.5s ease-in-out;
  }

  .shake_inverse{
    animation: shake_inverse 0.5s ease-in-out;
  }

  @keyframes shake {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }

  @keyframes shake_inverse {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }
  `,
})
export class ShopCarComponent{
  private shopCarService = inject(ShopCarService);

  public products = this.shopCarService.getItems();

  public total = this.shopCarService.total$;
  
  public itemsCount = this.shopCarService.numItems$;

  public shake = this.shopCarService.shake;
  
  private elementRef = inject(ElementRef);



  @ViewChild('productsList') productsList: ElementRef = this.elementRef.nativeElement;
  @ViewChild('buttonProductsList') buttonProductsList: ElementRef = this.elementRef.nativeElement;
  @ViewChild('shopCarBadge') shopCarBadge: ElementRef = this.elementRef.nativeElement;

  public addProductToShopCar(product: Product) {
    this.shopCarService.addProduct({ product, quantity: 1 });
  }

  public removeProductFromShopCar(product: Product) {
    this.shopCarService.removeProduct({ product, quantity: 1 });
  }

  public closeShopCar($event: any) {
    this.productsList.nativeElement.classList.remove('show');
    this.buttonProductsList.nativeElement.classList.remove('show');
  }



}
