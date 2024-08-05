import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Categorie } from '../../interfaces/products.interface';

@Component({
  selector: 'app-categories-filter-card',
  templateUrl: './categories-filter-card.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class CategoriesFilterCardComponent {
  @Input() public categories: Categorie[] = [];
  @Output() public filterByCategory: EventEmitter<number> = new EventEmitter();
  
  public selectedCategory: number = 1;

  public onSelectCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory.emit(idCategory);
  }
}
