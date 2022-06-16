import type { Category } from "./type";

export interface ProductInterface {
    _id: string;
    createdAt: string;
    title: string;
    image: string;
    description: string;
    price: number;
    category: Category;
}

export interface ProductFormInterface {
    title: string;
    image: string;
    description: string;
    price: number;
    category: Category;
}