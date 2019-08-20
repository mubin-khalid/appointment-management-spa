<template>
  <div id="appointment" class="m-auto mt-8 rounded w-full text-center">
    <div class="bg-white m-auto max-w-sm overflow-hidden rounded shadow-lg">
      
      <div class="px-6 py-4">
        <button
          class="inline-block rounded bg-teal-500 p-2 text-white appearance-none hover:bg-teal-600 cursor-pointer mr-2"
          @click="viewDetail"
        >
          {{ detailsButton }}
        </button>
        <button
          class="inline-block inline-block rounded bg-red-600 appearance-none p-2 text-white hover:bg-red-700 cursor-pointer"
          @click="cancelAppointment" :class='disable'
        >
          Cancel Appointment
        </button>
      </div>
    </div>
    <transition name="fade">
      <div class="bg-white m-auto max-w-sm overflow-hidden rounded shadow-lg mt-8 p-2" v-html="details"
           v-if="showDetails"></div>
    </transition>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions} from 'vuex'

  export default {
    name: "Appointment",
    mixins: [Popup],
    data() {
      return {
        showDetails: false,
        details: '',
        detailsButton: 'View Details',
        disable: ''
      }
    },
    created() {
      this.get({
        id: this.$route.params.id
      }).then(response => {
        console.log(response.status)
        this.details = response.data.template
        if (typeof response.status !== 'undefined' && response.status == 'fail') {
          this.disable = 'hidden'
        }
      }).catch(error => {
        console.log(error)
        this.details = error.response.data.template
        this.popup(error.response.data.template, 'error', 3000)
        this.$router.push({name: 'NotFound'})
      })
    },
    methods: {
      ...mapActions('appointment', [
        'get',
        'cancel'
      ]),
      viewDetail() {
        this.showDetails = !this.showDetails
        if (!this.showDetails) {
          this.detailsButton = 'View Details'
        } else {
          this.detailsButton = 'Hide Details'
        }
      },
      cancelAppointment() {
        console.log('cancel')
        this.cancel({
          id: this.$route.params.id,
          cancelled_by: 'client'
        }).then(() => {
          this.popup('Appointment Cancelled', 'success', 5000)
          this.disable = 'hidden'
          this.details = 'Appointment Cancelled.'
        }).catch(error => {
          this.popup(error.response.data.message, 'error', 3000)
        })
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  header {
    display: none !important;
  }

  header::before {
    display: none !important;
  }
</style>