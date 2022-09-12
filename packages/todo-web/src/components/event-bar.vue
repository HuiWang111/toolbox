<template>
  <div class="todo-event-bar">
    <div class="todo-event-bar-title">TODO</div>
    <div class="todo-event-bar-name">
      <div>Events</div>
    </div>
    <t-button
      outline
      type="primary"
      class="new-event-btn"
      size="sm"
      @click="handleCreateEvent"
    >
      <plus-outlined :style="{ fontSize: '16px' }" />
    </t-button>
    <event-list
      :selected="selected"
      :opened="openedIndexes"
      :events="eventStore.list"
      @open="handleOpen"
      @select="handleSelect"
      @change="handleEventsChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useEventStore } from '@/stores'
import EventList from './event-list.vue'
import type { Event } from './types'

const emit = defineEmits(['create-event'])

const openedIndexes = ref<Set<number>>(new Set())
const selected = ref('')
const eventStore = useEventStore()

const handleCreateEvent = () => {
  emit('create-event')
}
const handleOpen = (index: number) => {
  if (openedIndexes.value.has(index)) {
    openedIndexes.value.delete(index)
  } else {
    openedIndexes.value.add(index)
  }
}
const handleSelect = (index: number, parentIndex?: number) => {
  selected.value = parentIndex != null ? `${parentIndex}-${index}` : String(index)
}
const handleEventsChange = (list: Event[]) => {
  console.log(list)
  eventStore.$patch({ list })
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
  padding: 0 10px;

  &-title {
    font-size: 2.5em;
    padding: 25px 0;
    font-weight: 400;
    font-style: italic;
  }

  &-name {
    padding: 0 10px;
    color: #00000073;
    line-height: 1.5715;
    transition: all .3s;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 13px;
    text-align: left;
    background: #fff;
    outline: none;
    transition: background .3s,width .3s cubic-bezier(.2,0,0,1) 0s;
    
    div {
      border-bottom: 1px solid #f0f0f0;
      padding: 8px 0;
    }
  }

  .new-event-btn {
    margin: 0 auto 20px;
    width: calc(100% - 20px);
  }
}
</style>
