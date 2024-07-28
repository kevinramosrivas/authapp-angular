import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { Categorie } from '../../interfaces/products.interface';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.style.css'
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
