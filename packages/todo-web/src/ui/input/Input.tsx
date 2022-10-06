import { defineComponent, ref, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { genProp, isUndefined } from '@/utils'
import './style.less'

const inputProps = () => {
  return {
    rightIcon: {
      type: String
    },
    value: genProp(String),
    defaultValue: genProp(String),
    placeholder: genProp(String),
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
  emits: ['change', 'focus', 'blur', 'clickRightIcon'],
  setup(props, { emit, attrs, expose }) {
    const stateValue = ref(isUndefined(props.value) ? props.defaultValue : props.value)
    const inputRef = ref<HTMLInputElement | null>(null)

    watch(
      () => props.value,
      (newVal) => {
        stateValue.value = newVal
      }
    )
    
    const handleInputChange = (e: Event) => {
      const target = (e.target as HTMLInputElement)
      if (isUndefined(props.value)) {
        stateValue.value = target.value
        emit('change', e)
      } else {
        target.value = stateValue.value ?? ''
        emit('change', e)
      }
    }

    const focus = () => {
      inputRef.value?.focus()
    }
    const blur = () => {
      inputRef.value?.blur()
    }

    expose({
      focus,
      blur,
      input: inputRef
    })

    return () => {
      return (
        <div class='t-input-wrap'>
          <input
            class='t-input'
            { ...attrs }
            value={stateValue.value}
            placeholder={props.placeholder}
            onInput={handleInputChange}
            onFocus={e => emit('focus', e)}
            onBlur={e => emit('blur', e)}
            ref={inputRef}
          />
          {
            props.rightIcon && (
              <div class='t-input-icon-wrap' onClick={(e) => emit('clickRightIcon', e)}>
                <img src={props.rightIcon} />
              </div>
            )
          }
        </div>
      )
    }
  }
})
