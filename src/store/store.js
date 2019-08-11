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
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  //actions: {
    // sendReminder: (context, payload) => {
    //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    //   if (context.getters.loggedIn) {
    //     return new Promise((resolve, reject) => {
    //       axios.post('/push-notification', payload)
    //         .then(response => {
    //           resolve(response)
    //         })
    //         .catch(error => {
    //           console.log(error.methods)
    //           reject(error)
    //         })
    //     })
    //   }
    // },
    //  Admin

    
 // },
  modules: {
    auth,
    client,
    appointment,
    language,
    user,
    notifications,
    translationAgencies,
  },
})
