import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Categorie } from '../../interfaces/products.interfaces';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styles: `
    :host {
      display: block;
    }
    .dropdown-menu-categories {
      max-height: 75vh;
    }
  `,
})
export class NavbarComponent { 

  @Input()
  public categories: Categorie[] = [];
  private authService =  inject(AuthService);
  public currentUser = this.authService.currentUser;
  public logout(){
    this.authService.logout();
  }

}
