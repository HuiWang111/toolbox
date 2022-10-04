import { defineComponent } from 'vue'
import { genProp } from '@/utils'
import './style.less'

const buttonProps = () => ({
  icon: genProp(String),
  info: genProp(Boolean, false),
  success: genProp(Boolean, false),
  danger: genProp(Boolean, false),
  blocked: genProp(Boolean, false),
  primary: genProp(Boolean, false),
})

export const Button = defineComponent({
  name: 't-button',
  props: buttonProps(),
  emits: ['click'],
  setup(props, { slots, emit }) {
    return () => (
      <button
        onClick={(e) => emit('click', e)}
        class={['t-button', {
          'info-buton': props.info,
          'success-button': props.success,
          'danger-button': props.danger,
          'blocked-button': props.blocked,
          'primary-button': props.primary,
        }]}
      >
        {
          props.icon && <img src={props.icon} />
        }
        <span>
          { slots.default?.() }
        </span>
      </button>
    )
  }
})
