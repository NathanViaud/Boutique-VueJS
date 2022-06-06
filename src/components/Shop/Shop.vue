<template>
    <div class="d-flex flex-row">
        <ShopFilters 
            :filters="filters"
            :nb-of-products="products.length"
            @update-filter="emit('updateFilter', $event)"
            class="shop-filter"
        />
        <ShopProductList 
            class="flex-fill"
            :products="products" 
            @addProductToCart="emit('addProductToCart', $event)" 
        />
    </div>
</template>

<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, ProductInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';

defineProps<{
    products: ProductInterface[],
    filters: FiltersInterface
}>()

const emit = defineEmits<{
    (e: 'addProductToCart', productId: number): void
    (e: 'updateFilter', updateFilter: FilterUpdate): void
}>()

</script>

<style lang="scss" scoped>
.shop-filter {
    flex: 0 0 200px;
}
</style>
