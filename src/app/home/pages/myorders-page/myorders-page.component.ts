import { Component, inject, OnInit } from '@angular/core';
import { ShopCarService } from '../../services/shop-car.service';
import { Orders } from '../../interfaces/shopcar-items.interface';

@Component({
  templateUrl: './myorders-page.component.html',
  styles: `
    :host {
      display: block;
    }
    .accordion-body{
      max-height: 500px;
      overflow-y: auto;
    }
  `,
})
export class MyordersPageComponent implements OnInit {

  private shopCarService = inject(ShopCarService);

  public myOrders:Orders[] = [];

  public loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.shopCarService.getMyOrders().subscribe((orders) => {
      this.myOrders = orders;
      this.loading = false;
    });
  }



}
