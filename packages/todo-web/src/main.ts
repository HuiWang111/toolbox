import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registeDirectives } from '@/directives'
import { useComponents } from '@/ui'

const app = createApp(App)

registeDirectives(app)
useComponents(app)

app.mount('#app')
