<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <div class="rounded shadow-2xl table w-full">
      <div class="table-row p-4 text-center font-bold text-gray-700 text-sm">
        <div class="table-cell p-3">Customer Name</div>
        <div class="table-cell p-3">Client Name</div>
        <div class="table-cell p-3">Client Email</div>
        <div class="table-cell p-3">Client Phone</div>
        <div class="table-cell p-3">Appointment Date</div>
        <div class="table-cell p-3">Appointment Time</div>
        <div class="table-cell p-3">Booking ID</div>
        <div class="table-cell p-3">Cancelled By</div>
      </div>
      <div
        class="table-row text-center text-gray-700 text-sm"
        v-for="(appointment) in filteredAppointment"
        :key="appointment.id"
        :id="appointment.id"
      >
        <div
          class="table-cell p-3"
        >{{ appointment.user.name }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.client.name }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.client.email }}
        </div>

        <div
          class="table-cell p-3"
        >{{ appointment.client.phone }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.appointment_date }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.appointment_time }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.bokn }}
        </div>
        <div
          class="table-cell p-3"
        >{{ appointment.cancelled_by }}
        </div>
      </div>
    </div>
    <vue-ads-pagination
      :total-items="total? total : 1"
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
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import 'vue-ads-pagination/dist/vue-ads-pagination.css'
  import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination';
  import {mapActions, mapGetters} from "vuex";
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: "CancelledAppointments",
    data() {
      return {
        loading: false,
        page: 0,
        show: false,
      }
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading,
    },
    computed: {
      ...mapGetters('appointment', {
        appointments: 'appointments',
        total: 'total',
      }),
      filteredAppointment: function () {
        if (this.total > 0) {
          return this.appointments
        }
        return {}
      }
    },
    methods: {
      ...mapActions('appointment', [
        'loadAppointments',
      ]),
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        this.show = true
        this.loading = true
        this.loadAppointments({
          page: this.page,
          all: true,
          type: 'cancelled'
        }).then(() => {
          this.show = false
          this.loading = false
        })
      }
    },
  }
</script>

<style scoped>
  #swal2-content {
    line-height: 1.375 !important;
    text-align: left !important;
  }
</style>