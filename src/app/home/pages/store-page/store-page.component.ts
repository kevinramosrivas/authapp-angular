import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Categorie, Product } from '../../interfaces/products.interface';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  //obtener parametros de la url
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      if(params["category"]){
        this.selectedCategory = parseInt(params["category"]);
        this.filterByCategory(this.selectedCategory);
      }
      else{
        this.selectedCategory = 1;
        this.filterByCategory(this.selectedCategory);
      }
    });
   }


  ngOnInit(): void {
    this.getCategories();
  }


  onSelectedCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory(idCategory);
  }

  public filterByCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.homeService.getProductsByCategorie(idCategory.toString()).subscribe((response) => {
      this.products = response;
    });
  }
  public getCategories(){
    this.homeService.getCategoryList().subscribe((response) => {
      this.categories = response;
    });
  }
  public onPriceFilter(value: any){
    //filtrar por precio la lista de productos
    this.products = this.products.filter((product) => {
      return product.price >= value.minPrice && product.price <= value.maxPrice;
    });
  }
}


