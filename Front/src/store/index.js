import Vue from "vue";
import Vuex from "vuex";
import { createStore } from "vuex-smart-module";
import createPersistedState from "vuex-persistedstate";
import RootStore from "./root";

Vue.use(Vuex);

export const store = createStore(RootStore, {
  plugins: [createPersistedState()],
});
