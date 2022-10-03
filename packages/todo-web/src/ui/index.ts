import { App } from 'vue'
import { default as Modal } from './modal'

export function useComponents(app: App) {
  app.use(Modal)
}

export {
  Modal,
}
