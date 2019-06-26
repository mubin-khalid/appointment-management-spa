<template>
  <div class="w-11/12 max-w-screen-xl mx-auto px-6 relative float-left py-2">
    <div class="lg:flex -mx-6">


      <div id="sidebar"
           class="hidden fixed inset-0 pt-16 h-full bg-white z-90 w-full border-b -mb-16 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5 rounded shadow-2xl">

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
                <span class="ml-3 hover:text-gray-900 font-medium text-gray-600 cursor-pointer hover:font-bold hover:text-teal-600" @click="loadAppointments">Appointments</span>
              </span>
              <span
                class="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path class="text-gray-400 fill-current"
                        d="M9 22c.19-.14.37-.3.54-.46L17.07 14H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H9zM4 2h4a2 2 0 0 1 2 2v14a4 4 0 1 1-8 0V4c0-1.1.9-2 2-2zm2 17.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                  <path class="text-gray-700 fill-current"
                        d="M11 18.66V7.34l2.07-2.07a2 2 0 0 1 2.83 0l2.83 2.83a2 2 0 0 1 0 2.83L11 18.66z"/>
                </svg>
                <span class="ml-3 hover:text-gray-900 font-medium text-gray-600 cursor-pointer hover:font-bold hover:text-teal-600"  @click="loadAgencies">Translation 
                  Agencies</span>
              </span>
              <span
                class="mt-3 lg:mt-1 flex items-center px-2 -mx-2 py-1">
                <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path class="text-gray-400 fill-current"
                        d="M20.3 12.04l1.01 3a1 1 0 0 1-1.26 1.27l-3.01-1a7 7 0 1 1 3.27-3.27zM11 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  <path class="text-gray-700 fill-current"
                        d="M15.88 17.8a7 7 0 0 1-8.92 2.5l-3 1.01a1 1 0 0 1-1.27-1.26l1-3.01A6.97 6.97 0 0 1 5 9.1a9 9 0 0 0 10.88 8.7z"/>
                </svg>
                <span class="ml-3 hover:text-gray-900 font-medium text-gray-600 cursor-pointer hover:font-bold hover:text-teal-600" @click="loadNotifications">Notifications</span>
              </span>
            </div>
            <div class="mb-8">
              <h5 
                class="mb-3 lg:mb-2 text-gray-500 uppercase tracking-wide font-bold text-sm lg:text-xs">Other
                Settings</h5>
              <ul>
                <li class="mb-3 lg:mb-1">
                  <span
                    class="px-2 -mx-2 py-1 transition-fast relative block hover:translate-r-2px">
                    <span class="rounded absolute inset-0 bg-teal-200 opacity-0"></span>
                    <span 
                      class="relative hover:text-gray-900 text-gray-600 font-medium cursor-pointer hover:font-bold hover:text-teal-600" @click="changePassword">Change Password</span>
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SidebarComponent",
    data() {
      return {
        active: 'text-teal-600 font-bold',
      }
    },
    created() {
    },
    methods: {
      loadAppointments() {
        eventBus.$emit('loadAppointments')
      },
      loadAgencies() {
        eventBus.$emit('loadAgencies')
      },
      loadNotifications() {
        eventBus.$emit('loadNotifications')
      },
      changePassword() {
        eventBus.$emit('changePassword')
      }
    }
  }
</script>

<style scoped>

</style>