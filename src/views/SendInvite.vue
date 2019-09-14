<template>
  <div class="bg-white m-auto p-6 rounded shadow-2xl w-1/3">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
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
                 for="client_phone">
            Client phone number
          </label>
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2"
            id="client_phone" v-model="client"
          >
            <option value="0">Select Client</option>
            <option v-for="client in clients" :key="client.id" :id="client.id" :value="client.id">
              {{ client.name }} ({{ client.phone }})
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
            <!--            <option value="0">Select Agency</option>-->
            <option v-for="agency in user.translation_agencies" :key="agency.id" :value="agency.id">
              {{ agency.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3  md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                 for="message">
            Message
          </label>
          <textarea name="message" id="message" cols="50" rows="4" maxlength="150" v-model="message"
                    class="appearance-none block w-full bg-gray-200 focus:bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"></textarea>
        </div>

      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3 mb-6 md:mb-0">
          <button
            class="w-full appearance-none block w-full bg-blue-500 text-white border rounded hover:border-blue-900 py-3 px-4 mb-3 leading-tight focus:outline-none"
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
  import VueElementLoading from 'vue-element-loading'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "send-invite",
    mixins: [Popup],
    components: {
      'language': LanguageComponent,
      VueElementLoading,
    },
    computed: {
      ...mapGetters({
        clients: 'client/clients',
        user: 'auth/user',
        isAdmin: 'auth/isAdmin'
      }),
    },
    created() {
      if(this.isAdmin) {
        this.$router.push({name: 'admin'})
      }
      this.retrieveClients({
        page: 0,
        all: true
      }),

        eventBus.$on('languageChanged', (payload) => {
          this.language = payload.languageId
          this.getTemplate({
            language: payload.languageId,
            appointment_date: this.date,
            appointment_time: this.time,
            template_type: 'register'
          }).then((template) => {
            this.message = template
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
        client: '0',
        department: '0',
        bokn: '',
        ta: 1,
        message: '',
        show: false
      }
    },
    methods: {
      ...mapActions('client', [
        'retrieveClients'
      ]),

      ...mapActions('appointment', [
        'save'
      ]),
      ...mapActions('language', [
        'getTemplate'
      ]),
      
      loadTemplate() {
        this.show = true
        this.getTemplate({
          language: this.language,
          appointment_date: this.date,
          appointment_time: this.time,
          template_type: 'register'
        }).then((template) => {
          this.message = template
          this.show = false
        })
      },
      saveAppointment() {
        if (this.client == 0) {
          this.popup('Please select Patient', 'error', 2000)
          return
        }
        if (this.language == 0) {
          this.popup('Please select Language', 'error', 2000)
          return
        }
        if (this.bokn == 0) {
          this.popup('Please enter BOKN.', 'error', 2000)
          return
        }
        this.show = true
        this.save({
          client_id: this.client,
          // department_id: this.department,
          bokn: this.bokn,
          language: this.language,
          reminder_sent: false,
          is_cancelled: false,
          appointment_date: this.date,
          appointment_time: this.time,
          ta: this.ta,
          message: this.message
        }).then(() => {
          this.popup('Appointment booked', 'success', 2000)
          this.show = false
          this.language = '0'
          this.date = new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
            new Date().getDate()).slice(-2)
          this.time = ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
            ':00'
          this.client = '0'
          this.department = '0'
          this.bokn = ''
          this.ta = 1
          this.message = ''
        })
      }
    },
  }
</script>

<style scoped>

</style>
