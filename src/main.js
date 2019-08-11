import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueSweetalert2 from 'vue-sweetalert2';
import Default from './layouts/Default'
import GuestAppointmentLayout from './layouts/guestAppointmentLayout'

Vue.config.productionTip = false
Vue.component('default-layout', Default)
Vue.component('guest-appointment-layout', GuestAppointmentLayout)
window.eventBus = new Vue()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !to.meta.adminAuth) {
    if (!store.getters['auth/loggedIn']) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.adminAuth)) {
    if (!store.getters['auth/loggedIn']) {
      next({
        name: 'login',
      })
    } else if (store.getters['auth/isAdmin']) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})
const mixin = {
  methods: {
    popup(title, type) {
      this.$swal({
        title: title,
        type: type,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}
new Vue({
  router,
  store,
  mixins: [mixin],
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    patients() {
      return this.$store.getters('patients')
    }
  },
  render: h => h(App)
}).$mount('#app')
Vue.use(VueSweetalert2)
window._ = require('lodash');