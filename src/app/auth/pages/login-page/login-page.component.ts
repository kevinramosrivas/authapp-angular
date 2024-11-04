import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class LoginPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  public returnUrl = '';
  public message = 'Bienvenido';
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ] ; 
    this.message =  this.returnUrl? 'Por favor inicia sesión, antes de continuar': 'Bienvenido';

  }
}
