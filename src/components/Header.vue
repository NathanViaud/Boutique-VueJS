<template>
    
    <header class="px-20 d-flex flex-row align-items-center">
        <a href="#" class="d-flex flex-row align-items-center mr-20">
            <img src="../assets/logo.svg">
            <span class="logo">Dyma</span>
        </a>
        <div class="d-flex flex-row align-items-center flex-fill actions-container">
            <ul class="d-flex flex-row flex-fill hide-xs flex-fill">
                <li class="mr-10">
                    <a :class="{ active: page === 'Boutique' }" @click="emit('navigate', 'Boutique')" href="#">Boutique</a>
                </li>
                <li>
                    <a :class="{ active: page === 'Admin' }" @click="emit('navigate', 'Admin')" href="#">Admin</a>
                </li>
            </ul>
            <ul class="d-flex flex-row hide-xs">
                <li class="mr-10">
                    <a href="#">Inscription</a>
                </li>
                <li>
                    <a href="#">Connexion</a>
                </li>
            </ul>
            <div class="menu-xs-container">
                <Calc :open="state.open" @close="state.open = false" :transparent="true" />
                <i @click="state.open = !state.open" class="fa-solid fa-bars show-xs"></i>
                <Transition>
                    <ul @click="state.open = false" class="menu card" v-if="state.open">
                        <li class="mr-10">
                            <a :class="{ active: page === 'Boutique' }" @click="emit('navigate', 'Boutique')" href="#">Boutique</a>
                        </li>
                        <li>
                            <a :class="{ active: page === 'Admin' }" @click="emit('navigate', 'Admin')" href="#">Admin</a>
                        </li>
                        <li class="mr-10">
                            <a href="#">Inscription</a>
                        </li>
                        <li>
                            <a href="#">Connexion</a>
                        </li>
                    </ul>
                </Transition>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">

import type { Page } from '@/interfaces'
import { reactive } from 'vue';
import Calc from './Calc.vue';

const state = reactive<{
    open: boolean
}>({
    open: false
})

defineProps<{
    page: Page
}>()

const emit = defineEmits<{
    (e: 'navigate', page: Page): void
}>()

</script>

<style lang="scss" scoped>
@use '@/assets/scss/mixins';

header {
    background-color: var(--primary-1);
    a {
        color: var(--text-primary-color);
        img {
            width: 20px;
            margin-right: 5px;
        }
        .logo {
            font-weight: 700;
            font-size: 20px;
        }
        &.active {
            text-decoration: underline;
        }
    }

    i {
        @include mixins.sm {
            display: none;
        }
        justify-content: end;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }

    .actions-container {
        @include mixins.xs {
            justify-content: end;
        }
    }

    .menu-xs-container {
        position: relative;
    }

    .menu {
        z-index: 2;
        position: absolute;
        top: 20px;
        right: 0px;
        li {
            padding: 10px;
        }
        a {
            color: var(--text-color);
        }
    }

    
}

.v-leave-to, .v-enter-from {
    transform: translateY(-10px);
    opacity: 0;
}

.v-leave-active, .v-enter-active {
    transition: all 0.2s;
}

</style>
