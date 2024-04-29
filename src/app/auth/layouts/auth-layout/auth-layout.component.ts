import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styles: `
    :host {
      display: block;
    }
    .layout {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  `,
})
export class AuthLayoutComponent { }
