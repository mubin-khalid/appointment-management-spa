<template>
  <main class="flex mt-8">
    <side-bar></side-bar>
    <div class="bg-white lg:-ml-0 lg:flex-1 lg:mt-0 mr-1 rounded sm:-ml-1 sm:m-auto sm:w-full">
      <appointments v-if="showAppointmentsComponent"></appointments>

      <translation-agencies v-if="showTaComponent"></translation-agencies>
      <notifications v-if="showNotificationsComponent"></notifications>
      <password v-if="showPasswordComponent"></password>
      <manage-users v-if="showUserComponent"></manage-users>
      <lt v-if="showLanguageComponent"></lt>
    </div>
  </main>


</template>

<script>
  import SidebarComponent from './SidebarComponent'
  import AppointmentManager from './AppointmentManager'
  import TranslationAgencies from './TranslationAgencies'
  import Notifications from './NotificationManager'
  import Password from './Password'
  import ManageUsers from './ManageUsers'
  import LT from './LT'
  import {mapGetters} from  'vuex'

  export default {
    name: "Settings",
    components: {
      'side-bar': SidebarComponent,
      'appointments': AppointmentManager,
      TranslationAgencies,
      Notifications,
      Password,
      ManageUsers,
      'lt': LT
    },
    data() {
      return {
        showAppointmentsComponent: true,
        showTaComponent: false,
        showNotificationsComponent: false,
        showPasswordComponent: false,
        showUserComponent: false,
        showLanguageComponent: false,
      }
    },
    computer: {
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
    },
    created() {
      eventBus.$on('loadAppointments', () => {
        this.showAppointmentsComponent = true
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
        this.showUserComponent = false
        this.showLanguageComponent = false
      })
      eventBus.$on('loadAgencies', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = true
        this.showNotificationsComponent = false
        this.showPasswordComponent = false
        this.showUserComponent = false
        this.showLanguageComponent = false
      })
      eventBus.$on('loadNotifications', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = true
        this.showPasswordComponent = false
        this.showUserComponent = false
        this.showLanguageComponent = false
      })
      eventBus.$on('changePassword', () => {
        this.showAppointmentsComponent = false
        this.showTaComponent = false
        this.showNotificationsComponent = false
        this.showPasswordComponent = true
        this.showUserComponent = false
        this.showLanguageComponent = false
      }),
        eventBus.$on('manageUsers', () => {
          this.showAppointmentsComponent = false
          this.showTaComponent = false
          this.showNotificationsComponent = false
          this.showPasswordComponent = false
          this.showUserComponent = true
          this.showLanguageComponent = false
        }),
        eventBus.$on('manageLanguages', () => {
          this.showAppointmentsComponent = false
          this.showTaComponent = false
          this.showNotificationsComponent = false
          this.showPasswordComponent = false
          this.showUserComponent = false
          this.showLanguageComponent = true
        })
    },

    methods: {}
  }
</script>

<style scoped>

</style>
