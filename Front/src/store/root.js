import { Getters, Mutations, Actions, Module } from "vuex-smart-module";
import UserStore from "./user";
import AdminStore from "./admin";
import PartnerStore from "./partner";
import ClientStore from "./client";
import NotificationStore from "./notification";
import TicketsStore from "./tickets";
/* import ManagerStore from "./manager";

import ClientStore from "./client"; */

class RootState {}

class RootGetters extends Getters {}

class RootMutations extends Mutations {}

class RootActions extends Actions {}

export default new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules: {
    UserStore,
    AdminStore,
    PartnerStore,
    ClientStore,
    NotificationStore,
    TicketsStore
/*     ManagerStore,
    
    ClientStore */
  },
});
