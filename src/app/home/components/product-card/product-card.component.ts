import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/products.interfaces';

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
  @Input() product:Product | undefined;
  //es una oferta
  @Input() offer:boolean = false;

 }
