<template>
  <div id="container">
    <header id="header" class="w-full">
      <div class="bg-gray-200 rounded cursor-pointer float-right mr-2 mt-2 text-center w-8"
      >
        <div @click="showLocaleDropDown"
             @focusin="focus(true)"
             @focusout="focus(false)"
        ><i class="fa fa-flag text-blue-600 hover:text-teal-500"></i></div>
        
        <transition :class="close" name="fade">
          <div>
            <div :class="[close, locale == 'en'? 'cursor-not-allowed text-teal-500' : 
        'hover:text-teal-500 text-gray-700 cursor-pointer']"
                 class="font-bold"
                 @click="loadVerbiage('en')">EN
            </div>
            <div :class="[close, locale == 'se'? 'cursor-not-allowed text-teal-500' : 
        'hover:text-teal-500 text-gray-700 cursor-pointer']" class="font-bold"
                 @click="loadVerbiage('se')"
            >SE</div>
          </div>
        </transition>
        
      </div>

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
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import {mapGetters, mapActions} from "vuex";
  export default {
    name: "Default",
    components: {
    },
    data() {
      return {
        hidden: false,
        close: 'hidden'
      }
    },
    created() {
      eventBus.$on('resetMenuButton', () => {
        this.hidden = !this.hidden
      })
      this.verbiage({
        languageCode: this.locale || 'en'
      })
    },
    computed: {
      
      ...mapGetters({
        loggedIn: 'auth/loggedIn',
        isAdmin: 'auth/isAdmin',
        locale: 'verbiage/getLocale'
      }),
    },
    methods: {
      ...mapActions({
        verbiage: 'verbiage/loadVerbiage',
      }),
      toggle(){
        this.hidden = !this.hidden
        eventBus.$emit('showNav', {hidden: !this.hidden})
      },
      showLocaleDropDown() {
        this.close = this.close  == 'hidden' ? '' : 'hidden' 
      },
      focus(value) {
        if(value) {
          this.close  = 'hidden'
        } else{
          this.close  = ''
        }
      },
      loadVerbiage(languageCode) {
        this.close  = 'hidden'
        this.verbiage({
          languageCode: languageCode
        })
      }
    }
  };
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

