import { defineComponent, PropType } from 'vue'
import { Portal, genProp } from '@/utils'
import './style.less'

interface Menu {
  value: string | number;
  label: string | number;
}

const contextMenuProps = () => {
  return {
    visible: genProp(Boolean, false),
    x: genProp(Number, 0),
    y: genProp(Number, 0),
    menus: genProp(Array as PropType<Menu[]>, undefined, true),
    closeOnSelect: genProp(Boolean, true),
    getContainer: genProp(Function)
  }
}

export const ContextMenu = defineComponent({
  name: 't-context-menu',
  props: contextMenuProps(),
  emits: ['select', 'close'],
  setup(props, { emit }) {
    const handleSelect = (e: Event, menu: Menu) => {
      e.stopPropagation()
      emit('select', menu)

      if (props.closeOnSelect) {
        emit('close')
      }
    }
    const handleClickOutside = () => {
      emit('close')
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
