import { defineComponent, ref, computed, watch } from 'vue'
import type { PropType } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { genProp, Portal } from '@/utils'
import { getPanelDays } from './utils'
import './styles/panel.less'

const datePickerPanelProps = () => ({
  zIndex: genProp(Number, 10),
  visible: genProp(Boolean, false),
  value: genProp(Object as PropType<Dayjs>),
  x: genProp(Number, 0),
  y: genProp(Number, 0),
}) 

export const DatePickerPanel = defineComponent({
  props: datePickerPanelProps(),
  emits: ['close', 'change'],
  setup(props, { emit }) {
    const value = ref<Dayjs>(props.value ?? dayjs())
    const [year, month] = computed(() => [value.value.year(), value.value.month()]).value
    const monthDays = computed(() => getPanelDays(year, month)).value

    watch(() => props.value, () => {
      value.value = props.value ?? dayjs()
    })

    return () => (
      <Portal>
        <div
          class={['t-date-picker-panel', {
            show: props.visible
          }]}
          style={{
            left: `${props.x}px`,
            top: `${props.y}px`,
            zIndex: props.zIndex,
          }}
        >
          <div class='date-panel'>

          </div>
        </div>
      </Portal>
    )
  }
})
