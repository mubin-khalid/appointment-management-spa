<template>
  <div class="w-full">
    <h2 class="bg-white mb-2 px-5 rounded text-2xl text-teal-700">Appointments</h2>
    <div class="table w-full py-2 shadow-2xl rounded bg-white">
      <div class="table-row flex p-4 rounded text-center">
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-md-center flex font-bold">Patient Name</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Patient Email</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Patient Phone</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Appointment Date</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Appointment Time</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Reminder Sent</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Actions</div>
      </div>
      <div
        class="table-row flex p-4 border border-black text-center"
        v-for="(appointment, index) in appointments.appointments"
        :key="appointment.id"
        :id="appointment.id"
      >
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ appointment.patient.name }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ appointment.patient.email }}
        </div>

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ appointment.patient.phone }}
        </div>

        <!--<div-->
        <!--class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"-->
        <!--&gt;{{ appointment.title }}-->
        <!--</div>-->

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ appointment.appointment_date }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ appointment.appointment_time }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ (appointment.reminder_sent == '1') ? 'Yes' : 'No' }}
          <input v-if="appointment.reminder_sent != '1'"
            type="button"
            class="rounded bg-blue-500 p-2 text-white hover:text-black cursor-pointer"
            value="Send"
            :id="appointment.id" @click="sendReminder(appointment)"
          >
        </div>
        <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex">
          <input
            type="button"
            class="rounded bg-teal-500 p-2 text-white hover:text-black cursor-pointer"
            value="View"
            :id="appointment.id" @click="showAlert(appointment)"
          >
          <input
            type="button"
            class="rounded bg-red-600 p-2 text-white hover:text-black cursor-pointer mx-2"
            value="Cancel"
            :id="appointment.id"
            @click="cancelAppointment(appointment.id, index)"
          >
        </div>
      </div>
    </div>
    <vue-ads-pagination
      :total-items="total ? total : 1"
      :max-visible-pages="5"
      :page="page"
      :loading="loading"
      @page-change="pageChange"
      @range-change="rangeChange"
    >
      <template slot-scope="props">
        <div class="vue-ads-pr-2 vue-ads-leading-loose">
          <span>Appointment {{ props.start }} to {{ props.end }} from <span class="font-bold text-teal-600">{{ props.total }}</span></span>
        </div>
      </template>
      <template
        slot="buttons"
        slot-scope="props"
      >
        <vue-ads-page-button
          v-for="(button, key) in props.buttons"
          :key="key"
          v-bind="button"
          @page-change="page = button.page"
        />
      </template>
    </vue-ads-pagination>
  </div>
</template>

<script>
  import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
  import '../../node_modules/vue-ads-pagination/dist/vue-ads-pagination.css'
  import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination';
  import Popup from '@/mixins/Popup'

  export default {
    name: "Appointments",
    mixins: [Popup],
    data() {
      return {
        loading: false,
        page: 0,
      }
    },
    created() {
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
    },
    computed: {
      appointments() {
        return this.$store.getters.getAppointments
      },
      total() {
        return this.$store.getters.getAppointments.total
      }
    },
    methods: {
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        this.$store.dispatch('loadAppointments', {
          page: this.page,
          all: false,
        })
      },
      cancelAppointment(id, index) {
        this.$store.dispatch('cancelAppointment', {
          id: id,
          cancelled_by: 'user',
          index: index
        }).then(() => {
          this.popup('Appointment Cancelled', 'success', 5000)
        }).catch(() => {
          this.popup('Unable to cancel it, please try later', 'error', 3000)
        })
      },
      sendReminder(appointment) {
          this.$store.dispatch('sendReminder', {
            'notification_type': 'email',
            'appointment_id': appointment.id
          }).then( () => {
            this.popup('Reminder Sent', 'success', 2000)
            appointment.reminder_sent = 1
          })
      },
      showAlert(appointment) {
        this.$swal({
          title: '<span class = "font-sm"> Details </span>',
          html: '<span class = "font-bold w-full"> Patient</span>: ' + appointment.patient.name +
            '<br /><span class = "mb-2 font-bold w-full"> Phone</span>: ' + appointment.patient.phone +
            '<br /><span class = "font-bold"> Email</span>: ' + appointment.patient.email +
            '<br /><span class = "font-bold"> Appointment Date</span>: ' + appointment.appointment_date +
            '<br /><span class = "font-bold"> Appointment Time</span>: ' + appointment.appointment_time +
            '<br /><span class = "font-bold"> BOKN. </span>: ' + appointment.bokn,
        })
      },
    },
  }
</script>

<style scoped>
  #swal2-content {
    line-height: 1.375 !important;
    text-align: left !important;
  }
</style>