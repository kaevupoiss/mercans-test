<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import menuLinks from '@/data/menuLinks.json'
import IconComponent from '@/components/IconComponent.vue'

const menuOpen = ref(false)
const toggleMenu = () => (menuOpen.value = !menuOpen.value)

const filteredMenuLinks = menuLinks
  .filter((link) => link.enabled)
  .sort((a, b) => a.ordinal - b.ordinal)

//TODO: Add sidemenu collapse/expand functionality - Not in design.

const TRANSLATIONS: Record<string, string> = {
  quick_access: 'Quick access',
  time_entry: 'Time Entry',
  my_information: 'My Information',
  my_team: 'My Team',
  payslips: 'My Payslips',
  leaves: 'Leave',
  organizational_chart: 'Organizational chart',
  expense: 'Benefits',
  documents: 'Documents'
}

const t = (k: string) => {
  return TRANSLATIONS[k] ?? k
}
</script>

<template>
  <div class="container">
    <div class="sidemenu">
      <div class="sidemenu__header">
        <p>
          Employee <br />
          self service
        </p>
      </div>
      <div class="sidemenu__links">
        <RouterLink
          v-for="link in filteredMenuLinks"
          :to="link.path ?? '/'"
          :key="link.ordinal + 'menuitem'"
        >
          <IconComponent
            :name="link.icon"
            :height="parseInt(link.height)"
            :width="parseInt(link.width)"
          />
          {{ t(link.title) }}
        </RouterLink>
      </div>
      <div class="sidemenu__footer">
        <p>Mercans © 2021</p>
      </div>
      <button class="sidemenu__toggle" @click="toggleMenu">
        <span class="icon-wrapper">
          <IconComponent name="chevron" :height="10" :width="10" :rotation="menuOpen ? 0 : 180" />
        </span>
      </button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr;
  width: 100%;
}

.sidemenu {
  display: flex;
  flex-direction: column;

  background-color: var(---ffffff);

  position: relative;

  border-right: 1px solid var(---97a0ac);

  z-index: 10;
}

.sidemenu__header {
  width: 100%;

  background-color: var(--black);

  padding: 1.25rem 0 1.125rem 2.25rem;
}

.sidemenu__header p {
  color: var(---ffffff);

  font-size: 0.875rem;
  line-height: 1;
  font-weight: bold;
}

.sidemenu__links {
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
}

.sidemenu__links a {
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 2.25rem;

  position: relative;

  font-size: 0.875rem;
  line-height: 1.5;

  text-decoration: none;

  transition: color 100ms ease-in-out;
}

.sidemenu__links a.router-link-active {
  background-color: var(--light-grayish-blue);
  color: var(--orange);
}

.sidemenu__links a.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0.25rem;
  background-color: var(--orange);
}

.sidemenu__links a svg {
  place-self: center;
}

.sidemenu__links a :deep(svg *) {
  fill: var(--black);

  transition: fill 100ms ease-in-out;
}

.sidemenu__links a.router-link-active :deep(svg *) {
  fill: var(--orange);
}

.sidemenu__footer {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding: 1.5rem 0;
}

.sidemenu__toggle {
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;

  top: 3rem;
  right: -1.25rem;

  display: flex;
  align-items: center;
  justify-content: end;

  padding-right: 0.5rem;

  appearance: none;
  border: none;
  background-color: var(--light-grayish-blue);
  border-radius: 9999px;
}

.sidemenu__toggle .icon-wrapper {
  display: grid;
  place-items: center;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 9999px;
  background-color: var(---ffffff);

  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.29);

  transition: width 300ms ease-out;
}

.sidemenu__toggle .icon-wrapper :deep(svg) {
  translate: 0;

  transition: translate 300ms ease-out, rotate 300ms ease-out;
}

.sidemenu__toggle .icon-wrapper :deep(svg *) {
  fill: var(--black);
}

.sidemenu__toggle:hover {
  cursor: pointer;
}

.sidemenu__toggle:hover .icon-wrapper {
  background-color: var(--black);
  width: 1.75rem;
}

.sidemenu__toggle:hover .icon-wrapper :deep(svg) {
  translate: -0.5rem;
}

.sidemenu__toggle:hover .icon-wrapper :deep(svg *) {
  fill: var(--orange);
}
</style>
