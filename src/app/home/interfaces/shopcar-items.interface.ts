import { Product } from "./products.interface";

export interface ShopCarItem {
    product: Product;
    quantity: number;
    isAvailable: boolean;
}