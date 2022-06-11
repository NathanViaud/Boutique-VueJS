<template>
    <div class="d-flex flex-row shop-container">
        <Calc :open="state.open && state.isMobile" @close="state.open = false" />
        <Transition>
            <ShopFilters
                v-if="state.open"
                :filters="filters"
                :nb-of-products="products.length"
                @update-filter="emit('updateFilter', $event)"
                class="shop-filter"
            />
        </Transition>
        <div class="d-flex flex-column">
            <button @click="state.open = !state.open" class="btn btn-primary d-flex flex-row justify-content-center align-items-center">
                <i class="fa-solid fa-magnifying-glass mr-10"></i>
                <span>Rechercher</span>
            </button>
            <ShopProductList 
                class="flex-fill scrollable"
                @addProductToCart="emit('addProductToCart', $event)"
                @inc-page="emit('incPage')" 
                :products="products"
                :more-results="moreResults"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FiltersInterface, FilterUpdate, ProductInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';
import { reactive } from 'vue';
import { boolean } from 'zod';
import Calc from '@/components/Calc.vue'

const state = reactive<{
    open: boolean,
    isMobile: boolean
}>({
    open: !matchMedia('(max-width: 575px)').matches,
    isMobile: matchMedia('(max-width: 575px)').matches
})

defineProps<{
    products: ProductInterface[],
    filters: FiltersInterface
    moreResults: boolean
}>()

const emit = defineEmits<{
    (e: 'addProductToCart', productId: string): void
    (e: 'updateFilter', updateFilter: FilterUpdate): void
    (e: 'incPage'): void
}>()

</script>

<style lang="scss" scoped>
@use  '@/assets/scss/mixins';
.shop-filter {
    flex: 0 0 200px;
    @include mixins.xs {
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        z-index: 2;
    }
}

.shop-container {
    position: relative;
}

.scrollable {
    overflow-y: auto;
    height: calc(100vh - 96px);
}

button {
    margin: 20px 20px 0 20px;
    @include mixins.sm {
        display: none;
    }
}

.v-leave-to,
.v-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.v-leave-active,
.v-enter-active {
    transition: all 0.2s;
}

</style>
