import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserCircle,
  faSpinner,
  faEnvelope,
  faUsers,
  faUserSecret
} from "@fortawesome/free-solid-svg-icons"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faSpinner,
  faEnvelope,
  faTwitter,
  faUsers,
  faUserSecret
)

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
