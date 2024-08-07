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
import { StorePageComponent } from './pages/store-page/store-page.component';
import { AppModule } from '../app.module';
import { ButtonComponent } from './components/button/button.component';
import { CategoriesFilterCardComponent } from './components/categories-filter-card/categories-filter-card.component';
import { SkeletonProductCardComponent } from './components/skeleton-product-card/skeleton-product-card.component';
import { CategoriesFilterMobileComponent } from './components/categories-filter-mobile/categories-filter-mobile.component';


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
    AdvantagesCardsComponent,
    StorePageComponent,
    ButtonComponent,
    CategoriesFilterCardComponent,
    SkeletonProductCardComponent,
    CategoriesFilterMobileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UrlPipe,
    ReactiveFormsModule,
    LoadingBarModule,
    LoadingBarRouterModule,
  ]
})
export class HomeModule { }
