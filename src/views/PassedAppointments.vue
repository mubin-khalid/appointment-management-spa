<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <div class="mt-4 mb-4 flex">
      <div class="flex-1">
        <input type="text"
               class="w-full appearance-none hover:appearance-none bg-gray-200 text-gray-700 p-2 outline-none focus:outline-none border-b-2 border-teal-600 rounded"
               v-model="search"
               :placeholder="verbiage.search"
        >
      </div>
      <div class="w-1/3">
        <select name="search_type" id="search_type" v-model="searchType"
                class="w-full appearance-none hover:appearance-none bg-gray-200 text-gray-700 p-2 outline-none focus:outline-none border-b-2 border-teal-600 rounded ml-8">
          <option value="id">{{verbiage.booking_id}}</option>
          <option value="phone">{{ verbiage.client }} {{ verbiage.phone }}</option>
          <option value="email">{{ verbiage.client }} {{ verbiage.email }}</option>
          <option value="name">{{ verbiage.client }} {{ verbiage.name }}</option>
          <option value="date">{{ verbiage.appointment }} {{ verbiage.date }}</option>
          <option value="time">{{ verbiage.appointment }} {{ verbiage.time }}</option>
        </select>
      </div>
    </div>
    <div class="table w-full mt-2 rounded shadow-2xl">
      <div class="table-row bg-teal-600 font-bold text-center text-sm text-white rounded">
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
        class="table-row p-4 text-center text-sm text-gray-700"
        v-for="(appointment) in filteredAppointment"
        :key="appointment.id"
        :id="appointment.id"
      >
        <div
          class="table-cell px-4 py-2"
        >{{ appointment.client.name }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ appointment.client.email }}
        </div>

        <div
          class="table-cell px-4 py-2"
        >{{ appointment.client.phone }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ appointment.appointment_date }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ appointment.appointment_time }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ (appointment.reminder_sent == '1') ? 'Yes' : 'No' }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ appointment.id }}
        </div>
        <div class="table-cell px-4 py-2">
          <i class="fa fa-eye mr-3 text-lg text-blue-600 hover:text-blue-700 cursor-pointer"
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
  import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination'
  import Popup from '@/mixins/Popup'
  import {mapActions, mapGetters} from "vuex"
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: "PassedAppointments",
    mixins: [Popup],
    data() {
      return {
        loading: false,
        page: 0,
        show: false,
        search: '',
        searchType: 'id',
      }
    },
    watch: {
      search(value) {
        this.show = true
        this.loading = true

        this.loadAppointments({
          page: this.page,
          all: false,
          type: 'passed',
          queryType: this.searchType,
          query: value,
        }).then(() => {
          this.show = false
          this.loading = false
        })
      }
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading
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
        let filtered = []
        if (this.total > 0) {
          Object.keys(this.appointments).forEach((key) => {
            if (typeof this.appointments[key].client !== 'undefined' || this.appointments[key].client != null) {
              filtered.push(this.appointments[key])
            }
          })
          return filtered
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
          all: false,
          type: 'passed',
          queryType: this.searchType,
          query: this.search,
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
            '<br /><span class = "font-bold">  ' + this.verbiage.booking_id + ' </span>: ' + appointment.id,
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