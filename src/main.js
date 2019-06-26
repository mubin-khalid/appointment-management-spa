import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
window.eventBus = new Vue()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !to.meta.adminAuth) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.adminAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else if(store.getters.user){
      console.log(store.getters.user)
      next({
        name: 'admin',
      })
    }
    else{
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