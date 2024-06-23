import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { Categorie } from '../../interfaces/products.interfaces';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class HomeLayoutComponent { 
  public homeService = inject(HomeService);
  public categories: Categorie[] = [];

  constructor(){
    this.getCategories();
  }
  
  public getCategories(){
    this.homeService.getCategoryList().subscribe((response) => {
      this.categories = response;
    });
  } 
}
