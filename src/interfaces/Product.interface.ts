import type { Category } from "./Filters.interface";

export interface ProductInterface {
    id: number;
    title: string;
    image: string;
    description: string;
    price: number;
    category: Category;
}