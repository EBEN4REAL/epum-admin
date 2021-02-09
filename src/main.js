import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import VueAxios from "vue-axios";
import Toast from "vue-toastification";
import VModal from "vue-js-modal";
import VueMoment from 'vue-moment';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import "vue-toastification/dist/index.css";
import 'vue-search-select/dist/VueSearchSelect.css'



import BootstrapVue from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { GridPlugin } from "@syncfusion/ej2-vue-grids";

Vue.config.productionTip = false

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.use(VueAxios, axios);
Vue.use(VModal)
Vue.use(VueMoment)
Vue.use(Toast);
Vue.use(BootstrapVue);
Vue.use(GridPlugin);
Vue.prototype.$eventHub = new Vue();


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
