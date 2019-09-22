<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <form class="w-full px-3 mb-2" @submit.prevent="addWebhook">
      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          aria-label="webhook"
          class="appearance-none outline-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Webhook"
          type="text"
          v-model="hook"
        >
        <select name="ta" id="ta" v-model="ta" 
                class="bg-gray-200 focus:outline-none mr-2 outline-none p-2 text-gray-800 w-2/4 appearance-none">
          <option v-for="agency in user.translation_agencies" :key="agency.id" :value="agency.id">
            {{ agency.name }}
          </option>
        </select>
        <button
          class="flex-shrink-0 bg-teal-600 hover:bg-teal-700 border-teal-600 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >{{ verbiage.add }}
        </button>
      </div>
    </form>
    <div class="border-blue-800 border-t-4 rounded shadow-2xl table w-full">
      <div class="bg-teal-600 font-bold table-row text-center text-lg text-white">
        <div class="table-cell p-4">Webhook</div>
        <div class="table-cell p-4">Translation Agency</div>
      </div>
      <div
        class="table-row p-4 text-center text-sm text-gray-700"
        v-for="(hook) in hooks.hooks"
        :key="hook.id"
        :id="hook.id"
      >
        <div
          class="table-cell px-4 py-2"
        >{{ hook.hook }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ hook.ta.name }}
        </div>
      </div>
    </div>
    <vue-ads-pagination
      :total-items="hooks.total ? hooks.total : 10"
      :max-visible-pages="5"
      :page="page"
      :loading="loading"
      @page-change="pageChange"
      @range-change="rangeChange"
    >
      <template slot-scope="props">
        <div class="vue-ads-pr-2 vue-ads-leading-loose">
          <span>
            {{ verbiage.webhooks }} {{ props.start }} {{verbiage.to}} {{ props.end }} {{verbiage.from}} 
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
    name: "Webhooks",
    data() {
      return {
        loading: false,
        page: 0,
        show: false,
        hook: null,
        ta: 0
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
        'hooks',
      ]),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
      ...mapGetters({
        user: 'auth/user',
      })
    },
    methods: {
      ...mapActions('notifications', [
        'getWebhooks',
        'storeWebhook'
      ]),
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        this.show = true
        this.loading = true
        this.getWebhooks({
          page: this.page,
        }).then(() => {
          this.show = false
          this.loading = false
        })
      },

      addWebhook() {
        if(this.hook.trim() != '' && this.ta != 0) {
          this.storeWebhook({
            hook: this.hook,
            ta_id: this.ta,
          })
        }
      },
    },
  }
</script>

<style scoped>

</style>
