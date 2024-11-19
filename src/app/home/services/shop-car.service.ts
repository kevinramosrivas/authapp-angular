import { ElementRef, inject, Injectable,  signal, ViewChild } from '@angular/core';
import { Orders, ShopCarItem } from '../interfaces/shopcar-items.interface';
import { HomeService } from './product.service';
import { Product } from '../interfaces/products.interface';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ShopCarService{


  public shopCarItems = signal<ShopCarItem[]>([]);

  public total = signal<number>(0);

  public numItems = signal<number>(0);

  public shake = signal<boolean | null>(null);

  public productsService = inject(HomeService);

  public isValidating = signal<boolean>(false);




  constructor(){
    this.loadShopCar();
    this.reviewShopCarAtInit();
  }

  public addProduct(product: ShopCarItem){
    this.isValidating.update(() => true);
    this.shake()? this.shake.update(() => false): this.shake.update(() => true);
    this.productsService.productIsAvailable(product.product.id.toString()).subscribe(
      {
        next: (isAvailable) => {
          product.isAvailable = isAvailable;
          this.shopCarItems.update((items) => {
            const item = items.find((item) => item.product.id === product.product.id);
            if(item){
              item.quantity += product.quantity;
            }else{
              items.push(product);
            }     
            return items;
          }
          );
          this.isValidating.update(() => false);
          this.updateNumItems(product, 'add');
          this.updateTotal();
          this.saveShopCar();
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: 'No pudimos agregar el producto al carrito',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          this.isValidating.update(() => false);
        }
      }
    )
  };

  public removeProduct(product: ShopCarItem){
    this.isValidating.update(() => true);
    this.shopCarItems.update((items) => {
      const item = items.find((item) => item.product.id === product.product.id);
      if(item){
        item.quantity -= product.quantity;
        if(item.quantity <= 0){
          //eliminar el producto del carrito
          items = items.filter((item) => item.product.id !== product.product.id);
        }
      }
      
      return items;
    });
    //calcular el total y el numero de items
    this.updateNumItems(product, 'remove');
    this.updateTotal();
    this.saveShopCar();
    this.isValidating.update(() => false);
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

  public removeAllProduct(product: Product) {
    const item = this.shopCarItems().find((item) => item.product.id === product.id);
    this.updateNumItems(item!, 'remove');
    this.shopCarItems.update((items) => {
      items = items.filter((item) => item.product.id !== product.id);
      return items;
    });
    this.updateTotal();
    this.saveShopCar();

  }

  public reviewShopCarAtInit() {
    this.shopCarItems().forEach((product) => {
      this.productsService.productIsAvailable(product.product.id.toString()).subscribe(
        {
          next: (isAvailable) => {
            product.isAvailable = isAvailable;
            this.saveShopCar();
          },
          error: (error) => {
            product.isAvailable = false;
          }
        }
      )
    });
  }
  //validar si todos los productos del carrito estan disponibles, si todos los productos se retorna true, de lo contrario false
  public validateShopCar() {
    const items = this.shopCarItems();
    return items.every((product) => product.isAvailable);
  }

  public clearShopCar() {
    this.shopCarItems.set([]);
    this.numItems.set(0);
    this.total.set(0);
    this.saveShopCar();
  }

  public saveMyOrders() {
    const shopCar = localStorage.getItem('shopCarIziStore');
    let myOrders:Orders[] = this.getMyOrders();
    if(shopCar){
      let shopCarArray = JSON.parse(shopCar);
      //añadir a myOrders el nuevo pedido
      myOrders.push({
        id: uuidv4(),
        products: shopCarArray,
        total: this.total(),
        date: new Date(),
        status: 'Pendiente'
      });

      localStorage.setItem('myOrdersIziStore', JSON.stringify(myOrders));
      this.clearShopCar();
    }
  }



  public getMyOrders():Orders[]{
    const myOrders = localStorage.getItem('myOrdersIziStore');
    if(myOrders){
      return JSON.parse(myOrders);
    }
    return [];
  }



  






}
