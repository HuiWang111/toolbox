import { defineComponent } from 'vue'
import { Portal } from '@/utils'
import { Dialog, dialogProps } from './Dialog'
import './style.less'

export const Modal = defineComponent({
  name: 't-modal',
  props: dialogProps(),
  emits: ['cancel', 'ok', 'close'],
  setup(props, { slots }) {
    return () => {
      return (
        <Portal>
          <Dialog
            { ...props }
          >
            { slots.default?.() }
          </Dialog>
        </Portal>
      )
    }
  }
})
