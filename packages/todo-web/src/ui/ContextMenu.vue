<template>
  <portal :get-container="getContainer">
    <div
      class="todo-web-context-menu shadow-xl"
      :style="{
        left: `${x}px`,
        top: `${y}px`
      }"
      v-show="visible"
      v-clickoutside="handleClickOutside"
    >
      <ul
        class="menu menu-compact bg-base-100 w-56"
        v-show="visible"
      >
        <li
          v-for="menu in menus"
          :key="menu.value"
          @click.stop="handleSelect(menu)"
        >
          <a>{{ menu.label }}</a>
        </li>
      </ul>
    </div>
  </portal>
</template>

<script lang="ts" setup>
import { Portal } from '@/utils'

interface Menu {
  value: string | number;
  label: string | number;
}

interface ContextMenuProps {
  visible?: boolean;
  x?: number;
  y?: number;
  menus: Menu[];
  closeOnSelect?: boolean;
  getContainer?: () => HTMLElement;
}

withDefaults(defineProps<ContextMenuProps>(), {
  visible: false,
  x: 0,
  y: 0,
  getContainer: () => document.body
})

const emit = defineEmits(['select', 'clickoutside'])
const handleSelect = (menu: Menu) => {
  emit('select', menu)
}
const handleClickOutside = () => {
  emit('clickoutside')
}
</script>

<style lang="less">
.todo-web-context-menu {
  position: absolute;
  overflow: hidden;
  border-radius: 2px;
}
</style>