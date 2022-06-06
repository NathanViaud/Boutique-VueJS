<template>
    <div>
        <ShopProductList :products="products" @addProductToCart="emit('addProductToCart', $event)" />
    </div>
</template>

<script setup lang="ts">
import type { ProductInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';

defineProps<{
    products: ProductInterface[]
}>()

const emit = defineEmits<{
    (e: 'addProductToCart', productId: number): void
}>()

</script>

<style lang="scss" scoped>

</style>
