<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTaskStore } from '@/stores/tasks';
import TodoItem from '@/components/TodoItem.vue';

const store = useTaskStore();
const newTitle = ref('');

onMounted(() => store.fetchTasks());

function handleAdd() {
  if (!newTitle.value.trim()) return;
  store.addTask(newTitle.value.trim());
  newTitle.value = '';
}
</script>

<template>
  <main class="container">
    <h1>Mes Tâches ({{ store.tasks.length }})</h1>

    <div class="add-row">
      <input
        v-model="newTitle"
        placeholder="Nouvelle tâche..."
        @keyup.enter="handleAdd"
      />
      <button @click="handleAdd">+ Ajouter</button>
    </div>

    <p v-if="store.loading" class="muted">Chargement...</p>
    <p v-else-if="store.error" class="error">{{ store.error }}</p>
    <p v-else-if="store.tasks.length === 0" class="muted">Aucune tâche.</p>

    <ul v-else>
      <TodoItem
        v-for="task in store.tasks"
        :key="task.id"
        :task="task"
        @toggle="store.toggleTask"
        @delete="store.deleteTask"
      />
    </ul>
  </main>
</template>

<style scoped>
.container { padding: 2rem; max-width: 600px; margin: 0 auto; }
h1 { color: #42b883; }
.add-row { display: flex; gap: 8px; margin: 16px 0; }
input { flex: 1; padding: 10px; border-radius: 6px; border: 1px solid #ddd; }
button { padding: 10px 20px; background: #42b883; color: white; border: none; border-radius: 6px; cursor: pointer; }
ul { list-style: none; padding: 0; }
.muted { color: #999; }
.error { color: #d34b4b; }
</style>
