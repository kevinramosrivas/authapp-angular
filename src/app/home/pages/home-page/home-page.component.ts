
import { Component, OnInit, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Categorie, Product } from '../../interfaces/products.interface';
import { FormControl } from '@angular/forms';


@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.style.css',
})
export class HomePageComponent implements OnInit{  
  public homeService = inject(HomeService);
  public productsRecent: Product[] = [];
  public categories: Categorie[] = [];
  public categorieInput = new FormControl('1');
  public productsSorted: Product[] = [];

  ngOnInit(): void {
    this.getproductsListLimited();
    this.getCategories();
  }


  public getproductsListLimited(){
    this.homeService.getProductsList().subscribe((response) => {
      //ordenar los productos por precio y mosotrar solo los 10 primeros mas baratos
      this.productsSorted = response.sort((a, b) => a.price - b.price).slice(0, 8);
      //ordenar los productos por fecha de creacion y mosotrar solo los 10 primeros mas recientes
      this.productsRecent = response.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()).slice(0, 8);
    } );
  }

  public getCategories(){
    this.homeService.getCategoryList().subscribe((response) => {
      this.categories = response;
    });
  } 



}
