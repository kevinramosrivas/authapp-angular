import { Injectable, computed, signal } from '@angular/core';
import { ShopCarItem } from '../interfaces/shopcar-items.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopCarService {

  public shopCarItems = signal<ShopCarItem[]>([]);

  public total = signal<number>(0);

  public itemsCount = computed<number>(
    () => this.shopCarItems().reduce((acc, item) => acc + item.quantity, 0)
  );


  public addProduct(product: ShopCarItem){
    this.shopCarItems.update((items) => {
      const item = items.find((item) => item.product.id === product.product.id);
      if(item){
        item.quantity += product.quantity;
      }else{
        items.push(product);
      }
      //calcular el total
      this.total.update(() => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
      return items;
    }
    );
  };

  public removeProduct(product: ShopCarItem){
    this.shopCarItems.update((items) => {
      const item = items.find((item) => item.product.id === product.product.id);
      if(item){
        item.quantity -= product.quantity;
        if(item.quantity <= 0){
          //eliminar el producto del carrito
          items = items.filter((item) => item.product.id !== product.product.id);
        }
      }
      //calcular el total
      this.total.update(() => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
      return items;
    });
  };

  public clear(){
    this.shopCarItems.set([]);
  }

  public getItems(){
    return this.shopCarItems;
  }

  get total$() {
    return this.total;
  }





}
