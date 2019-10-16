<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <div class="border-blue-800 border-t-4 rounded shadow-2xl table w-full">
      <div class="bg-teal-600 font-bold table-row text-center text-lg text-white">
        <div class="table-cell p-4">{{verbiage.customer}} {{verbiage.name}}</div>
        <div class="table-cell p-4">{{verbiage.recipient}}</div>
        <div class="table-cell p-4">{{verbiage.notifications}}</div>
        <div class="table-cell p-4">{{verbiage.notifications}} {{verbiage.type}}</div>
      </div>
      <div
        class="table-row p-4 text-center text-sm text-gray-700"
        v-for="(notification) in notifications"
        :key="notification.id"
        :id="notification.id"
      >
        <div
          class="table-cell px-4 py-2"
        >{{ notification.user.name }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ notification.sent_to}}
        </div>

        <div
          class="table-cell px-4 py-2"
        >
          <span class="text-lg fas"
                :class="{'fa-envelope text-teal-600': (notification.type == 'email'),
               'fa-sms text-blue-700': (notification.type == 'sms')
               }
          
        ">
        </span>
        </div>
        <div
          class="table-cell px-4 py-2 capitalize"
          :class="notification.notification_type == 'cancel' ? 'text-red-500' : ''"
        >{{ notification.notification_type }}
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
          <span>
            {{ verbiage.notifications }} {{ props.start }} {{verbiage.to}} {{ props.end }} {{verbiage.from}} 
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
  import {mapActions, mapGetters} from 'vuex'
  import VueElementLoading from 'vue-element-loading'

  export default {
    name: "notifications",
    data() {
      return {
        loading: false,
        page: 0,
        show: false,
      }
    },
    created() {
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading,
    },
    computed: {
      ...mapGetters('notifications', [
        'notifications',
        'total'
      ]),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
    },
    methods: {
      ...mapActions('notifications', [
        'loadNotifications'
      ]),
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        this.show = true
        this.loading = true
        this.loadNotifications({
          page: this.page,
          all: true,
        }).then(() => {
          this.show = false
          this.loading = false
        })
      },
    },
  }
</script>

<style scoped>

</style>
