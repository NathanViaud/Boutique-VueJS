<template>
    <div class="cart-container">
        <Transition mode="out-in">
            <div 
                v-if="!state.open"
                @click="state.open = !state.open" 
                class="cart-holder d-flex flex-row justify-content-center align-items-center"
            >
                <span class="tag">{{ cart.length }}</span>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
            <div v-else>
                <Calc :open="true" @close="state.open = false" />
                <div class="p-20 d-flex flex-column card">
                    <h2 class="mb-10">Panier</h2>
                    <CartProductList 
                        class="flex-fill"
                        :cart="cart" 
                        @remove-product-from-cart="emit('removeProductFromCart', $event)" 
                    />
                    <Button class="btn btn-success">Commander ({{ totalPrice }}€)</Button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import CartProductList from './CartProductList.vue';
import type { ProductCartInterface } from '@/interfaces'
import { computed, reactive } from 'vue'
import Calc from '@/components/Calc.vue'

const state = reactive<{
    open: boolean
}>({
    open: false
})

const props = defineProps<{
    cart: ProductCartInterface[]
}>()

const totalPrice = computed(() => props.cart.reduce((acc, product) => {
    return acc + product.price * product.quantity
}, 0))

const emit = defineEmits<{
    (e: 'removeProductFromCart', productId: string): void
}>()

</script>

<style lang="scss" scoped>

.cart-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 2;
}

.cart-holder {
    position: relative;
    background-color: var(--primary-1);
    cursor: pointer;
    transition: background-color 0.2s;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: -10px; // white border still appear
    &:hover {
        background-color: var(--primary-2);
    }
    i {
        font-size: 20px;
        color: var(--text-primary-color);
    }
}

.tag {
    width: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background-color: var(--danger-1);
    position: absolute;
    top: 0;
    right: 0;
    color: var(--text-primary-color);
}

.v-leave-to,
.v-enter-from {
    transform: translateY(10px);
    opacity: 0;
}

.v-leave-active,
.v-enter-active {
    transition: all 0.2s;
}

</style>
