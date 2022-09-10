import type { App } from 'vue'
import { clickOutSideDirective } from './click-outside'

export function registeDirectives(app: App) {
  app.directive('clickoutside', clickOutSideDirective())
}
