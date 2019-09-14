<template>
  <div class="w-full">
    <form class="bg-white float-left m-auto mt-6 p-6 rounded w-10/12">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" for="old_password">
            Old Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
            id="old_password" type="password" v-model="oldPassword"
            @keyup="validateInput"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" for="new_password">
            New Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            :class="validationClass"
            id="new_password" type="password"
            v-model="newPassword1"
            @keyup="validateInput"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3">
          <label class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" for="confirm_new_password">
            Repeat Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            class="bg-gray-200 appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            :class="validationClass"
            @keyup="validateInput"
            v-model="newPassword2"
            id="confirm_new_password" type="password"
            placeholder="new password again!"
          >
        </div>
      </div>
      <div class="md:flex md:items-center">
        <div class="md:w-1/3"></div>
        <div class="md:w-2/3">
          <button
            class="shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button" @click="changePassword" :disabled="disabled" :class="disabledClass" >
            Change Password
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: "password",
    mixins: [Popup],
    data() {
      return {
        disabled: true,
        disabledClass: 'opacity-50 cursor-not-allowed',
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
        validationClass: 'border-gray-200 focus:border-blue-600'
      }
    },
    computed: {
      ...mapGetters({
        user: 'auth/user'
      })
    },
    methods: {
      ...mapActions('user', {
        updatePassword: 'updatePassword'
      }),
      changePassword() {
        if (this.oldPassword.trim() === '') {
          this.popup('Old password is required', 'error', 3000)
          return
        }

        if (this.newPassword1 !== this.newPassword2 && this.newPassword1.trim() !== '') {
          this.popup('New password and repeat password should be same and not empty.', 'error', 3000)
          this.newPassword2 = ''
        } else {
          this.validationClass = 'border-green-600 focus:border-green-600'
        }
        this.updatePassword({
          old_password: this.oldPassword,
          new_password: this.newPassword1,
          new_password_confirm: this.newPassword2,
          id: this.user.id
        }).then(() => {
          this.popup('Password Updated successfully', 'success', 3000)
        }).catch(() => {
          this.popup('Unable to update password.', 'error', 3000)
        })
      },
      validateInput() {

        if (this.newPassword1 !== this.newPassword2 || this.newPassword1.trim() === '' || this.newPassword2.trim()
          === '' || this.oldPassword.trim() === '' || this.oldPassword.trim() == this.newPassword1.trim()) {
          this.disabled = true
          this.disabledClass = 'opacity-50 cursor-not-allowed'
          this.validationClass = 'border-red-600 focus:border-red-600'
        } else {
          this.disabled = false
          this.disabledClass = ''
          this.validationClass = 'border-green-600 focus:border-green-600'
        }
      },
    }
  }
</script>

<style scoped>

</style>