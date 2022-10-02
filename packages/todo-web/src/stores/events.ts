import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
  state: () => {
    return {
      list: [
        { id: 1, name: 'Icon', children: [
          { id: 2, name: 'Typography1' },
          { id: 4, name: 'Typography2' }
        ] },
        { id: 3, name: 'Divider' }
      ]
    }
  }
})
