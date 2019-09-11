import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import auth from './auth'
import client from './client'
import appointment from './appointment'
import language from './language'
import user from './user'
import notifications from './notifications'
import translationAgencies from './translationAgencies'
import verify from './verify'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth,
    client,
    appointment,
    language,
    user,
    notifications,
    translationAgencies,
    verify
  },
})
