import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UrlPipe } from './pipes/url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    HomePageComponent
    ,ProductCardComponent,
    NavbarComponent 
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UrlPipe,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
