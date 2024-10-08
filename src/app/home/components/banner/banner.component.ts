import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorie, Product } from '../../interfaces/products.interface';

@Component({
  selector: 'home-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.style.css'
})
export class BannerComponent { 
  @Input()
  public categories: Categorie[] = [];

  @Input()
  public isLoadingCategories: boolean = true;

  @Input()
  public hasCategoriesHttpError: boolean = false;


  @Output()
  public retryLoadCategories: EventEmitter<void> = new EventEmitter<void>();


  public retryLoadCategoriesEvent(){
    this.retryLoadCategories.emit();
  }
}
