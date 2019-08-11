<template>
  <div class="w-full">
    <h2 class="bg-white mb-2 px-5 rounded text-2xl text-teal-700">Notifications</h2>
    <div class="table w-full py-2 shadow-2xl rounded bg-white">
      <div class="table-row flex p-4 rounded text-center">
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-md-center flex font-bold">Client Name</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Client Email</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Client Phone</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Notification</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Notification Type</div>
      </div>
      <div
        class="table-row flex p-4 border border-black text-center"
        v-for="(notification) in notifications"
        :key="notification.id"
        :id="notification.id"
      >
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ notification.client.name }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ notification.client.email }}
        </div>

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ notification.client.phone }}
        </div>


        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ notification.type }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
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
  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: "notifications",
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
    computed:{
      ...mapGetters('notifications', [
        'notifications',
        'total'
      ]),
    },
    methods: {
      ...mapActions('notifications', [
        'loadNotifications'
      ]),
      pageChange(page) {
        this.page = page;
      },

      rangeChange(_, __) {
        this.loadNotifications({
          page: this.page,
          all: false,
        })
      },
    },
  }
</script>

<style scoped>

</style>
