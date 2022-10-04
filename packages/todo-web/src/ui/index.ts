import { App } from 'vue'
import { default as Modal } from './modal'
import { default as Button } from './button'
import { default as Input } from './input'
import { default as DatePicker } from './date-picker'

import type { InputProps } from './input'

export function useComponents(app: App) {
  app.use(Modal)
  app.use(Button)
  app.use(Input)
  app.use(DatePicker)
}

export {
  Modal,
  Button,
  Input,
}

export type {
  InputProps
}
