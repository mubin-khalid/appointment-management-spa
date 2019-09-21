<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <div class="rounded shadow-2xl table w-full">
      <div class="table-row p-4 text-center font-bold text-gray-700 text-sm">
        <div class="table-cell p-3">{{ verbiage.customer }} {{ verbiage.name }}</div>
        <div class="table-cell p-3">{{ verbiage.client }} {{ verbiage.name }}</div>
        <div class="table-cell p-3">{{ verbiage.client }} {{ verbiage.email }}</div>
        <div class="table-cell p-3">{{ verbiage.client }} {{ verbiage.phone }}</div>
        <div class="table-cell p-3">{{ verbiage.appointment }} {{ verbiage.date }}</div>
        <div class="table-cell p-3">{{ verbiage.appointment }} {{ verbiage.time }}</div>
        <div class="table-cell p-3">{{ verbiage.reminder_sent }}</div>
        <div class="table-cell p-3">{{ verbiage.booking_id }}</div>
        <div class="table-cell p-3">{{ verbiage.actions }}</div>
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
        >
          <span class="fa"
                 :class="{'fa-check-circle text-teal-600': (appointment.reminder_sent == '1'),
               'fa-times-circle text-red-700': (appointment.reminder_sent != '1')
               }
          
        ">
        </span>
        </div>
        <div class="table-cell p-3">
          {{ appointment.bokn }}
        </div>
        <div class="table-cell p-3">
          <i class="fa fa-eye text-teal-600 cursor-pointer"
             :id="appointment.id" @click="showAlert(appointment)"
          ></i>
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
          <span>
            {{ verbiage.appointment }} {{ props.start }} {{verbiage.to}} {{ props.end }} {{verbiage.from}} 
            <span class="font-bold text-teal-600">
              {{ props.total}}
            </span>
          </span>
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
    name: "PassedAppointments",
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
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
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
          type: 'passed'
        }).then(() => {
          this.show = false
          this.loading = false
        })
      },
      showAlert(appointment) {
        this.$swal({
          title: '<span class = "font-sm"> ' + this.verbiage.details + ' </span>',
          html: '<span class = "font-bold w-full"> ' + this.verbiage.client + '</span>: ' + appointment.client.name +
            '<br /><span class = "mb-2 font-bold w-full">  ' + this.verbiage.phone + '</span>: ' +
            appointment.client.phone +
            '<br /><span class = "font-bold">  ' + this.verbiage.email + '</span>: ' + appointment.client.email +
            '<br /><span class = "font-bold">  ' + this.verbiage.appointment + this.verbiage.date + '</span>: ' +
            appointment.appointment_date +
            '<br /><span class = "font-bold">  ' + this.verbiage.appointment + this.verbiage.time + '</span>: ' +
            appointment.appointment_time +
            '<br /><span class = "font-bold">  ' + this.verbiage.booking_id + ' </span>: ' + appointment.bokn,
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