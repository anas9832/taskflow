<script setup lang="ts">
import type { Task } from '@/stores/tasks';

defineProps<{ task: Task }>();
const emit = defineEmits<{
  toggle: [task: Task];
  delete: [id: string];
}>();
</script>

<template>
  <li class="todo-item">
    <input type="checkbox" :checked="task.done" @change="emit('toggle', task)" />
    <span :class="{ done: task.done }">{{ task.title }}</span>
    <RouterLink :to="'/tasks/' + task.id">Détails</RouterLink>
    <button @click="emit('delete', task.id)" aria-label="Supprimer la tâche">Del</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  margin-bottom: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
}
span { flex: 1; color: #333; }
.done { text-decoration: line-through; color: #999; }
a { color: #42b883; }
button { background: none; border: none; cursor: pointer; color: #d34b4b; }
</style>
