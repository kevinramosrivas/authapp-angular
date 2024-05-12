import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { User } from '../../../auth/interfaces/register-user.interface';
import { HomeService } from '../../services/home.service';
import { Categorie, Product } from '../../interfaces/products.interfaces';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.style.css',
})
export class HomePageComponent implements OnInit{  
  private authService =  inject(AuthService);
  public homeService = inject(HomeService);
  public products: Product[] = [];
  public categories: Categorie[] = [];
  public categorieInput = new FormControl('1');

  ngOnInit(): void {
    this.getproductsListLimited();
    this.getCategories();
    this.categorieInput.valueChanges.subscribe((value) => {
      if(value === '1'){
        this.getproductsListLimited();
      }else{
        this.homeService.getProductsByCategorie(value!).subscribe((response) => {
          this.products = response;
        });
      }
    }
    );
  }


  public currentUser = this.authService.currentUser;


  public logout(){
    this.authService.logout();
  }


  public getproductsListLimited(){
    this.homeService.getProductsList().subscribe((response) => {
      this.products = response.splice(0, 8);
    } );
  }

  public getCategories(){
    this.homeService.getCategoryList().subscribe((response) => {
      this.categories = response;
    });
  }




}
