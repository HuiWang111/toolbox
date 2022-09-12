import { App } from 'vue'
import { Button } from './button'
import { default as Modal } from './modal'
import { ContextMenu } from './context-menu'

export function useComponents(app: App) {
  app.use(Modal)
  app.use(Button)
  app.use(ContextMenu)
}

export {
  Modal,
  Button,
  ContextMenu
}
