import { AfterContentInit, AfterViewInit, Component, input, computed, output, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'home-carousel-products',
  templateUrl: './carousel-products.component.html'
})
export class CarouselProductsComponent{
 
  public products = input<Product[]>([]);
  public hasHttpError = input<boolean>(false);
  public isLoading = input<boolean>(true);
  @Output()
  public retryLoadProducts: EventEmitter<void> = new EventEmitter<void>();
  public arrayProducts = computed<Product[][]>(
    () => [this.products().slice(0, 4),this.products().slice(4,8)]
  );

  public loadProducts(){
    this.retryLoadProducts.emit();
  }



  
 }
