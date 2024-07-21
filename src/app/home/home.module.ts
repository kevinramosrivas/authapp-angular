import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UrlPipe } from './pipes/url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImageComponent } from './components/image/image.component';
import { BannerComponent } from './components/banner/banner.component';
import { CarouselProductsComponent } from './components/carousel-products/carousel-products.component';
import { ShopCarComponent } from './components/shop-car/shop-car.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { AdvantagesCardsComponent } from './components/advantages-cards/advantages-cards.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomePageComponent,
    ProductCardComponent,
    NavbarComponent,
    ImageComponent,
    BannerComponent,
    CarouselProductsComponent,
    ShopCarComponent,
    ProfilePageComponent,
    AdvantagesCardsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UrlPipe,
    ReactiveFormsModule,
    LoadingBarModule,
    LoadingBarRouterModule
  ]
})
export class HomeModule { }
