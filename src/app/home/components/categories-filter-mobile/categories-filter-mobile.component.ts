import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorie } from '../../interfaces/products.interface';

@Component({
  selector: 'categories-filter-mobile',
  templateUrl: './categories-filter-mobile.component.html',
  styles: `
    :host {
      display: block;
    }
    .dropdown-menu {
      border-color: #ffffff;
    }
  `,
})
export class CategoriesFilterMobileComponent {
  @Input() public categories: Categorie[] = [];
  
  @Input() public selectedCategory: number = 1;

  public onSelectCategory(idCategory: number){
    this.selectedCategory = idCategory;
  }
}
