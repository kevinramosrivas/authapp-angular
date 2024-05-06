import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { User } from '../../../auth/interfaces/register-user.interface';

@Component({
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.style.css',
})
export class HomePageComponent{ 
  private authService =  inject(AuthService);

  public currentUser = this.authService.currentUser;


  public logout(){
    this.authService.logout();
  }



}
