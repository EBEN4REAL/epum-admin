import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Toasted from "vue-toasted";
import VueToast from 'vue-toast-notification';

Vue.config.productionTip = false


Vue.use(VueAxios, axios);

Vue.use(BootstrapVue);
// Vue.use(Notifications);
// Vue.use(Toasted);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
