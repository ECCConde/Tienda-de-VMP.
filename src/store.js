// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    login(state, userData) {
      state.isLoggedIn = true;
      state.user = userData;
    },
    register(state, userData) {
      state.isLoggedIn = true;
      state.user = userData;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
