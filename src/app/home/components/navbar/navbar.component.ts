import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class NavbarComponent { 

  private authService =  inject(AuthService);
  public currentUser = this.authService.currentUser;
  public logout(){
    this.authService.logout();
  }

}
