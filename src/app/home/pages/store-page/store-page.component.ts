import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categorie, Product, RangePrice } from '../../interfaces/products.interface';
import { HomeService } from '../../services/product.service';

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
  public loadingCategories: boolean = false;
  public hasHttpProductsError: boolean = false;
  public hasHttpCategoriesError: boolean = false;

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
  

  public getCategories(){
    this.loadingCategories = true;
    this.homeService.getCategoryList().subscribe(
      {
        next: (response) => {
          this.categories = response;
          setTimeout(() => {
            this.loadingCategories = false;
          }, 200);
          this.hasHttpCategoriesError = false;
        },
        error: (error) => {
          setTimeout(() => {
            this.loadingCategories = false;
          }, 200);
          this.hasHttpCategoriesError = true;
        }
      }
    );
  }


  onSelectedCategory(idCategory: number){
    this.selectedCategory = idCategory;
    this.filterByCategory(idCategory);
  }


  private filterByCategory(idCategory: number){
    this.loading = true;
    this.selectedCategory = idCategory;
    this.homeService.getProductsByCategorie(idCategory.toString()).subscribe(
      {
        next: (response) => {
          this.products = response;
          setTimeout(() => {
            this.loading = false;
          }, 200);
          this.hasHttpProductsError = false;
        },
        error: (error) => {
          this.hasHttpProductsError = true;
        }
      }
    );
  }

  private filterByPrice(minPrice: number, maxPrice: number){
    this.loading = true;
    this.homeService.getProductsByCategoryAndPrice(this.selectedCategory,minPrice, maxPrice).subscribe(
      {
        next: (response) => {
          this.products = response;
          setTimeout(() => {
            this.loading = false;
          }, 200);
          this.hasHttpProductsError = false;
        },
        error: (error) => {
          this.hasHttpProductsError = true;
          this.loading = false;
        }
      }
    );
  }

  private filterByProuctName(productName: string){
    this.loading = true;
    this.homeService.getProductsByName(productName).subscribe(
      {
        next: (response) => {
          this.products = response;
          setTimeout(() => {
            this.loading = false;
          }, 200);
          this.hasHttpProductsError = false;
        },
        error: (error) => {
          this.hasHttpProductsError = true;
        }
      }
    );
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
      this.filterByProuctName(params["product"]);
    }
  }

  public retryLoadProducts(){
    this.loading = true;
    this.loadingCategories = true;
    this.hasHttpProductsError = false;
    this.hasHttpCategoriesError = false;
    this.getCategories();
    this.observableURL = this.route.queryParams.subscribe((params) => this.verifiQueryParams(params));
  }

}


