<template>
  <div class="todo-event-bar">
    <div class="todo-event-bar-title">TODO</div>
    <d-button
      outline
      type="primary"
      class="new-event-btn"
      size="sm"
      @click="handleCreateEvent"
    >
      Create Event
    </d-button>
    
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits } from 'vue'
import { DButton } from '@/ui';

interface Event {
  id: number;
  name: string;
  children?: Omit<Event, 'children'>[];
}

interface EventBarProps {
  events: Event[];
}

withDefaults(defineProps<EventBarProps>(), {
  events: () => []
})

const emit = defineEmits(['create-event'])

const handleCreateEvent = () => {
  emit('create-event')
}
</script>

<style lang="less">
.todo-event-bar {
  flex-shrink: 1;
  min-width: 220px;
  text-align: center;
  width: 300px;
  height: 100vh;
  border-right: 2px solid #ededed;

  &-title {
    font-size: 2.5em;
    padding: 25px 0;
    font-weight: 400;
    font-style: italic;
  }

  .new-event-btn {
    margin: 0 auto 20px;
    width: calc(100% - 40px);
  }
}
</style>
