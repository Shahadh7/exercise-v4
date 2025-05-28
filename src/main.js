import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'

import {
  faBars,
  faTimes,
  faEye,
  faEyeSlash,
  faUser,
  faInfoCircle,
  faHeart,
  faCog,
  faAnglesLeft,
  faAngleRight,
  faCaretLeft,
  faPencil,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faBars,
  faTimes,
  faEye,
  faEyeSlash,
  faUser,
  faInfoCircle,
  faHeart,
  faCog,
  faAnglesLeft,
  faAngleRight,
  faCaretLeft,
  faPencil,
)

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
