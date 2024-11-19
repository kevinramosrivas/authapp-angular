import { Product } from "./products.interface";

export interface ShopCarItem {
    product: Product;
    quantity: number;
    isAvailable: boolean;
}

export interface Orders{
    id: string;
    products: ShopCarItem[];
    total: number;
    date: Date;
    status: string;
}