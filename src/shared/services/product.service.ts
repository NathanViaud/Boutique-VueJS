import type { FiltersInterface, ProductFormInterface, ProductInterface } from "@/interfaces";
import { ref, type Ref } from "vue";

const API_URL = 'https://restapi.fr/api/vueprojectproducts2'

export async function fetchProduct(filter: FiltersInterface, page: number): Promise<ProductInterface[] | ProductInterface> {
    const query = new URLSearchParams();

    if(filter.category !== 'all') {
        query.append('category', filter.category);
    }
    query.append('limit', 20 + '');
    if(page !== 1) {
        query.append('skip', ((page - 1) * 20) + '')
    }
    query.append('price', `$lte:${ filter.priceRange[1] }`)
    query.append('price', `$gte:${ filter.priceRange[0] }`)

    const products = await (await fetch(`${ API_URL }?${ query }`)).json()
    return products;
}

export function useFetchProduct(): { products: Ref<ProductInterface[] | null>, loading: Ref<boolean>, error: Ref<any> } {
    const products = ref<ProductInterface[] | null>(null);
    const loading = ref<boolean>(true);
    const error = ref<any>(null);

    (async () => {
        try {
            products.value = await (await fetch(API_URL)).json()
        } catch(e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    })()

    return {
        products,
        loading,
        error
    }
}

export async function deleteProduct(productId: string): Promise<string> {
    await fetch(`${ API_URL }/${ productId }`, {
        method: 'DELETE'
    })
    return productId;
}

export async function addProduct(product: ProductFormInterface): Promise<ProductInterface> {
    const newProduct = await (await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    return newProduct
}

export async function getProduct(productId: string): Promise<ProductInterface> {
    const product = await (await fetch(`${ API_URL }/${ productId }`)).json()
    return product;
}

export async function editProduct(productId: string, product: ProductFormInterface): Promise<ProductInterface> {
    const updatedProduct = await (await fetch(`${ API_URL }/${ productId }`, {
        method: 'PATCH',
        body:JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    })).json()
    return updatedProduct
}