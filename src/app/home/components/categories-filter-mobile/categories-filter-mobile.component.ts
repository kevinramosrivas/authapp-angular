import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
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

  @Input() public loading: boolean = false;
  @Input() public hasHttpCategoriesError: boolean = false;
  @Output() public retryLoadCategories = new EventEmitter<void>();


  private elementRef = inject(ElementRef);
  @ViewChild('closeButtonFilterMobile') closeButtonNavbar: ElementRef = this.elementRef.nativeElement;

  public onSelectCategory(idCategory: number){
    this.selectedCategory = idCategory;
  }
  public closeOffcanvasFilterMobile(){
    this.closeButtonNavbar.nativeElement.click();
  }

  public retryLoadCategoriesEvent(){
    this.retryLoadCategories.emit();
  }
}
