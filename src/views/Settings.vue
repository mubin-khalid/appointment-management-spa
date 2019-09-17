<template>
  <main class="flex mt-8">
    <side-bar></side-bar>
    <div class="lg:flex-1 bg-white rounded mr-1 sm:w-full sm:-ml-1 lg:-ml-0 m-auto">
      <appointments v-if="showAppointmentsComponent"></appointments>
      <notification v-if="showNotificationsComponent"></notification>
      <password v-if="showPasswordComponent"></password>
    </div>
  </main>


</template>

<script>
  import SidebarComponent from '../components/SidebarComponent'
  import AppointmentManager from './AppointmentManager'
  import Notification from './Notification'
  import Password from './Password'

  export default {
    name: "Settings",
    components: {
      'side-bar': SidebarComponent,
      'appointments': AppointmentManager,
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
