<template>
  <div class="bg-white lg:w-1/3 m-auto md:text-left md:w-1/2 p-6 rounded shadow-2xl sm:text-center w-full">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <form class="m-auto max-w-lg w-full" @submit.prevent>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full px-3 md:mb-2 mb-2">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="language">
            {{verbiage.languages}}
          </label>
          <language id="language"></language>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="date">
            {{verbiage.date}}
          </label>
          <datetime v-model="date"
                    class="theme-dt"
                    value-zone="local"
                    format="yyyy-MM-dd"
                    input-class="w-full rounded text-gray-700 bg-gray-200 p-3"
                    :min-datetime="minDate"
                    :phrases="{ok: verbiage.continue, cancel: verbiage.exit}"
                    @close="loadTemplate"
          ></datetime>
        <!--  <input-->
        <!--    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 hover:border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"-->
        <!--    id="date" type="date" v-model="date" @change="loadTemplate">-->
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="time">
            {{ verbiage.time }}
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
            {{ verbiage.client }} {{ verbiage.phone }}
          </label>
          <select
            class="appearance-none w-10/12 bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mb-2"
            id="client_phone" v-model="client"
          >
            <option v-for="client in clients" :key="client.id" :id="client.id" :value="client.id">
              {{ client.name }} ({{ client.phone }})
            </option>
          </select>
          <i
            class="ml-2 fa fa-plus text-teal-600 cursor-pointer hover:text-teal-700 appearance-none outline-none focus:outline-none text-lg"
            @click="showAddClient = true"></i>
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-full px-3">
          <label class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cancel_via_text">
            {{verbiage.sms_notification}}
          </label>
          <input
            class="ml-2"
            id="cancel_via_text" type="checkbox" v-model="cancelViaText">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6" v-if="cancelViaText">
        <div class="w-full md:w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cancel_phone">
            {{ verbiage.phone_for_notification }}
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cancel_phone" type="text" v-model="customerPhone">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-full px-3">
          <label class="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cancel_email_notification">
            {{ verbiage.email_notification }}
          </label>
          <input
            class="ml-2"
            id="cancel_email_notification" type="checkbox" v-model="cancelEmail">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-6" v-if="cancelEmail">
        <div class="w-full md:w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="cancel_phone">
            {{ verbiage.email_for_notification}}
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="cancel_email" type="text" v-model="email">
        </div>
      </div>


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
            {{ verbiage.ta }}
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
          <div class="flex justify-between">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                   for="message">
              {{ verbiage.message }} (<span class="font-hairline">{{ verbiage.max }} 150.</span>)
            </label>
            <span class="font-bold right-0 text-sm mr-1" :class="messageLengthClass">{{ messageLength }}</span>
          </div>
          <textarea name="message" id="message" cols="50" rows="4" maxlength="150" v-model="message"
                    class="appearance-none block w-full bg-gray-200 focus:bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 resize-none"></textarea>

        </div>

      </div>
      <div class="flex flex-wrap -mx-3 mb-3">
        <div class="w-full px-3 mb-6 md:mb-0">
          <button
            class="w-full appearance-none block w-full bg-blue-500 text-white border rounded hover:border-blue-900 py-3 px-4 mb-3 leading-tight focus:outline-none"
            @click="saveAppointment">{{ verbiage.send }}
          </button>
        </div>
      </div>
    </form>
    <modal v-if="showAddClient" width="w-1/3" height="h-auto" @dismiss="showAddClient=false" @close="saveClient">
      <div slot="header" class="text-center">
        <span class="text-gray-700 text-sm uppercase text-center">add client</span>
      </div>
      <div slot="body">
        <input type="text"
               class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
               placeholder="Name" v-model="newClient.name">
        <input type="text"
               class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
               placeholder="Email" v-model="newClient.email">
        <input type="text"
               class="appearance-none block w-full bg-gray-200 text-gray-700 hover:border-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
               placeholder="Phone" v-model="newClient.phone">
      </div>
    </modal>
    <confirm v-if="showConfirmNotification" width="w-1/3" height="h-auto" @dismiss="showConfirmNotification=false">
      <div slot="number">
        {{appointmentId}}
      </div>
    </confirm>
  </div>
</template>

