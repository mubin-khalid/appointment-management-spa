<template>
  <div class="p-6">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions, mapGetters} from 'vuex'
  import VueElementLoading from 'vue-element-loading'
  import ModalComponent from '@/components/ModalComponent'
  
  export default {
    name: "DTLogin",
    mixins: [Popup],
    components: {
      VueElementLoading,
     
    },
    data() {
      return {
        show: true,
      }
    },
    computed: {
      ...mapGetters('auth', [
        'isAdmin'
      ]),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
      loggedIn() {
        return false
      }
    },
    created() {
      this.DTLogin({
        id: this.$route.params.id
      }).then(() => {
        this.popup('Logged in successfully', 'success', 2000)
        this.getUser().then(() => {
          if (this.isAdmin) {
            this.$router.push({name: 'admin'})
          } else {
            this.$router.push({name: 'invite'})
          }

        })
      })
    },
    methods: {
      ...mapActions('auth', ['DTLogin', 'getUser',]),
      
      loginWithDT() {
        window.location.href = process.env.VUE_APP_API_DOMAIN + '/' + 'dt-auth'
      }
    },
  }
</script>

<style scoped>

</style>
