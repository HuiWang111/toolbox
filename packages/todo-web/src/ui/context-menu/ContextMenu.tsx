import { defineComponent, PropType } from 'vue'
import { Portal } from '@/utils'
import './style.less'

interface Menu {
  value: string | number;
  label: string | number;
}

const contextMenuProps = () => {
  return {
    visible: {
      type: Boolean,
      default: false
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    menus: {
      type: Array as PropType<Menu[]>,
      required: true
    },
    closeOnSelect: {
      type: Boolean,
      default: false
    },
    getContainer: {
      type: Function
    }
  }
}

export const ContextMenu = defineComponent({
  name: 't-context-menu',
  props: contextMenuProps(),
  emits: ['select', 'clickoutside'],
  setup(props, { emit }) {
    const handleSelect = (e: Event, menu: Menu) => {
      e.stopPropagation()
      emit('select', menu)
    }
    const handleClickOutside = () => {
      emit('clickoutside')
    }

    return () => {
      return (
        <Portal
          getContainer={props.getContainer}
        >
          <div
            class="todo-web-context-menu shadow-xl"
            style={{
              left: `${props.x}px`,
              top: `${props.y}px`
            }}
            v-show={props.visible}
            v-clickoutside={handleClickOutside}
          >
            <ul
              class="menu menu-compact bg-base-100 w-56"
            >
              {
                props.menus?.map((menu) => {
                  return (
                    <li
                      key={menu.value}
                      onClick={(e) => handleSelect(e, menu)}
                    >
                      <a>{menu.label}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </Portal>
      )
    }
  }
})
