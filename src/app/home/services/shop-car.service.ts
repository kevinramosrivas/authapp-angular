import { Injectable, OnInit, computed, signal } from '@angular/core';
import { ShopCarItem } from '../interfaces/shopcar-items.interface';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopCarService{


  public shopCarItems = signal<ShopCarItem[]>([]);

  public total = signal<number>(0);

  public numItems = signal<number>(0);

  public shake = signal<boolean | null>(null);

  


  constructor(){
    this.loadShopCar();
  }

  public addProduct(product: ShopCarItem){
    this.shopCarItems.update((items) => {
      const item = items.find((item) => item.product.id === product.product.id);
      if(item){
        item.quantity += product.quantity;
      }else{
        items.push(product);
      }
      this.shake()? this.shake.update(() => false): this.shake.update(() => true);
      return items;
    }
    );
    //calcular el total y el numero de items
    this.updateNumItems(product, 'add');
    this.updateTotal();
    this.saveShopCar();
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
      this.shake()? this.shake.update(() => false): this.shake.update(() => true);
      return items;
    });
    //calcular el total y el numero de items
    this.updateNumItems(product, 'remove');
    this.updateTotal();
    this.saveShopCar();
  };

  public clear(){
    this.shopCarItems.set([]);
  }

  public getItems(){
    return this.shopCarItems;
  }
  public loadShopCar(){
    const shopCar = localStorage.getItem('shopCarIziStore');
    if(shopCar){
      this.shopCarItems.set(JSON.parse(shopCar));
      //recalcular el total y el numero de items
      this.shopCarItems().forEach((product) => {
        this.updateNumItems(product, 'add');
      });
      this.updateTotal();
    }

  };

  public updateNumItems(product: ShopCarItem, action: 'add' | 'remove'){
    if(action == 'add'){
      this.numItems.update((numItems) => numItems + product.quantity);
    }
    else if(action == 'remove'){
      this.numItems.update((numItems) => numItems - product.quantity);
    }
  };

  public updateTotal(){
    const items = this.shopCarItems();
    this.total.update(() => items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
  };

  public saveShopCar(){
    //limpiar el local storage
    localStorage.removeItem('shopCarIziStore');
    localStorage.setItem('shopCarIziStore', JSON.stringify(this.shopCarItems()));
  };

  get total$() {
    return this.total;
  }
  get numItems$() {
    return this.numItems;
  }





}
