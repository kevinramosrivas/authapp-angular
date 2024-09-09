
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/product.service';
import { Product } from '../../interfaces/products.interface';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnDestroy {
  private observableURL : Subscription;
  private route = inject(ActivatedRoute);
  private productService =  inject(HomeService);
  public product: Product|null = null;

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
 }
