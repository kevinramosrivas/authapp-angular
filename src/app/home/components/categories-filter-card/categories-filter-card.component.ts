import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Categorie, RangePrice } from '../../interfaces/products.interface';
import { FormBuilder, Validators } from '@angular/forms';

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
export class CategoriesFilterCardComponent implements OnChanges {
  @Input() public categories: Categorie[] = [];
  
  @Input() public selectedCategory: number = 1;
  private fb = inject(FormBuilder);

  @Input() public rangePrice: RangePrice = {minPrice: 0, maxPrice: 0};

  @Output() public priceFilter = new EventEmitter();
  @Input() public loading: boolean = false;
  @Input() public hasHttpCategoriesError: boolean = false;
  @Output() public retryLoadCategories = new EventEmitter<void>();

  //onchange
  ngOnChanges(): void {
    if(this.rangePrice.minPrice !== 0 && this.rangePrice.maxPrice !== 0){
      this.priceFilterForm.patchValue(this.rangePrice);
    }
  }
  

  public priceFilterForm = this.fb.group({
    minPrice: [1],
    maxPrice: [1000],
  });

  public onSelectCategory(idCategory: number){
    this.selectedCategory = idCategory;
  }

  public onPriceFilter(){
    this.priceFilter.emit(this.priceFilterForm.value);
  }

  public retryLoadCategoriesEvent(){
    this.retryLoadCategories.emit();
  }
}
