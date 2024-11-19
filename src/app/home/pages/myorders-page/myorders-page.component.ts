import { Component, inject } from '@angular/core';
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
export class MyordersPageComponent {

  private shopCarService = inject(ShopCarService);

  public myOrders:Orders[] = this.shopCarService.getMyOrders();

}
