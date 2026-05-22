<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="app-header">
    <h2>TodoVue</h2>
    <nav>
      <RouterLink to="/">Tâches</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
.app-header {
  background: #42b883;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(66, 184, 131, 0.2);
}
h2 { margin: 0; }
nav { display: flex; gap: 16px; }
a { color: white; text-decoration: none; }
a.router-link-active { text-decoration: underline; }
</style>
