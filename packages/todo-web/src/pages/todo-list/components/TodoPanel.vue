<template>
  <div
    :class="['todo-panel', {
      'with-sidebar': withSidebar
    }]"
  >
    <div class="todo-panel-title">{{ project }}</div>
    <div class="create-todo-button click-effect">New Item</div>
    <todo
      v-for="item in todoList"
      :key="item.id"
      :title="item.title"
      :priority="item.priority"
    />
  </div>
</template>

<script setup lang="ts">
import { TodoItem } from '../types'
import Todo from './Todo.vue'

interface TodoPanelProps {
  withSidebar?: boolean;
  todoList?: TodoItem[];
  project: string;
}

withDefaults(defineProps<TodoPanelProps>(), {
  withSidebar: true,
  todoList: () => []
})
</script>

<style scoped lang="less">
.todo-panel {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  &.with-sidebar {
    padding-left: 320px;
  }

  .todo-item {
    margin-top: 32px;
  }

  &-title {
    height: 44px;
    line-height: 44px;
    font-weight: 400;
    font-size: 32px;
    color: #000;
  }

  .create-todo-button {
    margin-top: 50px;
    height: 60px;
    line-height: 60px;
    background: #F8CA94;
    border-radius: 10px;
    font-weight: 400;
    font-size: 32px;
    color: #000;
    cursor: pointer;
  }
}
</style>
