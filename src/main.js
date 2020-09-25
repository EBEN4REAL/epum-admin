import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false


Vue.use(VueAxios, axios);
Vue.use(Toast);
Vue.use(BootstrapVue);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
