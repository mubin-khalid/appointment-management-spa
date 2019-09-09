<template>
  <div id="appointment" class="m-auto mt-8 rounded w-full text-center">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <transition name="fade" v-if="suggested">
      <div class="bg-white m-auto max-w-md overflow-hidden rounded shadow-lg p-2">
        <span class="text-gray-700 font-medium">
          Appointment cancelled. Suggestions have been sent to authority.
        </span>
      </div>
    </transition>
    <transition name="fade" v-if="suggestions && !suggested">
      <div class="bg-white m-auto max-w-2xl overflow-hidden rounded shadow-lg p-2"
      >
        <div class="text-sm text-gray-700 mb-4">{{ cancelNote }}
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2" v-model="date1">
          <input type="text" class="bg-gray-400 rounded ml-2 p-2 h-10" v-model="time1">
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2" v-model="date2">
          <input type="text" class="bg-gray-400 rounded ml-2 p-2 h-10" v-model="time2">
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2" v-model="date3">
          <input type="text" class="bg-gray-400 rounded ml-2 p-2 h-10" v-model="time3">
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2" v-model="date4">
          <input type="text" class="bg-gray-400 rounded ml-2 p-2 h-10" v-model="time4">
        </div>
        <button
          class="outline-none focus:outline-none bg-teal-500 hover:bg-teal-600 text-white font-bold p-2 rounded"
          @click="suggestNewTimings"
        >{{ suggestButtonText }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
  import Popup from '@/mixins/Popup'
  import {mapActions} from 'vuex'
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: "Suggestions",
    mixins: [Popup],
    components: {
      VueElementLoading,
    },
    data() {
      return {
        cancelNote: 'Note: Appointment will be cancelled automatically after suggestions.',
        suggestButtonText: 'Suggest',
        suggested: false,
        show: false,
        suggestions: false,
        showSuggestions: false,
        date1: new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2),
        time1: ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
          ':00',
        date2: new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2),
        time2: ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
          ':00',
        date3: new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2),
        time3: ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
          ':00',
        date4: new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2),
        time4: ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
          ':00',
      }
    },
    created() {
      this.get({
        id: this.$route.params.id
      }).then(response => {
        this.suggestions = response.data.suggestions
        this.cancelNote = response.data.verbiage.appointment_cancel_note
        this.suggestButtonText = response.data.verbiage.suggest
        if (!this.suggestions) {
          this.$router.push({name: 'NotFound'})
        }
        if (typeof response.status !== 'undefined' && response.status == 'fail') {
          this.suggested = true
        } else {
          this.suggested = false
        }
      }).catch(() => {
        this.$router.push({name: 'NotFound'})
      })
    },
    methods: {
      ...mapActions('appointment', [
        'get',
        'suggestTime'
      ]),

      suggestNewTimings() {
        this.show = true
        this.suggestTime({
          id: this.$route.params.id,
          cancelled_by: 'client',
          date1: this.date1,
          time1: this.time1,
          date2: this.date2,
          time2: this.time2,
          date3: this.date3,
          time3: this.time3,
          date4: this.date4,
          time4: this.time4
        }).then(() => {
          this.show = false
          this.suggested = true
          this.showSuggestions = false
          this.popup('Suggested new timings.', 'success', 5000)
        }).catch(() => {
          this.show = false
          this.popup('Unable to suggest new timings.', 'error', 3000)
        })
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