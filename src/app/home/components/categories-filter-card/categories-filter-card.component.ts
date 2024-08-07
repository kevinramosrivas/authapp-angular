import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Categorie } from '../../interfaces/products.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-categories-filter-card',
  templateUrl: './categories-filter-card.component.html',
  styles: [`
    :host {
      display: block;
    }
    .categories-items{
      height: 30rem;
      overflow-y: auto;
    }
  `],
})
export class CategoriesFilterCardComponent {
  @Input() public categories: Categorie[] = [];
  
  @Input() public selectedCategory: number = 1;
  private fb = inject(FormBuilder);

  @Output() public priceFilter = new EventEmitter();

  public priceFilterForm = this.fb.group({
    minPrice: ['1'],
    maxPrice: ['9999'],
  });
  constructor() { 
    this.priceFilterForm.valueChanges.subscribe((value) => {
      console.log(value);
      this.priceFilter.emit(value);
    } );
  }

  public onSelectCategory(idCategory: number){
    this.selectedCategory = idCategory;
  }

  public onPriceFilter(){
    this.priceFilter.emit(this.priceFilterForm.value);
  }
}
