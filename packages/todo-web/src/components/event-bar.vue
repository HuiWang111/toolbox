<template>
  <div class="todo-event-bar">
    <div class="todo-event-bar-title">TODO</div>
    <div class="todo-event-bar-name">
      <div>Events</div>
    </div>
    <d-button
      outline
      type="primary"
      class="new-event-btn"
      size="sm"
      @click="handleCreateEvent"
    >
      <plus-outlined :style="{ fontSize: '16px' }" />
    </d-button>
    <event-list
      :selected="selected"
      :opened="openedIndexes"
      :events="events"
      @open="handleOpen"
      @select="handleSelect"
      @contextmenu="handleContextMenu"
    />
    <context-menu
      :menus="CONTEXT_MENUS"
      :visible="contextMenuVisible"
      :x="contextMenuPos.x"
      :y="contextMenuPos.y"
      @clickoutside="handleClickOutside"
      @select="handleSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { DButton, ContextMenu } from '@/ui';
import { CONTEXT_MENU } from '@/contants'
import EventList from './event-list.vue';

interface Menu {
  value: string | number;
  label: string | number;
}

interface Event {
  id: number;
  name: string;
  children?: Omit<Event, 'children'>[];
}

interface EventBarProps {
  events?: Event[];
}

interface MousePosData {
  x: number;
  y: number;
}

const CONTEXT_MENUS = [
  { value: CONTEXT_MENU.delete, label: '删除' },
  { value: CONTEXT_MENU.rename, label: '重命名' },
]

withDefaults(defineProps<EventBarProps>(), {
  events: () => [
    { id: 1, name: 'Icon', children: [
      { id: 2, name: 'Typography1' },
      { id: 4, name: 'Typography2' }
    ] },
    { id: 3, name: 'Divider' }
  ]
})

const emit = defineEmits(['create-event'])

const openedIndexes = ref<Set<number>>(new Set())
const selected = ref('')
const contextMenuVisible = ref(false)
const contextMenuPos = reactive({ x: 0, y: 0 })

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
const handleContextMenu = (pos: MousePosData, event: Omit<Event, 'children'>, isSub: boolean) => {
  contextMenuPos.x = pos.x
  contextMenuPos.y = pos.y
  contextMenuVisible.value = true
}
const handleClickOutside = () => {
  if (contextMenuVisible.value) {
    contextMenuVisible.value = false
  }
}
const handleSelectMenu = (menu: Menu) => {
  switch(menu.value) {
    case CONTEXT_MENU.delete: {
      // TODO: delete
      break;
    }
    case CONTEXT_MENU.rename: {
      // TODO: rename
      break;
    }
  }
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
