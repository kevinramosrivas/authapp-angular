import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { loginGuard } from '../shared/guards/login.guard';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ShopcarPageComponent } from './pages/shopcar-page/shopcar-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { MyordersPageComponent } from './pages/myorders-page/myorders-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      {path: 'store', component: StorePageComponent},
      {path: 'profile', component: ProfilePageComponent,canActivate: [loginGuard]},
      {path: 'product', component: ProductPageComponent},
      {path: 'myshopcar', component: ShopcarPageComponent},
      {path: 'checkout', component: CheckoutPageComponent,canActivate: [loginGuard]},
      {path: 'myorders', component: MyordersPageComponent,canActivate: [loginGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
