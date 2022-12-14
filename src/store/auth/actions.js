import Request from "../../helper/Request";

export default {
  login(context, credentials) {
    return Request({
      method: 'post',
      endpoint: 'login',
      data: credentials,
      isDataRaw: true
    }).then(response => {
      const token = response.access_token
      localStorage.setItem('access_token', token)
      context.commit('setToken', token)
      return true
    })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  DTLogin(context, credentials) {
    return Request({
      method: 'post',
      endpoint: 'dt-login',
      data: credentials,
      isDataRaw: true
    }).then(response => {
      const token = response.access_token
      localStorage.setItem('access_token', token)
      context.commit('setToken', token)
      return true
    })
      .catch(() => {
        return false
      })
  },
  logout({commit, rootState}) {
    Request({
      method: 'post',
      endpoint: 'logout'
    }).then(response => {
      localStorage.removeItem('access_token')

      commit('logout')
      rootState.language.languages = []

      return response.data
    })
      .catch(() => {
        localStorage.removeItem('access_token')
        commit('logout')
      })
  },
  getUser: context => {
    return Request({
      method: 'get',
      endpoint: 'user'
    }).then(response => {
      if (response.data) {
        context.commit('setUser', response.data)
        return response.data
      }
    }).catch(error => {
      return error.message
    })
  },
  sendPasswordResetEmail(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'reset-password',
      data: payload,
      isDataRaw: true
    }).then(() => {
      return true
    })
      .catch(() => {
        return false
      })
  },
  setBaseAppState({rootState}) {

    rootState.translation_agencies = {}
    rootState.admin = {
      users: {},
    }
    rootState.appointment.appointments = {}
    rootState.auth.user = {}
    rootState.client.clients = []
    rootState.language.languages = []
    rootState.notifications.notifications = []
  }
}