<script>
  import LanguageComponent from '../components/LanguageComponent'
  import Popup from '@/mixins/Popup'
  import VueElementLoading from 'vue-element-loading'
  import {mapActions, mapGetters} from 'vuex'
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import ModalComponent from '@/components/ModalComponent'
  import BookingConfirmationComponent from '@/components/BookingConfirmationComponent'
  import {Datetime} from 'vue-datetime'
  import 'vue-datetime/dist/vue-datetime.css'
  import { Settings } from 'luxon'


  export default {
    name: "send-invite",
    mixins: [Popup],
    components: {
      'language': LanguageComponent,
      VueElementLoading,
      'modal': ModalComponent,
      'confirm': BookingConfirmationComponent,
      Datetime,

    },
    created() {
      if (this.isAdmin) {
        this.$router.push({name: 'admin'})
      }
      console.log(this.$parent.locale)
      Settings.defaultLocale = this.$parent.locale
      let currentDate = new Date(new Date().getTime());
      let day = currentDate.getDate() >= 10 ? currentDate.getDate() : '0' + currentDate.getDate()
      let month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : '0' + currentDate.getMonth() + 1
      let year = currentDate.getFullYear()
      this.minDate = `${year}-${month}-${day}T00:00:00.000Z`
      this.retrieveClients({
        page: 0,
        all: true
      }).then(() => {
        if (typeof this.clients[0] !== 'undefined') {
          this.client = this.clients[0].id
        }
      }),

        eventBus.$on('languageChanged', (payload) => {
          this.language = payload.languageId
          this.getTemplate({
            language: payload.languageId,
            appointment_date: this.date.split('T')[0],
            appointment_time: this.time,
            template_type: 'register'
          }).then((template) => {
            this.message = template
          })
        })
    },
    data() {
      return {
        minDate: '',
        showConfirmNotification: false,
        appointmentId: null,
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
        show: false,
        cancelViaText: false,
        customerPhone: '',
        cancelEmail: false,
        email: '',
        showAddClient: false,
        newClient: {
          name: '',
          email: '',
          phone: '',
        }
      }
    },
    computed: {
      ...mapGetters({
        clients: 'client/clients',
        user: 'auth/user',
        isAdmin: 'auth/isAdmin',
      }),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
      messageLength() {
        return this.message.length
      },
      messageLengthClass() {
        return this.message.length < 150 ? 'text-gray-700' : 'text-red-700'
      }
    },
    methods: {
      ...mapActions('client', [
        'retrieveClients',
        'addClient'
      ]),

      ...mapActions('appointment', [
        'save'
      ]),
      ...mapActions('language', [
        'getTemplate'
      ]),

      loadTemplate() {
        if(this.language == 0) {
          return
        }
        this.show = true
        this.getTemplate({
          language: this.language,
          appointment_date: this.date.split('T')[0],
          appointment_time: this.time,
          template_type: 'register'
        }).then((template) => {
          this.message = template
          this.show = false
        })
      },

      saveClient() {
        this.showAddClient = false
        if (this.newClient.name.trim() == '' ||
          this.newClient.phone.trim() == '') {
          return
        }
        this.show = true
        this.addClient({
          name: this.newClient.name,
          phone: this.newClient.phone,
          email: this.newClient.email,
          ssn: null
        }).then((client) => {
          this.client = client.id
          this.newClient.name = ''
          this.newClient.phone = ''
          this.newClient.email = ''
          this.show = false
          this.popup('Client added', 'success', 2000)
        }).catch((e) => {
          this.show = false
          this.popup(e.message, 'error', 3000)
        })
      },
      saveAppointment() {
        if (this.cancelViaText && this.customerPhone.trim() == '') {
          this.popup('Please enter phone number.', 'error', 2000)
          return
        }
        if (this.cancelEmail && this.email.trim() == '') {
          this.popup('Please enter email to receive notification.', 'error', 2000)
          return
        }
        if (this.client == 0) {
          this.popup('Please select Client', 'error', 2000)
          return
        }
        if (this.language == 0) {
          this.popup('Please select Language', 'error', 2000)
          return
        }
        if (this.date == '') {
          this.popup('Please select Date', 'error', 2000)
          return
        }
        this.date = this.date.split('T')[0]
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
          message: this.message,
          enable_cancel_sms: this.cancelViaText,
          phone: this.customerPhone,
          enable_email_cancel: this.cancelEmail,
          email: this.email
        }).then((appointment) => {
          this.popup('Appointment booked', 'success', 2000)
          this.show = false
          this.language = '0'
          eventBus.$emit('resetLanguageComponent')
          this.date = new Date().getFullYear() + "-" + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' +
            new Date().getDate()).slice(-2) + 'T00:00:00.000Z'
          this.time = ("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2) +
            ':00'
          this.client = '0'
          this.department = '0'
          this.bokn = ''
          this.ta = 1
          this.message = ''
          this.cancelViaText = 0
          this.customerPhone = ''
          this.cancelEmail = 0
          this.email = ''
          this.appointmentId = appointment.id
          this.showConfirmNotification = true
        }).catch(() => {
          this.show = false
          this.popup('Unable to book appointment', 'error', 2000)
        })
      }
    },
  }
</script>

<style scoped>

</style>
