import { AfterContentInit, AfterViewInit, Component, input, computed } from '@angular/core';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'home-carousel-products',
  templateUrl: './carousel-products.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class CarouselProductsComponent{
 
  products = input<Product[]>([]);
  public arrayProducts = computed<Product[][]>(
    () => [this.products().slice(0, 4),this.products().slice(4,8)]
  );

  public isLoaded = computed<boolean>(
    () => this.products().length > 0
  );

  
 }
