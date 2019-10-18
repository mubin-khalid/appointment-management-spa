<template>
  <div id="appointment" class="m-auto mt-8 rounded w-full h-full text-center">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <transition name="fade" v-if="suggested">
      <div class="bg-white m-auto max-w-md rounded shadow-lg p-2">
        <span class="text-gray-700 font-medium">
          Appointment cancelled. Suggestions have been sent to authority.
        </span>
      </div>
    </transition>
    <transition name="fade" v-if="suggestions && !suggested">
      <div class="bg-white m-auto max-w-2xl rounded shadow-lg p-2"
      >
        <div class="text-sm text-gray-700 mb-4">{{ cancelNote }}
        </div>
        <div class="mb-3 w-5/6 m-auto">
          <VueCtkDateTimePicker label="Suggestion 1" id="suggestion-1" :min-date='defaultDateTime'
            v-model="date1" :no-button-now="true" formatted="YYYY-MM-DD HH:mm"
                                :no-label="false"
                                :first-day-of-week="1"
                                format="'YYYY-MM-DD HH:mm'"></VueCtkDateTimePicker>
        </div>
        <div class="mb-3 w-5/6 m-auto">
          <VueCtkDateTimePicker label="Suggestion 2" id="suggestion-2" :min-date='defaultDateTime'
                                v-model="date2" :no-button-now="true" formatted="YYYY-MM-DD HH:mm"
                                :no-label="false"
                                :first-day-of-week="1"
                                format="'YYYY-MM-DD HH:mm'"></VueCtkDateTimePicker>
        </div>
        <div class="mb-3 w-5/6 m-auto">
          <VueCtkDateTimePicker label="Suggestion 3" id="suggestion-3" :min-date='defaultDateTime'
                                v-model="date3" :no-button-now="true" formatted="YYYY-MM-DD HH:mm"
                                :no-label="false"
                                :first-day-of-week="1"
                                format="'YYYY-MM-DD HH:mm'"></VueCtkDateTimePicker>
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
  import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
  import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

  export default {
    name: "Suggestions",
    mixins: [Popup],
    components: {
      VueElementLoading,
      'VueCtkDateTimePicker': VueCtkDateTimePicker
    },
    data() {
      return {
        cancelNote: 'Note: Appointment will be cancelled automatically after suggestions.',
        suggestButtonText: 'Suggest',
        suggested: false,
        error: false,
        show: false,
        timeRegex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/i,
        suggestions: false,
        defaultDateTime: '',
        showSuggestions: false,
        suggestedDateTime: {
          date1: null,
          time1: null,
          date2: null,
          time2: null,
          date3: null,
          time3: null,
        },
        date1: null,
        date2: null,
        date3: null,
      }
    },
    created() {
      let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      let day = currentDate.getDate() >= 10 ? currentDate.getDate() : '0' + currentDate.getDate()
      let month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : '0' + currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      this.defaultDateTime = `${year}-${month}-${day} 00:00:00`
      
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

        if (this.date1 == null) {
          this.popup('Please fill in at least first Suggestion.', 'error', 3000)
          return
        }

        if (this.error) {
          this.popup('Please input valid time. Format(24 hours): HH:MM', 'error', 3000)
          return
        }
        this.show = true
        let suggestion1 = this.date1.slice(1, -1).split(' ')
        this.suggestedDateTime.date1 = suggestion1[0] 
        this.suggestedDateTime.time1 = suggestion1[1] 
        if(this.date2 != null) {
          let suggestion2 = this.date2.slice(1, -1).split(' ')
          this.suggestedDateTime.date2 = suggestion2[0]
          this.suggestedDateTime.time2 = suggestion2[1]
        }
        
        if(this.date3 != null) {
          let suggestion3 = this.date3.slice(1, -1).split(' ')
          this.suggestedDateTime.date3 = suggestion3[0]
          this.suggestedDateTime.time3 = suggestion3[1]
        }
        this.suggestTime({
          id: this.$route.params.id,
          cancelled_by: 'client',
          date1: this.suggestedDateTime.date1,
          time1: this.suggestedDateTime.time1,
          date2: this.suggestedDateTime.date2,
          time2: this.suggestedDateTime.time2,
          date3: this.suggestedDateTime.date3,
          time3: this.suggestedDateTime.time3,
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