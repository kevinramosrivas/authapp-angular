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
  public orderBy = new FormControl('');
  public products: Product[] = [];
  public rangePrice: RangePrice = {minPrice: 0, maxPrice: 0};
  public selectedCategory: number = 1;
  private observableURL : Subscription;
  //obtener parametros de la url
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public loading: boolean = false;

  constructor() {
    this.observableURL = this.route.queryParams.subscribe((params) => this.verifiQueryParams(params));
    this.orderBy.valueChanges.subscribe((value) => this.orderByFilter(value!));
   }
  ngOnDestroy(): void {
    this.observableURL.unsubscribe();
  }


  ngOnInit(): void {
    this.getCategories();
  }


  onSelectedCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory(idCategory);
    console.log(idCategory);
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


  private orderByFilter(orderBy: string){
    if(orderBy == '') return;
    switch (orderBy) {
      case 'precioAsc':
        this.products = this.products.sort((a, b) => a.price - b.price);
        break;
      case 'precioDes':
        this.products = this.products.sort((a, b) => b.price - a.price);
        break;
      case 'nombreAsc':
        this.products = this.products.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nombreDesc':
        this.products = this.products.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'fechaAsc':
        this.products = this.products.sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'fechaDesc':
        this.products = this.products.sort((a,b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
        break;
      default:
        break;
    }
  }

  public verifiQueryParams(params:Params){
    if (params["category"]) {
      if (!params["minPrice"] && !params["maxPrice"]) {
        this.rangePrice = { minPrice: 1, maxPrice: 1000 };
        this.orderBy.setValue('');
        this.selectedCategory = parseInt(params["category"]);
        this.filterByCategory(this.selectedCategory);
      } else if (params["minPrice"] && params["maxPrice"]) {
        this.selectedCategory = parseInt(params["category"]);
        this.rangePrice = { minPrice: parseInt(params["minPrice"]), maxPrice: parseInt(params["maxPrice"]) };
        this.filterByPrice(parseInt(params["minPrice"]), parseInt(params["maxPrice"]));
      }
    } else if (!params["category"] && !params["minPrice"] && !params["maxPrice"] && !params["product"]) {
      this.selectedCategory = 1;
      this.filterByCategory(this.selectedCategory);
    } else if (params["product"] && (!params["category"] && !params["minPrice"] && !params["maxPrice"])) {
      this.loading = true;
      this.homeService.getProductsByName(params["product"]).subscribe((response) => {
        this.selectedCategory = 0;
        this.products = response;
        this.loading = false;
      });
    }
  }
}


