import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { genProp, Portal, isFunction } from '@/utils'
import './style.less'

const modalProps = () => ({
  closable: genProp(Boolean, true),
  visible: genProp(Boolean, false),
  title: genProp(null),
  footer: genProp(null),
  getContainer: genProp(Function, () => document.body),
  afterClose: genProp(Function),
  cancelButtonText: genProp(null, '取消'),
  okButtonText: genProp(null, '确定'),
  destroyOnClose: genProp(Boolean, false),
  modalClass: genProp(String)
})

export type ModalProps = ExtractPropTypes<ReturnType<typeof modalProps>>

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

      if (isFunction(props.afterClose)) {
        props.afterClose()
      }
    }

    return () => {
      if (!props.visible && props.destroyOnClose) {
        return null
      }

      return (
        <Portal>
          <input
            type="checkbox"
            class="t-modal-wrapper modal-toggle"
            checked={props.visible}
            onChange={noop}
          />
          <div
            class={{
              'modal t-modal': true,
              [props.modalClass as string]: Boolean(props.modalClass)
            }}
          >
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
                  <div class='t-modal-header'>
                    <div class="flex t-modal-title">
                      { props.title }
                    </div>
                  </div>
                )
              }
              <div class='t-modal-body'>
                { slots.default?.() }
              </div>
              <div class="modal-action flex t-modal-footer">
                {
                  slots.footer
                    ? slots.footer()
                    : props.footer !== null && (
                      <>
                        {
                          props.cancelButtonText !== null && (
                            <label
                              class="btn btn-outline btn-primary btn-sm"
                              onClick={handleCancel}
                            >
                              { props.cancelButtonText }
                            </label>
                          )
                        }
                        {
                          props.okButtonText !== null && (
                            <label
                              class="btn btn-primary btn-sm"
                              onClick={handleConfirm}
                            >
                              { props.okButtonText }
                            </label>
                          )
                        }
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
