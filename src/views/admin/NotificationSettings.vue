<template>
  <div class="w-full">
    <form class="shadow-2xl rounded px-8 pt-6 pb-8 mb-4 w-10/12 m-auto">
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/12">
          <label class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" for="email-switch">
            Email
          </label>
        </div>
        <div class="md:w-2/3">
          <div class="px-4 py-2 text-gray-700 text-sm w-1 align-middle opacity-50" title="ON">
            <label class="switch" id="email-switch">
              <input type="checkbox" v-model="email" disabled>
              <span class="slider rounded-full disabled"></span>
            </label>
          </div>
        </div>
        
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/12">
          <label class="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4" for="email-switch">
            Webhooks
          </label>
        </div>
        <div class="md:w-2/3">
          <div class="px-4 py-2 text-gray-700 text-sm w-1 align-middle">
            <label class="switch" id="sms-switch">
              <input type="checkbox" v-model="notificationSettings.hooks">
              <span class="slider rounded-full" @click="updateSettings(!notificationSettings.hooks)"></span>
            </label>
          </div>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "NotificationSettings",
    data() {
      return {
        email: true,
        sms: false
      }
    },
    created(){
      this.userSettings()
    },
    computed: {
      ...mapGetters('notifications', {
        notificationSettings:'notificationSettings',
      })
    },
    
    methods: {
      ...mapActions('notifications', {
        userSettings: 'getUserSettings',
        update: 'updateSmsSettings',
      }),
      updateSettings(value) {
        this.update({
          type: 'hooks',
          status: value ? 1 : 0
        })
      }
    },
  }
</script>

<style scoped>
  .switch checkbox:disabled {
    opacity: 50%;
  }

  .slider.rounded-full:disabled {
    border-radius: 50%;
  }

  input:checked + .disabled {
    background-color: gray;
    cursor: not-allowed;
  }
</style>