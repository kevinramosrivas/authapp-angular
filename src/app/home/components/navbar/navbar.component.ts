import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Categorie } from '../../interfaces/products.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.style.css'
})
export class NavbarComponent { 

  @Input()
  public categories: Categorie[] = [];
  private authService =  inject(AuthService);
  private elementRef = inject(ElementRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  public currentUser = this.authService.currentUser;

  @ViewChild('closeButtonNavbar') closeButtonNavbar: ElementRef = this.elementRef.nativeElement;

  public searchProductForm = this.fb.group({
    product: ['', [Validators.required, Validators.minLength(3)]]
  });

  public logout(){
    this.authService.logout();
  }

  public closeNavbar(){
    this.closeButtonNavbar.nativeElement.click();
  }

  public onSearchProduct(){
    if(this.searchProductForm.valid){
      this.router.navigate(['/home/store'], {queryParams: {product: this.searchProductForm.value.product}});
      this.closeNavbar();
      this.searchProductForm.reset();
    }
  }
  public imprimir(){
    console.log('imprimir');
  }

}
