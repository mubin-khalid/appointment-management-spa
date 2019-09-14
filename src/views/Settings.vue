<template>
  <main class="w-full mt-10">
    <side-bar></side-bar>
    <div class="float-right mr-10 w-3/4 -mt-48 relative bg-white rounded">
      <appointments v-if="showAppointmentsComponent"></appointments>

      <translation-agencies v-if="showTaComponent"></translation-agencies>
      <notification v-if="showNotificationsComponent"></notification>
      <password v-if="showPasswordComponent"></password>
    </div>
  </main>


</template>

<script>
  import SidebarComponent from '../components/SidebarComponent'
  import AppointmentManager from './AppointmentManager'
  import TranslationAgencies from './TranslationAgencies'
  import Notification from './Notification'
  import Password from './Password'

  export default {
    name: "Settings",
    components: {
      'side-bar': SidebarComponent,
      'appointments': AppointmentManager,
      TranslationAgencies,
      Notification,
      Password
    },
    data() {
      return {
        showAppointmentsComponent: true,
        showTaComponent: false,
        showNotificationsComponent: false,
        showPasswordComponent: false
      }
    },
    created() {
      eventBus.$on('loadAppointments', () => {
        this.showAppointmentsComponent = true
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
      })
      eventBus.$on('loadAgencies', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = true
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
      })
      eventBus.$on('loadNotifications', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = true
        this.showPasswordComponent = false
      })
      eventBus.$on('changePassword', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = true
      })
    },

    methods: {}
  }
</script>

<style scoped>

</style>
