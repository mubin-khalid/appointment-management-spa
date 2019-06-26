<template>
  <main class="w-full mt-10">
    <side-bar></side-bar>
    <div class="float-right mr-10 w-3/4 -mt-48 relative">
      <appointments v-if="showAppointmentsComponent"></appointments>

      <translation-agencies v-if="showTaComponent"></translation-agencies>
      <notifications v-if="showNotificationsComponent"></notifications>
      <password v-if="showPasswordComponent"></password>
      <manage-users v-if="showUserComponent"></manage-users>
    </div>
  </main>


</template>

<script>
  import SidebarComponent from './SidebarComponent'
  import Appointments from './Appointments'
  import TranslationAgencies from './TranslationAgencies'
  import Notifications from './Notifications'
  import Password from './Password'
  import ManageUsers from './ManageUsers'

  export default {
    name: "Settings",
    components: {
      'side-bar': SidebarComponent,
      'appointments': Appointments,
      TranslationAgencies,
      Notifications,
      Password,
      ManageUsers
    },
    data(){
      return {
        showAppointmentsComponent: true,
        showTaComponent: false,
        showNotificationsComponent: false,
        showPasswordComponent: false,
        showUserComponent: false
      }
    },
    created(){
      eventBus.$on('loadAppointments', () => {
        this.showAppointmentsComponent = true
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
        this.showUserComponent = false
      })
      eventBus.$on('loadAgencies', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = true
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
        this.showUserComponent = false
      })
      eventBus.$on('loadNotifications', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = true
        this.showPasswordComponent = false
        this.showUserComponent = false
      })
      eventBus.$on('changePassword', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = true
        this.showUserComponent = false
      }),
        eventBus.$on('manageUsers', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
        this.showUserComponent = true
      })
    },

    methods: {
    }
  }
</script>

<style scoped>

</style>
