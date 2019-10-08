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
        cachedDateTime: {
          date1: null,
          time1: null,
          date2: null,
          time2: null,
          date3: null,
          time3: null,
        },
        date1: null,
        time1: null,
        date2: null,
        time2: null,
        date3: null,
        time3: null,
      }
    },
    created() {
      this.cachedDateTime.date1 = this.date1 = new Date().getFullYear() + "-" +
        ('0' + (new Date().getMonth() + 1)).slice(-2)
        + '-' +
        ('0' +
          new Date().getDate()).slice(-2),
        this.cachedDateTime.time1 = this.time1 = ("0" + new Date().getHours()).slice(-2) + ':' + ("0" +
          new Date().getMinutes()).slice(-2) +
          ':00',
        this.cachedDateTime.date2 = this.date2 = new Date().getFullYear() + "-" +
          ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
            new Date().getDate()).slice(-2),
        this.cachedDateTime.time2 = this.time2 = ("0" + new Date().getHours()).slice(-2) + ':' + ("0" +
          new Date().getMinutes()).slice(-2) +
          ':00',
        this.cachedDateTime.date3 = this.date3 = new Date().getFullYear() + "-" +
          ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
            new Date().getDate()).slice(-2),
        this.cachedDateTime.time3 = this.time3 = ("0" + new Date().getHours()).slice(-2) + ':' + ("0" +
          new Date().getMinutes()).slice(-2) +
          ':00',
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
        //this.show = true
        if ((this.date1 == this.cachedDateTime.date1 && this.time1 == this.cachedDateTime.time1) ||
          (this.date2 == this.cachedDateTime.date2 && this.time2 == this.cachedDateTime.time3) ||
          (this.date3 == this.cachedDateTime.date3 && this.time3 == this.cachedDateTime.time3)) {
          this.popup('Please fill in all of the suggested dates and times.', 'error', 3000)
          return
        }
        this.suggestTime({
          id: this.$route.params.id,
          cancelled_by: 'client',
          date1: this.date1,
          time1: this.time1,
          date2: this.date2,
          time2: this.time2,
          date3: this.date3,
          time3: this.time3,
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