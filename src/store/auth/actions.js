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
      .catch(error => {
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
      .catch(error => {
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