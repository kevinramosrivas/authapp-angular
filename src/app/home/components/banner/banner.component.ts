import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Categorie, Product } from '../../interfaces/products.interfaces';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BannerComponent { 
  @Input()
  public categories: Categorie[] = [];
}
