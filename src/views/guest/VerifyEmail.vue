<template>
  <div class="w-full mt-10">
    <div class="border-t-8 border-teal-600 m-auto mb-5 rounded shadow-2xl w-2/3">
      <h1 class="font-hairline mb-6 text-center mt-6 text-gray-700">Please set password to your account.</h1>

      <div class="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
        <div class="mb-4">
          <label class="font-bold text-grey-darker block mb-2">Password</label>
          <!--          <input type="password"-->
          <!--                 class="block appearance-none focus:outline-none outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"-->
          <!--                 placeholder="**********" autocomplete="off">-->
          <password :toggle="true" :badge="false" v-model="password" id="password"
                    :defaultClass='"bg-gray-300 border-2 focus:outline-none outline-none p-3 rounded text-sm w-full"'/>

          <span class="font-hairline text-gray-700 text-xs">*Minimum password length: 8</span>
        </div>

        <div class="mb-4">
          <label class="font-bold text-grey-darker block mb-2">Retype Password</label>
          <input type="password" v-model="passwordRepeat" id="repeat-password"
                 class="bg-gray-300 border-2 focus:outline-none outline-none p-3 rounded text-sm w-full"
                 :class="check"
          />
        </div>

        <div class="text-center">
          <button
            class="bg-teal-600 focus:outline-none font-bold hover:bg-teal-700 mt-6 outline-none px-4 py-2 rounded text-white w-1/4"
            :disabled="disable" :class="disableClass" @click="update">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Password from 'vue-password-strength-meter'
  import Popup from '@/mixins/Popup'
  import {mapActions} from 'vuex'

  export default {
    name: "VerifyEmail",
    components: {
      Password
    },
    mixins: [Popup],
    data: () => ({
      password: null,
      passwordRepeat: null,
      check: ' ',
      disable: true,
      disableClass: 'opacity-50 cursor-not-allowed'
    }),
    watch: {
      passwordRepeat(newValue) {
        if (this.password !== newValue) {
          this.check = ' border-red-600'
          this.disable = true
          this.disableClass = 'opacity-50 cursor-not-allowed'
        } else if (newValue.length < 8) {
          this.check = ' '
          this.disable = true
          this.disableClass = 'opacity-50 cursor-not-allowed'
        } else {
          this.check = ' '
          this.disable = false
          this.disableClass = ' '
        }
      },
      password(newValue) {
        if (newValue !== this.passwordRepeat) {
          this.check = ' border-red-600'
          this.disable = true
          this.disableClass = 'opacity-50 cursor-not-allowed'
        } else if (newValue.length < 8) {
          this.check = ' '
          this.disable = true
          this.disableClass = 'opacity-50 cursor-not-allowed'
        } else {
          this.check = ' '
          this.disable = false
          this.disableClass = ' '
        }
      }
    },
    created(){
      this.verifyEmail({
        checksum: this.$route.params.id
      }).then(() => {
        this.popup('Thank you for the verification.', 'success', 3000)
      }).catch(() => {
        this.$router.push({name: 'NotFound'})
      })
    },
    methods: {
      ...mapActions('verify', [
        'verifyEmail',
        'updatePassword'
      ]),
      update() {
        this.updatePassword({
          password: this.password,
          id: this.$route.params.id
        }).then(() => {
          this.$router.push({name: 'login'})
        })
      }
    }
  }
</script>

<style scoped>
  .Password {
    max-width: inherit;
  }

  button {
    outline: 0 !important;
  }

  .btn-clean:focus, button:focus {
    outline: 0 !important;
  }

  svg:focus {
    outline: 0 !important;
  }
</style>