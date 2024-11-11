
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
  public productsSameCategory: Product[] = [];
  private shopCarService = inject(ShopCarService);
  public isAddedToShopCar: 'Agregar al carrito' | 'Agregado' = 'Agregar al carrito';
  public isAddedToShopCarIcon: 'bi-cart-plus' | 'bi-check2' = 'bi-cart-plus';
  public MainImageProduct: string = '';
  public isLoading: boolean = true;
  public isLoadingProductsSameCategory: boolean = true;
  public hasHttpError: boolean = false;
  public hasHttpErrorSameCategory: boolean = false;


  constructor(){
    this.product = null;
    this.observableURL = this.route.queryParams.subscribe((params) => this.verifiQueryParams(params));
  }

  ngOnDestroy() {
    this.observableURL.unsubscribe();
  }

  private verifiQueryParams(params: Params){
    this.isLoading = true;
    this.isLoadingProductsSameCategory = true;
    if(params['id']){
      this.productService.getProductById(params['id']).subscribe(
        {
          next: (product) => {
            this.product = product
            this.MainImageProduct = product.images[0];
            this.getProductsSameCategory();
            this.isLoading = false;
          },
          error: (error) => {
            this.hasHttpError = true;
            this.isLoading = false;
          }
        }
      )
    }
  }

  public addProductToShopCar(product: Product){
    this.shopCarService.addProduct({product, quantity: 1,isAvailable: true});
    //mostrar el mensaje de agregado por medio segundo y luego volver a mostrar el boton con el texto original
    this.isAddedToShopCar = 'Agregado';
    this.isAddedToShopCarIcon = 'bi-check2';
    this.isAddedToShopCar = 'Agregar al carrito';
    this.isAddedToShopCarIcon = 'bi-cart-plus';
  
  }

  public changeImageProduct(event: Event){
    const target = event.target as HTMLImageElement;
    const img = target.src;

    if(img){
      this.MainImageProduct = img;

    }

  }

  public getProductsSameCategory(){
    this.productService.getProductsByCategorie(this.product!.category.id.toString()).subscribe(
      {
        next: (products) => {
          this.productsSameCategory = this.filterSameProduct(products, this.product as Product);
          this.isLoadingProductsSameCategory = false;
        },
        error: (error) => {
          this.hasHttpErrorSameCategory = true;
          this.isLoadingProductsSameCategory = false;
        }
      }
    )

  }
  //funcion que elimine el producto actual de la lista de productos similares
  public filterSameProduct(products: Product[], product: Product){
    return products.filter((p) => p.id !== product.id);
  }


  public retryLoadProduct(){
    this.isLoading = true;
    this.hasHttpError = false;
    this.observableURL = this.route.queryParams.subscribe((params) => this.verifiQueryParams(params));
  }
 }
