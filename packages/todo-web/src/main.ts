import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { registeDirectives } from '@/directives'
import { useComponents } from '@/ui'
import './styles/index.less'
import './style.css'

const app = createApp(App)

registeDirectives(app)
useComponents(app)
app.use(createPinia())

app.mount('#app')
