import { Component, inject } from '@angular/core';
import { AuthService } from './auth/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authapp';
  private authService = inject(AuthService);

  constructor(){
    this.authService.checkAuthentication();
  }




}
