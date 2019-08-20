<template>
  <p>Logging Out</p>
</template>

<script>
  import {mapActions} from "vuex";

  export default {
    name: "Logout",
    created() {
      this.logout()
        .then(() => {
          this.setBaseAppState()
          this.$router.push({name: 'login'})
        }).catch(() => {
        this.$router.push({name: 'login'})
      })
    },
    methods: {
      ...mapActions('auth', [
        'logout', 'setBaseAppState'
      ])
    },
  }
</script>

<style scoped>

</style>
