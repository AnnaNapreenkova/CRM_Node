import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store';
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
// import toastMixin from "@/mixins/toast";
import toastMixin from "@/scripts/toastMixin";
import errorToastMixin from "@/mixins/errorToast";
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(VueApexCharts);


Vue.mixin(toastMixin);
Vue.mixin(errorToastMixin);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
