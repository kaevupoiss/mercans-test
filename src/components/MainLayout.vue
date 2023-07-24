<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from "vue-router";
import menuLinks from '@/data/menuLinks.json';
import IconComponent from '@/components/IconComponent.vue';

const menuOpen = ref(false);
const toggleMenu = () => menuOpen.value = !menuOpen.value;

const filteredMenuLinks = menuLinks.filter(link => link.enabled).sort((a, b) => a.ordinal - b.ordinal);
</script>

<template>
    <div class="container">
        <div class="sidemenu">
            <RouterLink v-for="link in filteredMenuLinks" :to="link.path ?? '/'" :key="link.ordinal + 'menuitem'">
                <IconComponent :name="link.icon" :height="parseInt(link.height)" :width="parseInt(link.width)" />
                {{ link.title }}
            </RouterLink>
        </div>
        
        <h1>Test</h1>
        <slot></slot>
    </div>
</template>


<style scoped>
    h1 {
        color: red;
    }
</style>