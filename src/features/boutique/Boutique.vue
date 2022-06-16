<template>
    <div class="d-flex flex-column">
        <Shop 
			@update-filter="updateFilter"
            @add-product-to-cart="addProductToCart"
            @inc-page="incPage"
			:products="productStore.filteredProducts"
			:filters="productStore.filters"
            :more-results = "productStore.moreResults"
            :page="productStore.page"
		/>
		<Cart 
			v-if="!cartStore.cartEmpty" 
			:cart="cartStore.cart" class="cart" 
			@remove-product-from-cart="removeProductFromCart"
		/>
    </div>
    
</template>

<script setup lang="ts">
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import type { FilterUpdate } from '@/shared/interfaces'
import { useProducts } from './stores/productStore'
import { useCart } from './stores/cartStore'
import product from '@/shared/data/product'

const productStore = useProducts();
// productStore.seed();
productStore.fetchProducts();
const cartStore = useCart();

function updateFilter(filterUpdate: FilterUpdate) {
    productStore.updateFilter(filterUpdate)
}

function incPage() {
    productStore.incPage()
}


function addProductToCart(productId: string) {
    cartStore.addProductToCart(productId)
}

function removeProductFromCart(productId: string) {
    cartStore.removeProductFromCart(productId)
}

productStore.$onAction(({ name, after, args }) => {
    if(name === 'updateFilter' && !args[0].search === undefined) {
        after(() => {
            productStore.page = 1;
            productStore.products = [];
            productStore.moreResults = true;
            productStore.fetchProducts();
        })
    } else if(name === 'incPage') {
        after(() => {
            productStore.fetchProducts();
        })
    }
})

</script>

<style lang="scss" scoped>
.boutique-container {
    display: grid;
    grid-template-columns: 75% 25%;
}

.grid-empty {
    grid-template-columns: 100%;
}

.cart {
    background-color: white;
    border-left: var(--border)
}


</style>
