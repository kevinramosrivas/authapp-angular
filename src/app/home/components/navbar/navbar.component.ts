import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Categorie } from '../../interfaces/products.interface';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styles: `
    :host {
      display: block;
    }
    .store-tittle{
      font-size: 1.5rem;
    }
    .dropdown-menu {
      max-height: 35vh;
      border-color: #f8f9fa;
    }
    image-component{
      width: 5px;
      height: 5px;
    }
  `,
})
export class NavbarComponent { 

  @Input()
  public categories: Categorie[] = [];
  private authService =  inject(AuthService);
  public currentUser = this.authService.currentUser;
  private elementRef = inject(ElementRef);
  @ViewChild('closeButtonNavbar') closeButtonNavbar: ElementRef = this.elementRef.nativeElement;
  public logout(){
    this.authService.logout();
  }

  public closeNavbar(){
    this.closeButtonNavbar.nativeElement.click();
  }

}
