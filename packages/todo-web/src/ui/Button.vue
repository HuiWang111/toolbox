<template>
  <button :class="className" >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'default';
  state?: 'info' | 'success' | 'warning' | 'error' | 'default';
  size?: 'lg' | 'sm' | 'xs' | 'default';
  danger?: boolean;
  outline?: boolean;
  wide?: boolean;
  glass?: boolean;
  square?: boolean;
  circle?: boolean;
  block?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  state: 'default',
  size: 'default',
  danger: false,
  outline: false,
  wide: false,
  glass: false,
  square: false,
  circle: false,
  block: false
})

const className = computed(() => {
  return {
    'btn': true,
    'btn-outline': props.outline,
    'btn-wide': props.wide,
    'glass': props.glass,
    'btn-square': props.square,
    'btn-circle': props.circle,
    'btn-block': props.block,
    [`btn-${props.size}`]: props.size !== 'default',
    [`btn-${props.type}`]: props.type !== 'default',
    [`btn-${props.state}`]: props.state !== 'default',
  }
})
</script>