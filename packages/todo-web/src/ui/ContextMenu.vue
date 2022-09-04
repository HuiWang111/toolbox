<template>
  <portal :get-container="getContainer">
    <div
      class="todo-web-context-menu"
      :style="{
        left: `${x}px`,
        top: `${y}px`
      }"
      v-show="visible"
    >
      <ul class="menu bg-base-100 w-56 shadow-xl">
        <li
          v-for="menu in menus"
          :key="menu.value"
          @click.stop="handleSelect(menu)"
        >
          {{ menu.label }}
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
  getContainer?: () => HTMLElement;
}

withDefaults(defineProps<ContextMenuProps>(), {
  visible: false,
  x: 0,
  y: 0,
  getContainer: () => document.body
})

const emit = defineEmits(['select'])
const handleSelect = (menu: Menu) => {
  emit('select', menu)
}
</script>

<style lang="less">
.todo-web-context-menu {
  position: absolute;
}
</style>