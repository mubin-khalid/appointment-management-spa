import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_LARAVEL_API

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    patients: [],
  },
  mutations: {
    retrievePatients(state, patients) {
      state.patients = patients
    },
    retrieveToken(state, token) {
      state.token = token
    },
    addPatient(state, patient) {
      state.patients.push({
        id: patient.id,
        name: patient.name,
        phone: patient.phone,
        email: patient.email,
        editing: false,
      })
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          username: credentials.username,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)

          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      })
    },
    retrievePatients(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/patients')
        .then(response => {
          if (response.data.patients) {
            let tempPatients = response.data.patients
            let patients = []
            for (let key in tempPatients) {
              if (tempPatients.hasOwnProperty(key)) {
                tempPatients[key].editing = false
                patients.push(tempPatients[key])
              }
            }
            context.commit('retrievePatients', patients)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    addPatient(context, patient) {
      context.commit('addPatient', patient)
    },

    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
              // console.log(response);
              // context.commit('addTodo', response.data)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
  },
  getters: {
    loggedIn: state => {
      return state.token !== null
    },
    patients: state => {
      return state.patients
    }
  }
})
