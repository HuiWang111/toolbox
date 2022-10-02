import { Modal as InternalModal } from './Modal'
import { confirm, withWarn, withSuccess, withInfo, withError, withConfirm, destroyFns } from './confirm'
import type { ConfirmRes, ConfirmModalProps } from './confirm'
import { withInstall } from '@/utils'

const Modal = withInstall(InternalModal)
type ModalFunc = (props: ConfirmModalProps) => ConfirmRes

function modalWarn(props: ConfirmModalProps) {
  return confirm(withWarn(props));
}
Modal.warning = modalWarn;
Modal.warn = modalWarn;

Modal.info = function (props: ConfirmModalProps) {
  return confirm(withInfo(props));
};

Modal.success = function (props: ConfirmModalProps) {
  return confirm(withSuccess(props));
};

Modal.error = function (props: ConfirmModalProps) {
  return confirm(withError(props));
};

Modal.confirm = function (props: ConfirmModalProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function () {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

export default Modal as typeof Modal & {
  readonly info: ModalFunc;

  readonly success: ModalFunc;

  readonly error: ModalFunc;

  readonly warn: ModalFunc;

  readonly warning: ModalFunc;

  readonly confirm: ModalFunc;

  readonly destroyAll: () => void;
};
