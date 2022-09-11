import { App } from 'vue'
import { Button } from './button'
import { Modal } from './modal'
import { ContextMenu } from './context-menu'

export function useComponents(app: App) {
  app.use(Button)
  app.use(ContextMenu)
  app.use(Modal)
}
