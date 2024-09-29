import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Product } from '../../interfaces/products.interface';

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
  
  public itemsCount = this.shopCarService.numItems$;
  private elementRef = inject(ElementRef);
  @ViewChild('productsList') productsList: ElementRef = this.elementRef.nativeElement;
  @ViewChild('buttonProductsList') buttonProductsList: ElementRef = this.elementRef.nativeElement;

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
