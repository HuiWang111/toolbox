import { defineComponent } from 'vue'
import { genProp, Portal } from '@/utils'

const modalProps = () => ({
  closable: genProp(Boolean, true),
  visible: genProp(Boolean, false),
  title: genProp(String),
  footer: genProp(null),
  getContainer: genProp(Function, () => document.body)
})

export const Modal = defineComponent({
  name: 't-modal',
  props: modalProps(),
  emits: ['cancel', 'ok', 'close'],
  setup(props, { emit, slots }) {
    const noop = () => {}
    const handleCancel = () => {
      emit('cancel')
    }
    const handleConfirm = () => {
      emit('ok')
    }
    const handleClose = () => {
      emit('close')
    }

    return () => {
      return (
        <Portal>
          <input
            type="checkbox"
            class="modal-toggle"
            checked={props.visible}
            onChange={noop}
          />
          <div class="modal d-modal">
            <div class="modal-box relative">
              {
                props.closable && (
                  <label
                    class="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={handleClose}
                  >
                    ✕
                  </label>
                )
              }
              {
                props.title && (
                  <div class="flex justify-center d-modal-title">
                    { props.title }
                  </div>
                )
              }
              { slots.default?.() }
              <div class="modal-action flex justify-center">
                {
                  slots.footer
                    ? slots.footer()
                    : props.footer !== null && (
                      <>
                        <label
                          class="btn btn-outline btn-primary btn-sm"
                          onClick={handleCancel}
                        >
                          取消
                        </label>
                        <label
                          class="btn btn-primary btn-sm"
                          onClick={handleConfirm}
                        >
                          确定
                        </label>
                      </>
                    )
                }
              </div>
            </div>
          </div>
        </Portal>
      )
    }
  }
})
