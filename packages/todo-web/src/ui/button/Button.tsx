import { defineComponent, computed } from 'vue'
import type { PropType } from 'vue'

type ButtonType = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'default';
type ButtonState = 'info' | 'success' | 'warning' | 'error' | 'default';
type ButtonSize = 'lg' | 'sm' | 'xs' | 'default';

const buttonProps = () => ({
  type: {
    type: String as PropType<ButtonType>,
    default: 'default'
  },
  state: {
    type: String as PropType<ButtonState>,
    default: 'default'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default'
  },
  danger: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  wide: {
    type: Boolean,
    default: false
  },
  glass: {
    type: Boolean,
    default: false
  },
  square: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
})

export const Button = defineComponent({
  name: 't-button',
  props: buttonProps(),
  setup(props, { slots }) {
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

    return () => {
      return (
        <button class={className.value}>{slots.default?.()}</button>
      )
    }
  }
})
