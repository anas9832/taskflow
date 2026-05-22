import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Task {
  id: string;
  title: string;
  done: boolean;
}

const API_URL = 'http://localhost:4000/tasks';

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  async function fetchTasks() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(API_URL);
      tasks.value = await res.json();
    } catch {
      error.value = 'Erreur chargement';
    } finally {
      loading.value = false;
    }
  }

  async function addTask(title: string) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, done: false }),
    });
    tasks.value.push(await res.json());
  }

  async function deleteTask(id: string) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  async function toggleTask(task: Task) {
    const res = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, done: !task.done }),
    });
    const data = await res.json();
    const index = tasks.value.findIndex((item) => item.id === data.id);
    if (index !== -1) tasks.value[index] = data;
  }

  return { tasks, loading, error, fetchTasks, addTask, deleteTask, toggleTask };
});
