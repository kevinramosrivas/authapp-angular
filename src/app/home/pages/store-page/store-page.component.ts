import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Categorie, Product } from '../../interfaces/products.interface';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  templateUrl: './store-page.component.html',
  styles: `
    :host {
      display: block;
    }
    .dropdown-menu{
      height: 20rem;
    }
    .categories-item{
      cursor: pointer;
    }
  `,
})
export class StorePageComponent { 
  public homeService = inject(HomeService);
  public categories: Categorie[] = [];
  public categorieInput = new FormControl('1');
  public products: Product[] = [];
  public selectedCategory: number = 1;

  ngOnInit(): void {
    this.getCategoriesAndProducts();
  }


  onSelectedCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory(idCategory);
  }


  public getCategoriesAndProducts(){
    this.homeService.getCategoryList().pipe(
      switchMap((response) => {
        this.categories = response;
        this.selectedCategory = this.categories[0].id;
        return this.homeService.getProductsByCategorie((this.categories[0].id).toString());
      })
    ).subscribe((response) => {
      this.products = response;
    });
  } 


  public filterByCategory(idCategory: number){
    this.selectedCategory = idCategory;
    console.log(idCategory);
    this.homeService.getProductsByCategorie(idCategory.toString()).subscribe((response) => {
      this.products = response;
    });
  }
}


