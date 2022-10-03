<template>
  <div class="todo-list">
    <navbar @click-menu="handleClickMenuIcon" />
    <div>
      <sidebar
        :projects="projects"
        :visible="showSidebar"
      />
      <todo-panel
        project="Monday"
        :todo-list="todoList"
        :with-sidebar="showSidebar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import TodoPanel from './components/TodoPanel.vue'
import { TodoItem, TodoPriority } from './types'

interface Project {
  name: string;
  id: number;
}

const projects = ref<Project[]>([
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
])
const todoList = ref<TodoItem[]>([
  { id: 1, title: 'High Priority Item', priority: TodoPriority.High, description: '', date: '' },
  { id: 2, title: 'Medium Priority Item', priority: TodoPriority.Medium, description: '', date: '' },
  { id: 3, title: 'Low Priority Item', priority: TodoPriority.Low, description: '', date: '' },
])
const showSidebar = ref(true)

const handleClickMenuIcon = () => {
  showSidebar.value = !showSidebar.value
}
</script>

<style lang="less" scoped>
.todo-list {
  width: 100vw;
  height: 100vh;
  background-color: var(--main-background-color);

  > div:not(.navbar) {
    height: calc(100vh - 96px);
    position: relative;
  }
}
</style>