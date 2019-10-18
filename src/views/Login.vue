<template>
  <div class="p-6">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <div class="w-full max-w-xs text-center m-auto mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="attemptLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            {{ verbiage.username }}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Username" v-model="username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            {{ verbiage.password }}
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" v-model="password">
          <p class="text-red-500 text-xs italic">{{ verbiage.login_password_error }}</p>
        </div>
        <div class="flex items-center justify-between">
          <input type="submit" :value="verbiage.sign_in"
                 class="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>

          <input type="button" value="DT Login"
                 class="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="loginWithDT"/>
        </div>
        <a class="mt-3 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"
           @click="showForgetPasswordModal=true">
          Forgot Password?
        </a>
      </form>
    </div>
    <modal v-if="showForgetPasswordModal" width="w-1/3" height="h-auto" @close="sendEmail" 
           @dismiss="showForgetPasswordModal=false">
      <div slot="header">Input email to receive reset password email</div>
      <div slot="body">
        <input type="email" 
               class="appearance-none bg-transparent border-1 w-full text-gray-700 mr-3 py-1 p-2 leading-tight focus:outline-none bg-gray-200" id="forget_password_email" v-model="forgetEmail">
      </div>
    </modal>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions, mapGetters} from 'vuex'
  import VueElementLoading from 'vue-element-loading'
  import ModalComponent from '@/components/ModalComponent'
  
  export default {
    name: "login",
    mixins: [Popup],
    components: {
      VueElementLoading,
      'modal': ModalComponent,
    },
    data() {
      return {
        show: false,
        username: '',
        password: '',
        showForgetPasswordModal: false,
        forgetEmail: '',
        showNotification: true
      }
    },
    computed: {
      ...mapGetters('auth', [
        'isAdmin'
      ]),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
      loggedIn() {
        return false
      }
    },
    methods: {
      ...mapActions('auth', ['login', 'getUser', 'sendPasswordResetEmail']),
      sendEmail() {
        this.showForgetPasswordModal = false
        if(this.forgetEmail.trim() == '') {
          return;
        }
        this.sendPasswordResetEmail({email: this.forgetEmail}).then(() => {
          this.popup('Email sent', 'success', 2000)
          this.forgetEmail = ''
        })
      },
      attemptLogin() {
        if (this.username.trim() == '' || this.password.trim() == '') {
          this.popup('Please fill-in all fields.', 'error', 3000)
          return;
        }
        this.show = true
        this.login({
          username: this.username,
          password: this.password,
        })
          .then(() => {
            this.show = false
            this.popup('Logged in successfully', 'success', 2000)
            this.getUser().then(() => {
              if (this.isAdmin) {
                this.$router.push({name: 'admin'})
              } else {
                this.$router.push({name: 'invite'})
              }

            })
          })
          .catch(error => {
            this.show = false
            this.popup(error.response.data.message, 'error', 3000)
            this.password = ''
          })
      },
      
      loginWithDT() {
        window.location.href = process.env.VUE_APP_API_DOMAIN + '/' + 'dt-auth'
      }
    },
  }
</script>

<style scoped>

</style>
