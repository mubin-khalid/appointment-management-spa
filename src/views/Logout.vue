<template>

</template>

<script>
  export default {
    name: "Logout",
    created() {
      this.$store.dispatch('destroyToken')
        .then(() => {
          this.$router.push({name: 'login'})
        }).catch(() => {
        this.$router.push({name: 'login'})
      })
    }
  }
</script>

<style scoped>

</style>
