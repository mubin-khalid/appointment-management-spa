<template>
  <div class="w-1/4 m-auto">
    <div class="w-full max-w-xs text-center mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="attemptLogin">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Username" v-model="username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******************" v-model="password">
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <input type="submit" value="Sign In"
                 class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>


          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions, mapMutations} from 'vuex'
  export default {
    name: "login",
    mixins: [Popup],
    data() {
      return {
        username: '',
        password: ''
      }
    },
    computed: {
      loggedIn() {
        return false
      }
    },
    methods: {
      ...mapActions('auth', ['login', 'getUser']),
      ...mapMutations('auth', []),
      attemptLogin() {
        if(this.username.trim() == '' ||  this.password.trim() == '') {
          this.popup('Please fill-in all fields.', 'error', 3000)
          return;
        }
        this.login({
          username: this.username,
          password: this.password,
        })
        // this.$store.dispatch('retrieveToken', {
        //   username: this.username,
        //   password: this.password,
        // })
          .then(response => {
            console.log(response)
            if(!response) {
              this.popup('Invalid Credentials', 'error', 3000)
              this.password = ''
              return
            }
            this.popup('Logged in successfully', 'success', 2000)
            this.getUser().then(_ => {
              console.log(this.$store.getters['auth/isAdmin'])
              this.$router.push({name: 'invite'})
            })
          })
          .catch(error => {
            this.popup(error.response.data.message, 'error', 3000)
            this.password = ''
          })
      }
    },
  }
</script>

<style scoped>

</style>
