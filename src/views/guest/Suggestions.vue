<template>
  <div id="appointment" class="m-auto mt-8 rounded w-full text-center">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <transition name="fade" v-if="suggested">
      <div class="bg-white m-auto max-w-md rounded shadow-lg p-2">
        <span class="text-gray-700 font-medium">
          {{afterCancelNote}}
        </span>
      </div>
    </transition>
    <transition name="fade" v-if="suggestions && !suggested">
      <div class="bg-white m-auto max-w-2xl rounded shadow-lg p-2"
      >
        <div class="text-sm text-gray-700 mb-4">{{ cancelNote }}
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-1-5 outline-none focus:outline-none cursor-pointer"
                 v-model="date1" :min="cachedDateTime.date1">
          <vue-timepicker type="text" class="md:ml-2" v-model="time1"></vue-timepicker>
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2 outline-none focus:outline-none cursor-pointer"
                 v-model="date2" :min="cachedDateTime.date2">
          <vue-timepicker type="text" class="md:ml-2" v-model="time2"></vue-timepicker>
        </div>
        <div class="mb-3">
          <input type="date" class="bg-gray-400 rounded p-2 outline-none focus:outline-none cursor-pointer"
                 v-model="date3" :min="cachedDateTime.date3">
          <vue-timepicker type="text" class="md:ml-2 sm:mt-2 lg:mt-0" v-model="time3"></vue-timepicker>
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
  import {mapActions, mapGetters} from 'vuex'
  import VueElementLoading from 'vue-element-loading'
  import VueTimePicker from 'vue2-timepicker'
  import 'vue2-timepicker/dist/VueTimepicker.css'

  export default {
    name: "Suggestions",
    mixins: [Popup],
    components: {
      VueElementLoading,
      'vue-timepicker': VueTimePicker
    },
    computed: {},
    data() {
      return {
        cancelNote: 'Note: Appointment will be cancelled automatically after suggestions.',
        suggestButtonText: 'Suggest',
        afterCancelNote: '',
        suggested: false,
        error: false,
        show: false,
        time1Class: '',
        time2Class: '',
        time3Class: '',
        timeRegex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/i,
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
      let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      let day = currentDate.getDate() >= 10 ? currentDate.getDate() : '0' + currentDate.getDate()
      let month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : '0' + currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      this.cachedDateTime.date1 =
        this.cachedDateTime.date2 =
          this.cachedDateTime.date3 = `${year}-${month}-${day}`
      this.get({
        id: this.$route.params.id
      }).then(response => {
        this.suggestions = response.data.suggestions
        this.cancelNote = response.data.verbiage.appointment_cancel_note
        this.suggestButtonText = response.data.verbiage.send
        this.afterCancelNote = response.data.verbiage.aftercancelheading
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
    watch: {
      // time1(newTime) {
      //   if (!this.timeRegex.test(newTime)) {
      //     this.time1Class = 'border border-red-600'
      //     this.error = true
      //   } else {
      //     this.error = false
      //     this.time1Class = 'border-0'
      //   }
      // },
      // time2(newTime) {
      //   if (!this.timeRegex.test(newTime)) {
      //     this.time2Class = 'border border-red-600'
      //     this.error = true
      //   } else {
      //     this.error = false
      //     this.time2Class = 'border-0'
      //   }
      // },
      // time3(newTime) {
      //   if (!this.timeRegex.test(newTime)) {
      //     this.time3Class = 'border border-red-600'
      //     this.error = true
      //   } else {
      //     this.error = false
      //     this.time3Class = 'border-0'
      //   }
      // }
    },
    methods: {
      ...mapActions('appointment', [
        'get',
        'suggestTime'
      ]),

      suggestNewTimings() {

        if (this.date1 == null) {
          this.popup('Please fill in at least first date.', 'error', 3000)
          return
        }
        if (this.time1 == null || this.time1.HH == "" ||
          this.time1.mm == "") {
          this.popup('Select proper time.', 'error', 3000)
          return
        }

        if (this.error) {
          this.popup('Please input valid time. Format(24 hours): HH:MM', 'error', 3000)
          return
        }
        this.show = true
        this.suggestTime({
          id: this.$route.params.id,
          cancelled_by: 'client',
          date1: this.date1,
          time1: (this.time1 != null) ? Object.values(this.time1).join(':') : null,
          date2: this.date2,
          time2: (this.time2 != null) ? Object.values(this.time2).join(':') : null,
          date3: this.date3,
          time3: (this.time3 != null) ? Object.values(this.time3).join(':') : null,
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

  .p-1-5 {
    padding: .35rem;
  }
</style>