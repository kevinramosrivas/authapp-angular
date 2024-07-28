import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Categorie, Product } from '../../interfaces/products.interface';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.style.css'
})
export class BannerComponent { 
  @Input()
  public categories: Categorie[] = [];
}
