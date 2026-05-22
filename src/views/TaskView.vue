<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Task } from '@/stores/tasks';

const route = useRoute();
const router = useRouter();
const task = ref<Task | null>(null);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/tasks/' + route.params.id);
    if (!res.ok) {
      router.push('/');
      return;
    }
    task.value = await res.json();
  } catch {
    router.push('/');
  }
});
</script>

<template>
  <main v-if="task" class="container">
    <section class="card">
      <h1>{{ task.title }}</h1>
      <p>Statut : {{ task.done ? 'Terminée' : 'En cours' }}</p>
      <RouterLink to="/">Retour</RouterLink>
    </section>
  </main>
  <p v-else class="loading">Chargement...</p>
</template>

<style scoped>
.container { padding: 2rem; max-width: 600px; margin: 0 auto; }
.card { background: white; padding: 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
h1, a { color: #42b883; }
a { margin-top: 20px; display: inline-block; }
.loading { padding: 2rem; color: #999; }
</style>
