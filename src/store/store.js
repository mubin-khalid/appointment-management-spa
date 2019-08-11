import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_LARAVEL_API

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    patients: [],
    languages: [],
    user: {},
    appointments: [],
    translation_agencies: {},
    admin: {
      users: {},
    },
    notifications: []
  },
  plugins: [createPersistedState()],
  mutations: {
    retrievePatients: (state, patients) => state.patients = patients,
    retrieveToken: (state, token) => state.token = token,
    setLanguages: (state, languages) => state.languages = languages,
    setUser: (state, userObj) => state.user = userObj,
    setAppointments: (state, appointments) => state.appointments = appointments,
    setUsers: (state, users) => state.admin.users = users,
    deleteUser: (state, index) => {
      state.admin.users.users.splice(index, 1)
      state.admin.users.total -= 1
    },
    removeCancelledAppointment: (state, index) => {
      state.appointments.appointments.splice(index, 1)
      state.appointments.total -= 1
    },
    deletePatient: (state, index) => state.patients.splice(index, 1),
    notification: (state, notifications) => state.notifications = notifications,
    ta: (state, ta) => state.translation_agencies = ta,

    addPatient: (state, patient) => state.patients.push(patient),
    addAppointment: (state, appointment) => state.appointments.push(appointment),

    logout(state) {
      state.token = null
      state.user = {}
      state.patients = []
      state.languages = []
      state.appointments = []
      state.admin = {
        users: {},
        translation_agencies: {}
      }
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
    getUser: context => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            if (response.data) {
              context.commit('setUser', response.data)
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    retrievePatients(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      return new Promise((resolve, reject) => {
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
              resolve(response)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    addPatient(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/patients', payload)
            .then(response => {
              let patient = response.data.patient
              patient.editing = false
              context.commit('addPatient', patient)
              resolve(response)
            })
            .catch(error => {
              console.log(error.methods)
              reject(error)
            })
        })
      }

    },
    editPatient(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.put('/update-patient', payload)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    deletePatient(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.delete('/patients/' + payload.id)
            .then(response => {

              context.commit('deletePatient', payload.index)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('logout')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('logout')
              reject(error)
            })
        })
      }
    },
    getLanguages: context => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/languages')
            .then(response => {
              let filtered = response.data.data.filter(function (el) {
                return el.active == 1
              })
              context.commit('setLanguages', filtered)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getTemplate: (context, payload) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/template', payload)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    saveAppointment(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/appointments', payload)
            .then(response => {
              //context.commit('addAppointment', response.data)
              resolve(response)
            })
            .catch(error => {
              console.log(error.methods)
              reject(error)
            })
        })
      }
    },
    loadAppointments: (context, payload) => {
      let all = false
      if (typeof payload.all !== 'undefined' && payload.all == true) {
        all = true
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/appointments/?page_number=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + '&all=' + all)
            .then(response => {
              console.log(response.data)
              context.commit('setAppointments', response.data.data)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    loadNotifications: (context, payload) => {
      let all = false
      if (typeof payload.all !== 'undefined' && payload.all == true) {
        all = true
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/notifications', {
            params: {
              page: payload.page,
              per_page: process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
              all: all
            }
          })
            .then(response => {
              console.log(response.data)
              context.commit('notification', response.data)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    getTranslationAgencies(context, payload) {
      let all = false
      if (typeof payload.all !== 'undefined' && payload.all == true) {
        all = true
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.get('/ta/' + payload.page + '/' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + '/' + all)
            .then(response => {
              context.commit('ta', response.data)
              resolve(response)
            })
            .catch(error => {
              console.log(error.methods)
              reject(error)
            })
        })
      }
    },
    sendReminder: (context, payload) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/push-notification', payload)
            .then(response => {
              resolve(response)
            })
            .catch(error => {
              console.log(error.methods)
              reject(error)
            })
        })
      }
    },
    //  Admin

    manageUsers: (context, payload) => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn && context.getters.isAdmin) {
        return new Promise((resolve, reject) => {
          axios.get(process.env.VUE_APP_ADMIN_USERS, {
            params: {
              page_number: payload.page,
              per_page: process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
            }
          })
            .then(response => {
              context.commit('setUsers', response.data.data)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    deleteUser(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn && context.getters.isAdmin) {
        return new Promise((resolve, reject) => {
          axios.delete('/users/' + payload.id)
            .then(response => {

              context.commit('deleteUser', payload.index)
              resolve(response)
            })
            .catch(error => {
              reject(error)
            })
        })
      }
    },
    addUser(context, payload) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if (context.getters.loggedIn && context.getters.isAdmin) {
        return new Promise((resolve, reject) => {
          axios.post('/users', payload)
            .then(response => {
              context.commit('deleteUser', payload.index)
              resolve(response)
            })
            .catch(error => {
              console.log(error.methods)
              reject(error)
            })
        })
      }
    },

    //guest

    getAppointment: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.get('/appointment/' + payload.id)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    cancelAppointment: (context, payload) => {
      return new Promise((resolve, reject) => {
        axios.post('/cancel-appointment', {
          'appointment_id': payload.id,
          'cancelled_by': payload.cancelled_by,
        })
          .then(response => {
            if (typeof payload.index !== 'undefined') {
              context.commit('removeCancelledAppointment', payload.index)
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
  },


  getters: {
    loggedIn: state => {
      return state.token !== null
    },
    isAdmin: state => {
      return state.user.is_admin == 1
    },
    patients: state => {
      return state.patients
    },
    getLanguages: state => {
      return state.languages
    },
    getAppointments: state => {
      return state.appointments
    },
    getUser: state => {
      return state.user
    },
    getUsers: state => {
      return state.admin.users
    },
    getNotifications: state => {
      return state.notifications
    },
    translation_agencies: state => {
      return state.translation_agencies
    }
  }
})
