import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registeDirectives } from '@/directives'

const app = createApp(App)

registeDirectives(app)

app.mount('#app')
