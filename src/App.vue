<template>
  <div id="app">
    <div id="container">
      <header id="header" class="w-full">
        <nav class="flex items-center justify-between flex-wrap p-8">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <img src="./assets/images/logo.png" alt>
          </div>
          <div class="block lg:hidden">
            <button
              class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
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
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="lg:flex-grow text-right font-bold mr-4">
              <router-link v-if="loggedIn"
                to="/patients"
                class="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
              >Patients</router-link>

              <router-link v-if="loggedIn"
                :to="{ name: 'invite'}"
                class="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
              >Send Invite</router-link>
              <router-link v-if="loggedIn"
                :to="{ name: 'settings'}"
                class="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
              >Settings</router-link>
              <router-link
                v-if="loggedIn"
                :to="{ name: 'logout'}"
                class="block mt-4 lg:inline-block lg:mt-0 text-blue-600 hover:text-teal-500 mr-4"
              >Logout</router-link>
            </div>
          </div>
        </nav>
      </header>
      <div id="main" class="content-center flex flex-wrap mx-auto">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import "./assets/css/main.css";
export default {
  name: "app",
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  data() {
    return {
      language: "English",
      date: "",
      time: "",
      patient_phone: "",
      bokn: "",
      ta: "Digital Tolk",
      message: ""
    };
  },
  methods: {
    sendInvite() {
      console.log("sending invite");
    }
  }
};
</script>

