import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { registeDirectives } from '@/directives'
import { useComponents } from '@/ui'

const app = createApp(App)

registeDirectives(app)
useComponents(app)
app.use(createPinia())

app.mount('#app')
