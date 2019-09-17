<template>
  <div id="container">
    <header id="header" class="w-full">
      <nav class="flex items-center justify-between flex-wrap p-8">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <img src="../assets/images/logo.png" alt>
        </div>
        <div class="block lg:hidden">
          <button id="sidebar-open"
                  class="flex items-center text-teal-600 hover:text-teal-700  outline-none focus:outline-none"
                  :class="hidden ? 'hidden': ''"
                  @click="toggle"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          <button type="button" id="sidebar-close"
                  class="flex items-center text-teal-600 hover:text-teal-700  outline-none focus:outline-none"
                  :class="!hidden ? 'hidden': ''"
                  @click="toggle"
          >
            <svg class="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
            </svg>
          </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="lg:flex-grow text-right font-bold mr-4">
            <router-link v-if="loggedIn && !isAdmin"
                         to="/clients"
                         class="block mt-4 inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
            >Clients
            </router-link>

            <router-link v-if="loggedIn && !isAdmin"
                         :to="{ name: 'invite'}"
                         class="block mt-4 inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
            >Send Invite
            </router-link>
            <router-link v-if="loggedIn && !isAdmin"
                         :to="{ name: 'settings'}"
                         class="block mt-4 inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
            >Dashboard
            </router-link>
          </div>
        </div>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "Default",
    data() {
      return {
        hidden: false,
      }
    },
    created() {
      eventBus.$on('resetMenuButton', () => {
        this.hidden = !this.hidden
      })
    },
    computed: {
      ...mapGetters({
        loggedIn: 'auth/loggedIn',
        isAdmin: 'auth/isAdmin',
      }),
    },
    methods: {
      toggle(){
        this.hidden = !this.hidden
        eventBus.$emit('showNav', {hidden: !this.hidden})
      }
    }
  };
</script>

