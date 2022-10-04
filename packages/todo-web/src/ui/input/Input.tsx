import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { genProp } from '@/utils'
import './style.less'

const inputProps = () => {
  return {
    rightIcon: {
      type: String
    },
    value: genProp(String)
  }
}

export type InputProps = ExtractPropTypes<ReturnType<typeof inputProps>>

export const Input = defineComponent({
  name: 't-input',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: inputProps(),
  emits: ['change', 'focus', 'blur'],
  setup(props, { emit, attrs }) {
    return () => (
      <div class='t-input-wrap'>
        <input
          class='t-input'
          { ...attrs }
          value={props.value}
          onChange={e => emit('change', e)}
          onFocus={e => emit('focus', e)}
          onBlur={e => emit('blur', e)}
          ref='input'
        />
        {
          props.rightIcon && (
            <div class='t-input-icon-wrap'>
              <img src={props.rightIcon} />
            </div>
          )
        }
      </div>
    )
  }
})
