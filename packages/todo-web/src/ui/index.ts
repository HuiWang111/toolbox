import { App } from 'vue'
import { default as Modal } from './modal'
import { default as Button } from './button'

export function useComponents(app: App) {
  app.use(Modal)
  app.use(Button)
}

export {
  Modal,
  Button
}
