import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { UIButton } from '@llin03/ui'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('ui-button', UIButton)

app.mount('#app')
