import { render as vueRender, createVNode } from 'vue'
import type { VNode } from 'vue'
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons-vue'
import { ConfirmModal } from './ConfirmModal'
import type { InternalConfirmModalProps } from './ConfirmModal'
import { createContainer, isFunction } from '@/utils'

type ConfigUpdate = InternalConfirmModalProps | ((prevConfig: InternalConfirmModalProps) => InternalConfirmModalProps);
export const destroyFns: (() => void)[] = []
export type ConfirmModalProps = Omit<InternalConfirmModalProps, 'close' | 'icon' | 'type'>
type WithoutClose<T> = Omit<T, 'close'>

export interface ConfirmRes {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
}

export function confirm(config: ConfirmModalProps): ConfirmRes {
  const container = createContainer()
  let currentConfig = {
    ...config,
    close,
    visible: true
  } as any
  let confirmDialogInstance: VNode | null = null

  function destroy() {
    if (confirmDialogInstance) {
      vueRender(null, container)
      confirmDialogInstance.component?.update()
      confirmDialogInstance = null
    }

    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  }
  function close() {
    currentConfig = {
      ...currentConfig,
      visible: false,
      afterClose: () => {
        if (isFunction(config.afterClose)) {
          config.afterClose()
        }
        destroy()
      }
    }
    update(currentConfig)
  }
  function update(configUpdate: ConfigUpdate) {
    if (isFunction(configUpdate)) {
      currentConfig = {
        ...configUpdate(currentConfig)
      }
    } else {
      currentConfig = {
        ...currentConfig,
        ...configUpdate
      }
    }

    if (confirmDialogInstance) {
      Object.assign(confirmDialogInstance.component?.props || {}, currentConfig)
      confirmDialogInstance.component?.update()
    }
  }
  function render(props: ConfirmModalProps): VNode {
    const vNode = createVNode(ConfirmModal, { ...props })
    vueRender(vNode, container)
    return vNode
  }

  confirmDialogInstance = render(currentConfig)
  destroyFns.push(close)
  return {
    destroy: close,
    update
  }
}

export function withWarn(props: ConfirmModalProps): WithoutClose<InternalConfirmModalProps> {
  return {
    ...props,
    icon: () => <ExclamationCircleOutlined />,
    cancelButtonText: null,
    type: 'warning'
  }
}

export function withInfo(props: ConfirmModalProps): WithoutClose<InternalConfirmModalProps> {
  return {
    ...props,
    icon: () => <InfoCircleOutlined />,
    cancelButtonText: null,
    type: 'info',
  };
}

export function withSuccess(props: ConfirmModalProps): WithoutClose<InternalConfirmModalProps> {
  return {
    ...props,
    icon: () => <CheckCircleOutlined />,
    cancelButtonText: null,
    type: 'success',
  };
}

export function withError(props: ConfirmModalProps): WithoutClose<InternalConfirmModalProps> {
  return {
    ...props,
    icon: () => <CloseCircleOutlined />,
    cancelButtonText: null,
    type: 'error',
  };
}

export function withConfirm(props: ConfirmModalProps): WithoutClose<InternalConfirmModalProps> {
  return {
    ...props,
    icon: () => <QuestionCircleOutlined />,
    type: 'confirm',
  };
}
