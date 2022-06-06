<template>
    <div class="mb-10 p-10 d-flex flex-row align-items-center product">
        <strong class="mr-10">{{ product.title }}</strong>
        <span class="flex-fill">x {{ product.quantity }}</span>
        <span class="mr-10">Prix : {{ product.price }}€</span>
        <button class="btn btn-danger" @click="emit('removeProductFromCart', product.id)" >supprimer</button>
    </div>
</template>

<script setup lang="ts">
import type { ProductCartInterface } from '@/interfaces';


defineProps<{
    product: ProductCartInterface
}>()

const emit = defineEmits<{
    (e: 'removeProductFromCart', productId: number): void
}>()

</script>

<style lang="scss" scoped>
.product {
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: var(--gray-1);
}
</style>