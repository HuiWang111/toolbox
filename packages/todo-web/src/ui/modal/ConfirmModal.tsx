import type { VNode } from 'vue'
import { Dialog } from './Dialog'
import type { DialogProps } from './Dialog'
import { isFunction } from '@/utils'

export interface InternalConfirmModalProps extends Omit<DialogProps, 'title'> {
  icon: VNode | (() => VNode);
  title: string | VNode;
  content?: string | VNode;
  type: 'warning' | 'info' | 'success' | 'error' | 'confirm';
  close: (...args: any[]) => void;
  onCancel?: () => void;
  onOk?: () => void;
}

export const ConfirmModal = (props: InternalConfirmModalProps) => {
  const {
    icon,
    title,
    content,
    type,
    close,
    onCancel,
    onOk,
    ...restProps
  } = props

  const handleCancel = () => {
    onCancel?.()
    close()
  }
  const handleOk = () => {
    onOk?.()
    close()
  }

  return (
    <Dialog
      { ...restProps }
      onCancel={handleCancel}
      onOk={handleOk}
      onClose={close}
      modalClass={`t-modal-confirm-${type}`}
    >
      <div class='t-confirm-modal-body'>
        { isFunction(icon) ? icon() : icon }
        <div class='t-confirm-modal-title'>
          { title }
        </div>
        <div class='t-confirm-modal-content'>
          { content }
        </div>
      </div>
    </Dialog>
  )
}
