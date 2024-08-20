import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/product.service';
import { Categorie, Product, RangePrice } from '../../interfaces/products.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, Subscribable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
export class StorePageComponent implements OnDestroy { 
  public homeService = inject(HomeService);
  public categories: Categorie[] = [];
  public categorieInput = new FormControl('1');
  public products: Product[] = [];
  public rangePrice: RangePrice = {minPrice: 0, maxPrice: 0};
  public selectedCategory: number = 1;
  private observableURL : Subscription;
  //obtener parametros de la url
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public loading: boolean = false;

  constructor() {
    this.observableURL = this.route.queryParams.subscribe((params) => {
      if(params["category"] && !params["minPrice"] && !params["maxPrice"]){
        this.selectedCategory = parseInt(params["category"]);
        this.filterByCategory(this.selectedCategory);
      }
      if(params["minPrice"] && params["maxPrice"]&& params["category"] ){
        this.selectedCategory = parseInt(params["category"]);
        this.rangePrice = {minPrice: parseInt(params["minPrice"]), maxPrice: parseInt(params["maxPrice"])};
        this.filterByPrice(parseInt(params["minPrice"]), parseInt(params["maxPrice"]));
      }
      if(!params["category"] && !params["minPrice"] && !params["maxPrice"]){
        this.selectedCategory = 1;
        this.filterByCategory(this.selectedCategory);
      }
    });
   }
  ngOnDestroy(): void {
    this.categorieInput.reset();
    this.observableURL.unsubscribe();
  }


  ngOnInit(): void {
    this.getCategories();
  }


  onSelectedCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory(idCategory);
  }

  private filterByCategory(idCategory: number){
    this.loading = true;
    this.selectedCategory = idCategory;
    this.homeService.getProductsByCategorie(idCategory.toString()).subscribe((response) => {
      this.products = response;
      this.loading = false;
    });
  }
  public getCategories(){
    this.homeService.getCategoryList().subscribe((response) => {
      this.categories = response;
    });
  }

  private filterByPrice(minPrice: number, maxPrice: number){
    this.loading = true;
    this.homeService.getProductsByCategoryAndPrice(this.selectedCategory,minPrice, maxPrice).subscribe((response) => {
      this.products = response;
      this.loading = false;
    });
  }

  public onPriceFilter(range:RangePrice){
    this.router.navigate([], {
      queryParams: {
        category: this.selectedCategory,
        minPrice: range.minPrice,
        maxPrice: range.maxPrice
      },
      queryParamsHandling: '',
    });
  }
}


