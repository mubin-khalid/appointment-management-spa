<template>
  <div id="appointment" class="m-auto mt-8 rounded w-full text-center">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <div class="bg-white m-auto max-w-2xl overflow-hidden rounded shadow-lg">

      <div class="px-6 py-4">
        <button
          class="appearance-none bg-blue-600 cursor-pointer h-22 hover:bg-blue-700 inline-block mt-10 mb-4 p-2 rounded text-2xl text-white w-10/12 focus:outline-none outline-none"
          @click="viewDetail"
        >
          {{ viewDetailsButton }}
        </button>
        <button
          class="appearance-none bg-blue-600 cursor-pointer h-22 hover:bg-blue-700 inline-block mb-4 p-2 rounded text-2xl text-white w-10/12 focus:outline-none outline-none"
          @click="cancelAppointment" :class='disable'
        >
          {{ cancelButton }}
        </button>

        <!--        ask for suggestions-->
        <button v-if="suggestions"
                class="appearance-none bg-blue-600 cursor-pointer h-22 hover:bg-blue-700 inline-block mb-10 p-2 rounded text-2xl text-white w-10/12 focus:outline-none outline-none"
                @click="suggestNewTimings"
                :class='disable'
        >
          {{ suggestButton }}
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
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: "Appointment",
    mixins: [Popup],
    components: {
      VueElementLoading,
    },
    data() {
      return {
        showDetails: false,
        details: '',
        detailsButton: 'View Details',
        viewDetailsText: 'View Details',
        hideDetailsText: 'Hide Details',
        disable: 'hidden',
        show: false,
        suggestions: false,
        showSuggestions: false,
        appointmentCancelText: 'Appointment Cancelled.',
        cancelButton: 'Cancel Appointment.',
        viewDetailsButton: 'View Details.',
        suggestButton: 'Suggest.',
      }
    },
    created() {
      this.get({
        id: this.$route.params.id
      }).then(response => {
        this.details = response.data.template
        this.viewDetailsButton = response.data.verbiage.view_details
        this.viewDetailsText = response.data.verbiage.view_details
        this.hideDetailsText = response.data.verbiage.hide_details
        this.cancelButton = response.data.verbiage.cancel_appointment
        this.suggestButton = response.data.verbiage.suggest
        this.appointmentCancelText = response.data.verbiage.appointment_cancelled
        this.suggestions = response.data.suggestions
        if (typeof response.status !== 'undefined' && response.status == 'fail') {
          this.disable = 'hidden'
        } else {
          this.disable = ''
        }
      }).catch(() => {
        //this.$router.push({name: 'NotFound'})
      })
    },
    methods: {
      ...mapActions('appointment', [
        'get',
        'cancel',
        'suggestTime'
      ]),
      viewDetail() {
        this.showDetails = !this.showDetails
        if (!this.showDetails) {
          this.viewDetailsButton = this.viewDetailsText
        } else {
          this.viewDetailsButton = this.hideDetailsText
        }
      },
      cancelAppointment() {
        this.show = true
        this.cancel({
          id: this.$route.params.id,
          cancelled_by: 'client'
        }).then(() => {
          this.show = false
          this.popup(this.appointmentCancelText, 'success', 5000)
          this.disable = 'hidden'
          this.details = this.appointmentCancelText
        }).catch(() => {
          this.show = false
        })
      },
      suggestNewTimings() {
        this.$router.push('/appointment/' + this.$route.params.id + '/suggestions')
      },
    },
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

  .h-22 {
    height: 84px;
  }

  .w-brief {
    widht: 480px;
  }
</style>