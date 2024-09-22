
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/product.service';
import { Product } from '../../interfaces/products.interface';
import { ShopCarService } from '../../services/shop-car.service';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnDestroy {
  private observableURL : Subscription;
  private route = inject(ActivatedRoute);
  private productService =  inject(HomeService);
  public product: Product|null = null;
  private shopCarService = inject(ShopCarService);
  public isAddedToShopCar: 'Agregar al carrito' | 'Agregado' = 'Agregar al carrito';
  public isAddedToShopCarIcon: 'bi-cart-plus' | 'bi-check2' = 'bi-cart-plus';

  constructor(){
    this.observableURL = this.route.queryParams.subscribe((params) => this.verifiQueryParams(params));
  }

  ngOnDestroy() {
    this.observableURL.unsubscribe();
  }

  private verifiQueryParams(params: Params){
    if(params['id']){
      this.productService.getProductById(params['id']).subscribe(
        {
          next: (product) => this.product = product,
          error: (error) => this.product = null
        }
      )
    }
  }

  public addProductToShopCar(product: Product){
    this.shopCarService.addProduct({product, quantity: 1});
    //mostrar el mensaje de agregado por medio segundo y luego volver a mostrar el boton con el texto original
    this.isAddedToShopCar = 'Agregado';
    this.isAddedToShopCarIcon = 'bi-check2';
    setTimeout(() => {
      this.isAddedToShopCar = 'Agregar al carrito';
      this.isAddedToShopCarIcon = 'bi-cart-plus';
    }, 700);
  
  }
 }
