<template>
  <ul class="event-list">
    <template
      v-for="(event, index) in events"
      :key="event.id"
    >
      <li
        v-if="event.children"
        class="event-sub-item"
      >
        <div
          :class="{
            'event-sub-item-title': true,
            'event-sub-item-title-opened': opened.has(index)
          }"
          @click="handleOpen(index)"
        >
          <span>{{ event.name }}</span>
          <down-outlined />
        </div>
        <ul
          class="event-list event-list-sub"
          v-show="opened.has(index)"
        >
          <li
            v-for="(child, i) in event.children"
            :key="child.id"
            @click="handleSelect(i, index)"
            @contextmenu.prevent="(e) => handleContextMenu(e, child, false)"
            :class="{
              'event-item': true,
              'event-item-selected': selected === `${index}-${i}`
            }"
          >
            <span class="event-item-content">{{ child.name }}</span>
          </li>
        </ul>
      </li>
      <li
        :class="{
          'event-item': true,
          'event-item-selected': selected === String(index)
        }"
        @click="handleSelect(index)"
        v-else
      >
        <div>
          <span>{{ event.name }}</span>
        </div>
      </li>
    </template>
  </ul>
  <t-context-menu
    :menus="CONTEXT_MENUS"
    :visible="contextMenuVisible"
    :x="contextMenuPos.x"
    :y="contextMenuPos.y"
    @close="closeContextMenu"
    @select="handleSelectMenu"
  />
</template>

<script setup lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
import { CONTEXT_MENU, CONTEXT_MENUS } from '@/contants'
import { Modal } from '@/ui'

interface Event {
  id: number;
  name: string;
  children?: Omit<Event, 'children'>[];
}

interface Menu {
  value: string | number;
  label: string | number;
}

interface EventListProps {
  events?: Event[];
  opened: Set<number>;
  selected: string;
}

const props = withDefaults(defineProps<EventListProps>(), {
  events: () => []
})

const contextMenuVisible = ref(false)
const currentEventItem = ref<Event | null>(null)
const contextMenuPos = reactive({ x: 0, y: 0 })

const emit = defineEmits(['open', 'select', 'change'])

const handleSelect = (index: number, parentIndex?: number) => {
  emit('select', index, parentIndex)
}
const handleOpen = (index: number) => {
  emit('open', index)
}
const handleContextMenu = (e: MouseEvent, event: Event, isDirectory: boolean) => {
  contextMenuPos.x = e.clientX
  contextMenuPos.y = e.clientY
  contextMenuVisible.value = true
  currentEventItem.value = { ...event }
}
const closeContextMenu = () => {
  if (contextMenuVisible.value) {
    contextMenuVisible.value = false
  }
}
const deleteEventItem = (id?: Event['id']) => {
  if (!id) return
  const list = props.events.filter(e => {
    if (e.children) {
      e.children = e.children.filter(c => c.id !== id)
      return true
    }

    return e.id !== id
  })
  emit('change', list)
}
const handleSelectMenu = (menu: Menu) => {
  switch(menu.value) {
    case CONTEXT_MENU.delete: {
      Modal.confirm({
        title: '提示',
        content: '确认删除当前的事件吗？',
        onOk: () => deleteEventItem(currentEventItem.value?.id)
      })
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
.event-list {
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  font-feature-settings: "tnum";
  color: #000000d9;
  font-size: 14px;
  text-align: left;
  background: #fff;
  transition: background .3s,width .3s cubic-bezier(.2,0,0,1) 0s;
  overflow: hidden;

  .event-sub-item {
    padding-bottom: 0.02px;
    border-color: .3s cubic-bezier(.645,.045,.355,1),background .3s cubic-bezier(.645,.045,.355,1),padding .15s cubic-bezier(.645,.045,.355,1);

    &-title {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      padding-right: 34px;
      margin-top: 4px;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: border-color .3s,background .3s,padding .1s cubic-bezier(.215,.61,.355,1);
      position: relative;
      cursor: pointer;
      padding: 0 10px;

      &:active,
      &:hover,
      &.event-sub-item-title-opened {
        color: hsl(var(--p));

        .anticon {
          color: hsl(var(--p));
        }
      }

      .anticon {
        transform: translateY(-50%);
        flex: none;
        position: absolute;
        top: 50%;
        right: 16px;
        width: 10px;
        color: #000000d9;
        transition: transform .3s cubic-bezier(.645,.045,.355,1);
      }
    }
  }


  &.event-list-sub {
    background-color: #fafafa;
  }

  .event-item {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    transition: border-color .3s, background .3s,padding .1s cubic-bezier(.215,.61,.355,1);
    cursor: pointer;
    padding: 0 20px;
    border-radius: var(--rounded-btn,.5rem);
    margin: 4px 0;

    &:first-child {
      margin-top: 8px;
    }
    &:last-child {
      margin-bottom: 8px;
    }

    &:hover {
      color: hsl(var(--p));
    }

    &.event-item-selected {
      --tw-bg-opacity: 1;
      background-color: hsl(var(--p)/var(--tw-bg-opacity));
      --tw-text-opacity: 1;
      color: hsl(var(--pc)/var(--tw-text-opacity));
    }
  }

  &:not(.event-list-sub) > .event-item {
    padding: 0 10px;
  }
}
</style>
