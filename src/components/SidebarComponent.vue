<template>
  <aside class="sm:w-0 lg:w-1/6 mr-2">

    <div id="sidebar"
         class="bg-white sm:mt-20 lg:mt-0 border-b fixed h-auto inset-0 lg:-mb-0 lg:block lg:border-0 lg:border-b-0 lg:h-auto lg:overflow-y-visible lg:pt-0 lg:static rounded shadow-2xl z-10"
         :class="hiddenClass"
    >

      <div id="navWrapper"
           class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:relative lg:sticky lg:top-16 bg-white lg:bg-transparent">
        <nav id="nav"
             class="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:pl-6 lg:pr-8 sticky?lg:h-(screen-16)">

          <div class="mb-10">
              <span
                class="flex items-center px-2 -mx-2 py-1">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path class="text-gray-400 fill-current"
                        d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"/>
                  <path class="text-gray-700 fill-current"
                        d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"/>
                </svg>
                <span
                  class="ml-3 hover:text-gray-900 font-medium text-gray-600 cursor-pointer hover:font-bold hover:text-teal-600"
                  :class="{active: element == 'appointment'}"
                  @click="loadAppointments">Appointments</span>
              </span>
            <span
              class="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path class="text-gray-400 fill-current"
                        d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  <path class="text-gray-700 fill-current"
                        d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"/>
                </svg>
                <span
                  :class="{active: element == 'notifications'}"
                  @click="loadNotifications"
                  class="ml-3 hover:text-gray-900 font-medium text-gray-600 cursor-pointer hover:font-bold hover:text-teal-600">
                  Notifications
                </span>
              </span>
          </div>
          <div class="mb-8">
            <h5
              class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">Other
              Settings</h5>
            <ul class="mb-4">
              <li class="mb-3 lg:mb-1">
                  <span
                    class="px-2 -mx-2 py-1 transition-fast relative block hover:translate-r-2px">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span
                      class="relative hover:text-gray-900 text-gray-600 font-medium cursor-pointer hover:font-bold hover:text-teal-600"
                      :class="{active: element == 'password'}"
                      @click="changePassword">
                      <i class="fa fa-key mr-1"></i>
                      Change Password
                    </span>
                  </span>
              </li>
            </ul>
            <hr>
            <div class="mt-4">
              <router-link :to="{name: 'logout'}"
                           class="text-red-700 text-sm w-1 align-middle font-bold">
                <i class="fa fa-sign-out-alt mr-1"></i>
                Logout
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script>
  export default {
    name: "SidebarComponent",
    data() {
      return {
        element: 'appointment',
        active: 'text-teal-600 font-bold',
        hiddenClass: 'hidden'
      }
    },
    created() {
      eventBus.$on('showNav', (payload) => {
        if(payload.hidden) {
          this.hiddenClass = 'hidden'
        }else{
          this.hiddenClass = 'block'
        }
      })
    },
    methods: {
      loadAppointments() {
        this.element = 'appointment'
        this.hiddenClass = 'hidden'
        eventBus.$emit('loadAppointments')
        eventBus.$emit('resetMenuButton')
      },
      loadNotifications() {
        this.element = 'notifications'
        this.hiddenClass = 'hidden'
        eventBus.$emit('loadNotifications')
        eventBus.$emit('resetMenuButton')
      },
      changePassword() {
        this.element = 'password'
        this.hiddenClass = 'hidden'
        eventBus.$emit('changePassword')
        eventBus.$emit('resetMenuButton')
      }
    }
  }
</script>

<style scoped>
  .active{
    color: #319795 !important;
    font-weight: bold;
    background-color: white;
  }
</style>