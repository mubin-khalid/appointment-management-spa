<template>
  <div class="m-auto bg-white p-6 rounded shadow shadow-2xl shadow-md">
    <form class="w-full max-w-lg" @submit.prevent>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 md:mb-2 mb-2">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="language">
            Language
          </label>
          <language id="language"></language>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
            Date
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="date" type="date" v-model="date" @change="loadTemplate">
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="time">
            Time
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="time" type="text" v-model="time" @change="loadTemplate">
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                 for="patient_phone">
            Client phone number
          </label>
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2"
            id="patient_phone" v-model="patient"
          >
            <option value="0">Select Patient</option>
            <option v-for="patient in patients" :key="patient.id" :id="patient.id" :value="patient.id">
              {{ patient.name }} ({{ patient.phone }})
            </option>
          </select>
        </div>
      </div>
      <!--<div class="flex flex-wrap -mx-3">-->
        <!--<div class="w-full px-3 md:mb-2 mb-2">-->
          <!--<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="department">-->
            <!--Department-->
          <!--</label>-->
          <!--<select-->
            <!--class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2"-->
            <!--id="department" v-model="department"-->
          <!--&gt;-->
            <!--<option value="0">Select Department</option>-->
            <!--<option v-for="department in departments" :key="department.id" :id="department.id" :value="department.id">-->
              <!--{{ department.name }}-->
            <!--</option>-->
          <!--</select>-->
        <!--</div>-->
      <!--</div>-->

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="bokn">
            bokn.
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="bokn" type="text" v-model="bokn">
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="ta">
            translation agency
          </label>
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2"
            id="ta" v-model="ta"
          >
            <option value="0">Select Agency</option>
            <option v-for="agency in translationAgencies" :key="agency.id" :id="agency.id" :value="agency.id">
              {{ agency.name }}
            </option>
          </select>
        </div>
      </div>
      <!--<div class="w-full px-3 mb-2">-->
        <!--<button-->
          <!--class="w-full appearance-none block w-full bg-blue-500 text-white border rounded hover:border-blue-900 py-3 px-4 mb-3 leading-tight"-->
          <!--@click="saveAppointment">Create Appointment-->
        <!--</button>-->
      <!--</div>-->
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3  md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                 for="message">
            Message
          </label>
          <div name="message" id="message" cols="55" rows="10"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"
                    v-html="message"></div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3 mb-6 md:mb-0">
          <button
            class="w-full appearance-none block w-full bg-blue-500 text-white border rounded hover:border-blue-900 py-3 px-4 mb-3 leading-tight"
            @click="saveAppointment">Send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import LanguageComponent from '../components/LanguageComponent'
  import Popup from '@/mixins/Popup'
  export default {
    name: "send-invite",
    mixins: [Popup],
    components: {
      'language': LanguageComponent

    },
    computed: {
      patients() {
        return this.$store.getters.patients;
      },
      departments() {
        return this.$store.getters.getUser.departments
      },
      translationAgencies() {
        return this.$store.getters.getUser.translation_agencies
      }
    },
    created() {
      this.$store.dispatch("retrievePatients");
      eventBus.$on('languageChanged', (payload) => {
        this.language = payload.languageId
        this.$store.dispatch('getTemplate', {
          language: payload.languageId,
          appointment_date: this.date,
          appointment_time: this.time,
        }).then((response) => {
          this.message = response.data.template
        })
      })
    },
    data() {
      return {
        language: '0',
        date: new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
          new Date().getDate()).slice(-2),
        time: ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
          ':00',
        patient: '0',
        department: '0',
        bokn: '',
        ta: '0',
        message: '',
      }
    },
    methods: {
      sendInvite() {
        console.log('sending invite')
      },
      loadTemplate() {
        this.$store.dispatch('getTemplate', {
          language: this.language,
          appointment_date: this.date,
          appointment_time: this.time,
        }).then((response) => {
          this.message = response.data.template
        })
      },
      saveAppointment() {
        if(this.patient == 0) {
          this.popup('Please select Patient', 'error', 2000)
          return
        }
        if(this.language == 0) {
          this.popup('Please select Language', 'error', 2000)
          return
        }
        if(this.bokn == 0) {
          this.popup('Please enter BOKN.', 'error', 2000)
          return
        }
        this.$store.dispatch('saveAppointment', {
          patient_id: this.patient,
          // department_id: this.department,
          bokn: this.bokn,
          language: this.language,
          reminder_sent: false,
          is_cancelled: false,
          appointment_date: this.date,
          appointment_time: this.time,
          ta: this.ta
        }).then( () => {
          this.popup('Appointment booked', 'success', 2000)
        })
      }
    },
  }
</script>

<style scoped>

</style>
