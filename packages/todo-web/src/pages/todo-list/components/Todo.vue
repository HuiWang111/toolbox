<template>
  <div :class="['todo-item', {
    low: priority === TodoPriority.Low,
    medium: priority === TodoPriority.Medium,
    high: priority === TodoPriority.High
  }]">
    <div class="todo-item-title">{{ title }}</div>
    <div class="todo-item-details click-effect">Details</div>
  </div>
</template>

<script setup lang="ts">
import { TodoPriority } from '../types'

interface TodoItemProps {
  priority: TodoPriority;
  title: string;
}

withDefaults(defineProps<TodoItemProps>(), {
  
})
</script>

<style scoped lang="less">
.todo-item {
  min-height: 80px;
  padding: 6px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 26px;
  text-align: center;
  color: #000;
  box-sizing: border-box;

  &.low {
    background-color: var(--primary-high-color);
  }
  &.medium {
    background-color: var(--primary-medium-color);
  }
  &.high {
    background-color: var(--primary-low-color);
  }

  &-title {
    min-height: 34px;
    font-weight: 500;
  }

  &-details {
    height: 34px;
    line-height: 34px;
    background-color: #FEFFDF;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
