import type { App, Plugin } from 'vue'

export function withInstall<T>(comp: T) {
  const c = comp as any
  c.install = function(app: App) {
    app.component(c.name, comp)
  }

  return c as T & Plugin
}