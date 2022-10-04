import { defineComponent, ref, computed, onMounted, ComponentPublicInstance } from 'vue'
import type { PropType } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { genProp } from '@/utils'
import dateIcon from '@/assets/images/date.svg'
import type { InputProps } from '@/ui'
import { Input } from '@/ui'
import { DatePickerPanel } from './DatePickerPanel'

const datePickerProps = () => {
  return {
    value: Object as PropType<Dayjs>,
    format: genProp(String, 'YYYY/MM/DD'),
    inputProps: {
      type: Object as PropType<InputProps>,
      default: {
        rightIcon: dateIcon
      }
    }
  }
}

export const DatePicker = defineComponent({
  name: 't-date-picker',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: datePickerProps(),
  emits: ['change'],
  setup(props, { emit }) {
    const value = ref<Dayjs>(props.value ?? dayjs())
    const panelVisible = ref(false)
    const panelX = ref(0)
    const panelY = ref(0)
    const inputInstance = ref<ComponentPublicInstance | null>(null)
    const formattedValue = computed<string>(() => {
      return value.value ? value.value.format(props.format) : ''
    })

    const handleShowPanel = () => {
      const rect = (inputInstance.value?.$refs.input as HTMLInputElement).getBoundingClientRect()
      panelX.value = rect?.x ?? 0
      panelY.value = (rect?.y ?? 0) + 34
      panelVisible.value = true
    }

    const handleClosePanel = () => {
      panelVisible.value = false
    }

    onMounted(() => {
      console.log(inputInstance.value)
    })

    return () => (
      <>
        <Input
          {...props.inputProps}
          class='date-pick-input'
          value={formattedValue.value}
          ref={inputInstance}
          onFocus={handleShowPanel}
          onBlur={handleClosePanel}
        />
        <DatePickerPanel
          visible={panelVisible.value}
          value={value.value}
          x={panelX.value}
          y={panelY.value}
          zIndex={1001}
        />
      </>
    )
  }
})
