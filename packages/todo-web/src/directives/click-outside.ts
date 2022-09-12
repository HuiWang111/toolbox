import { ObjectDirective } from 'vue'
import { isFunction } from '@/utils'

export function clickOutSideDirective(): ObjectDirective {
  const elListener: EventListener = (e) => {
    e.stopPropagation()
  }
  return {
    mounted(el, binding) {
      if (!isFunction(binding.value)) {
        console.warn(`The value of v-clickoutside expect a function, got a(n) ${typeof binding.value}`)
        return
      }

      document.addEventListener('click', binding.value)
      el.addEventListener('click', elListener)
    },
    updated(el, binding) {
      if (!isFunction(binding.value)) {
        return
      }

      document.addEventListener('click', binding.value)
      el.addEventListener('click', elListener)
    },
    beforeUnmount(el, binding) {
      if (!isFunction(binding.value)) {
        return
      }

      document.removeEventListener('click', binding.value)
      el.removeEventListener('click', elListener)
    }
  }
}
