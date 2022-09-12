import { defineComponent, computed, unref } from 'vue'
import type { PropType } from 'vue'
import { genProp } from '@/utils'

type ButtonType = 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'default';
type ButtonState = 'info' | 'success' | 'warning' | 'error' | 'default';
type ButtonSize = 'lg' | 'sm' | 'xs' | 'default';

const buttonProps = () => ({
  type: genProp(String as PropType<ButtonType>, 'default'),
  state: genProp(String as PropType<ButtonState>, 'default'),
  size: genProp(String as PropType<ButtonSize>, 'default'),
  danger: genProp(Boolean, false),
  outline: genProp(Boolean, false),
  wide: genProp(Boolean, false),
  glass: genProp(Boolean, false),
  square: genProp(Boolean, false),
  circle: genProp(Boolean, false),
  block: genProp(Boolean, false)
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
        <button class={unref(className)}>{slots.default?.()}</button>
      )
    }
  }
})
