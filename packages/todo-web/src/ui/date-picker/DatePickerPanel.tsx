import { defineComponent, ref, computed, watch } from 'vue'
import type { PropType, Ref } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { genProp, Portal } from '@/utils'
import { getPanelDays } from './utils'
import { WEEKS } from './constants'
import { DateInformation } from './types'
import './styles/panel.less'

const datePickerPanelProps = () => ({
  zIndex: genProp(Number, 10),
  visible: genProp(Boolean, false),
  value: genProp(Object as PropType<Dayjs>),
  x: genProp(Number, 0),
  y: genProp(Number, 0),
})

const getYearMonthByValue = (value: Ref<Dayjs | undefined>) => {
  const date = value.value ?? dayjs()
  return {
    year: date.year(),
    month: date.month()
  }
}

export const DatePickerPanel = defineComponent({
  props: datePickerPanelProps(),
  emits: ['close', 'change'],
  setup(props, { emit }) {
    const value = ref<Dayjs | undefined>(props.value)
    const current = ref(getYearMonthByValue(value))
    const monthDays = computed(() => getPanelDays(current.value.year, current.value.month))
    
    watch(() => props.value, () => {
      value.value = props.value
      current.value = getYearMonthByValue(value)
    })

    const handlePrevYear = () => {
      current.value.year -= 1
    }
    const handlePrevMonth = () => {
      if (current.value.month < 2) {
        current.value.month = 12
        current.value.year -= 1
      } else {
        current.value.month -= 1
      }
    }
    const handleNextYear = () => {
      current.value.year += 1
    }
    const handleNextMonth = () => {
      if (current.value.month > 11) {
        current.value.month = 1
        current.value.year += 1
      } else {
        current.value.month += 1
      }
    }
    const handleClickDateItem = (day: DateInformation) => {
      if (day.isCurrentMonth) {
        emit('change', dayjs(day.format))
        emit('close')
      }
    }

    return () => {
      return (
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
            onClick={e => e.stopPropagation()}
          >
            <div class='t-date-picker-panel-header'>
              <div class='header-left'>
                <button class='click-effect' onClick={handlePrevYear}>
                  <span class='super-prev-icon'></span>
                </button>
                <button class='click-effect' onClick={handlePrevMonth}>
                  <span class='prev-icon'></span>
                </button>
              </div>
              <div class='header-center'>{current.value.year}年{current.value.month + 1}月</div>
              <div class='header-right'>
                <button class='click-effect' onClick={handleNextMonth}>
                  <span class='next-icon'></span>
                </button>
                <button class='click-effect' onClick={handleNextYear}>
                  <span class='super-next-icon'></span>
                </button>
              </div>
            </div>
            <div class='t-date-picker-panel-body'>
              <div class='date-title-row'>
                {
                  WEEKS.map(week => {
                    return (
                      <div class='date-title-wrap'>
                        <div class='date-title'>{week}</div>
                      </div>
                    )
                  })
                }
              </div>
              <div class='date-item-block'>
                {
                  monthDays.value.map(day => {
                    return (
                      <div
                        class='date-item-wrap'
                        title={day.format}
                      >
                        <div
                          class={['date-item', {
                            'active-date-item': value.value
                              ? day.format === value.value.format('YYYY-MM-DD')
                              : false,
                            'is-current-month': day.isCurrentMonth
                          }]}
                          onClick={() => handleClickDateItem(day)}
                        >
                          { day.date }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Portal>
      )
    }
  }
})
