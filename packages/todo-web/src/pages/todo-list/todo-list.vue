<template>
  <div class="todo-list">
    <navbar />
    <div>
      <sidebar :projects="projects" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

interface Project {
  name: string;
  id: number;
}

const projects = ref<Project[]>([
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
])
</script>

<style lang="less" scoped>
.todo-list {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-background-color);

  > div:not(.navbar) {
    display: flex;
    height: calc(100vh - 96px);
  }
}
</style>