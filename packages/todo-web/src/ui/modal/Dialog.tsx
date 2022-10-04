import { defineComponent } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { genProp, isFunction } from '@/utils'
import { Button } from '@/ui'
import './style.less'

export const dialogProps = () => ({
  closable: genProp(Boolean, true),
  visible: genProp(Boolean, false),
  title: genProp(null),
  footer: genProp(null),
  getContainer: genProp(Function, () => document.body),
  afterClose: genProp(Function),
  cancelButtonText: genProp(null, '取消'),
  okButtonText: genProp(null, '确定'),
  destroyOnClose: genProp(Boolean, false),
  rootClass: genProp(String),
  width: genProp(Number, 720),
  class: genProp(String)
})

export type DialogProps = ExtractPropTypes<ReturnType<typeof dialogProps>>

export const Dialog = defineComponent({
  props: dialogProps(),
  emits: ['cancel', 'ok', 'close'],
  setup(props, { emit, slots }) {
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
        <div
          class={[
            't-modal-root',
            {
              [props.rootClass as string]: Boolean(props.rootClass)
            }
          ]}
        >
          <div class="t-modal-mask"></div>
          <div class="t-modal-wrap">
            <div
              class={['t-modal', { [props.class as string]: Boolean(props.class) }]}
              style={`--modal-width: ${props.width}px`}
            >
              {
                props.closable && (
                  <button
                    class="t-modal-close-icon"
                    onClick={handleClose}
                  >
                    <span>✕</span>
                  </button>
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
              {
                props.footer !== null && (
                  <div class="t-modal-footer">
                    {
                      slots.footer
                        ? slots.footer()
                        : (
                          <>
                            {
                              props.cancelButtonText !== null && (
                                <Button
                                  onClick={handleCancel}
                                >
                                  { props.cancelButtonText }
                                </Button>
                              )
                            }
                            {
                              props.okButtonText !== null && (
                                <Button
                                  onClick={handleConfirm}
                                  primary
                                >
                                  { props.okButtonText }
                                </Button>
                              )
                            }
                          </>
                        )
                    }
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )
    }
  }
})
