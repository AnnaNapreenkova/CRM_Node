import Vue from "vue";
import VueRouter from "vue-router";
import mainLinks from "@/router/main";
import adminLinks from "@/router/admin";
import managerLinks from "@/router/manager";
import partnerLinks from "@/router/partner";
import clientLinks from "@/router/client";

import vClickOutside from "v-click-outside";

Vue.use(vClickOutside);
Vue.use(VueRouter);

const routes = [
  ...mainLinks,
  ...adminLinks,
  ...managerLinks,
  ...partnerLinks,
  ...clientLinks  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
