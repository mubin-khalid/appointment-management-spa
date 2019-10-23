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
          <datetime v-model="date1" 
                    type="datetime" 
                    class="theme-dt p-2"
                    value-zone="local"
                    :placeholder="suggestionPlaceholder + ' 1'"
                    format="yyyy-MM-dd HH:mm"
                    input-class="w-2/3 rounded text-gray-700 bg-gray-200 p-2"
                    :min-datetime="cachedDateTime.date1"
                    :phrases="{ok: continuePhrase, cancel: exitPhrase}"
          ></datetime>
        </div>
        <div class="mb-3">
          <datetime v-model="date2"
                    type="datetime"
                    class="theme-dt p-2"
                    value-zone="local"
                    :placeholder="suggestionPlaceholder + ' 2'"
                    format="yyyy-MM-dd HH:mm"
                    input-class="w-2/3 rounded text-gray-700 bg-gray-200 p-2"
                    :min-datetime="cachedDateTime.date1"
                    :phrases="{ok: continuePhrase, cancel: exitPhrase}"
          ></datetime>
        </div>
        <div class="mb-3">
          <datetime v-model="date3"
                    type="datetime"
                    class="theme-dt p-2"
                    value-zone="local"
                    :placeholder="suggestionPlaceholder + ' 3'"
                    format="yyyy-MM-dd HH:mm"
                    input-class="w-2/3 rounded text-gray-700 bg-gray-200 p-2"
                    :min-datetime="cachedDateTime.date1"
                    :phrases="{ok: continuePhrase, cancel: exitPhrase}"
          ></datetime>
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

  import {Datetime} from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'

  export default {
    name: "Suggestions",
    mixins: [Popup],
    components: {
      VueElementLoading,
      Datetime,
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
        suggestionPlaceholder: '',
        time1Class: '',
        time2Class: '',
        time3Class: '',
        timeRegex: /\d{2}:\d{2}/i,
        suggestions: false,
        showSuggestions: false,
        continuePhrase: '',
        exitPhrase: '',
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
          this.cachedDateTime.date3 = `${year}-${month}-${day}T00:00:00.000Z`
      this.get({
        id: this.$route.params.id
      }).then(response => {
        this.suggestions = response.data.suggestions
        this.cancelNote = response.data.verbiage.appointment_cancel_note
        this.suggestButtonText = response.data.verbiage.send
        this.afterCancelNote = response.data.verbiage.aftercancelheading
        this.suggestionPlaceholder = response.data.verbiage.suggestions_placeholder
        this.continuePhrase = response.data.verbiage.continue
        this.exitPhrase = response.data.verbiage.exit
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

        if (this.error) {
          this.popup('Please input valid time. Format(24 hours): HH:MM', 'error', 3000)
          return
        }
        this.show = true
        let date1 = this.date1.split('T')
        let time1 = this.timeRegex.exec(date1[1])[0]
        date1 = date1[0]
        let date2 = null
        let time2 = null        
        let date3 = null
        let time3 = null
        if(this.date2 != '') {
          date2 = this.date2.split('T')
          time2 = this.timeRegex.exec(date2[1])[0]
          date2 = date2[0]
        }
        if(this.date3 != '') {
          date3 = this.date3.split('T')
          time3 = this.timeRegex.exec(date3[1])[0]
          date3 = date3[0]
        }
        this.suggestTime({
          id: this.$route.params.id,
          cancelled_by: 'client',
          date1: date1,
          time1: time1,
          date2: date2,
          time2: time2,
          date3: date3,
          time3: time3,
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