<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <form class="w-full px-3 mb-2" @submit.prevent="addTranslationAgency">
      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          aria-label="Agency Name"
          class="appearance-none outline-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="ABC Agency"
          type="text"
          v-model="name"
        >
        <input
          class="appearance-none outline-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="agency@example.com"
          aria-label="email"
          v-model="email"
        >
        <input
          class="appearance-none outline-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Phone"
          aria-label="phone"
          v-model="phone"
        >
        <input
          class="appearance-none outline-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Fax"
          aria-label="fax"
          v-model="fax"
        >
        <button
          class="flex-shrink-0 bg-teal-600 hover:bg-teal-700 border-teal-600 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >{{ verbiage.add }}
        </button>
      </div>
    </form>
    <div class="table w-full border-blue-800 border-t-4 rounded shadow-2xl">
      <div class="table-row bg-teal-600 font-bold text-center text-lg text-white">
        <div class="table-cell p-4">{{ verbiage.name }}</div>
        <div class="table-cell p-4">{{ verbiage.email }}</div>
        <div class="table-cell p-4">{{ verbiage.phone }}</div>
        <div class="table-cell p-4">{{ verbiage.fax }}</div>
        <div class="table-cell p-4">{{ verbiage.actions }}</div>
      </div>
      <div
        class="table-row text-center text-gray-700 text-sm"
        v-for="(agency, index) in agencies"
        :key="agency.id"
        :id="agency.id"
      >
        <div
          class="table-cell p-3"
        >{{ agency.name }}
        </div>
        <div
          class="table-cell p-3"
        >{{ agency.email }}
        </div>

        <div
          class="table-cell p-3"
        >{{ agency.phone }}
        </div>

        <div
          class="table-cell p-3"
        >{{ agency.fax }}
        </div>
        <div
          class="table-cell p-3"
        ><i class="fa fa-edit text-blue-600 hover:text-blue-700 cursor-pointer text-lg"
            @click="showModal(index)"
        ></i>
        </div>
      </div>
    </div>
    <modal v-if="showEditModal" width="w-1/3" height="h-auto" @close="doneEdit">
      <div slot="header" class="text-gray-700"> {{ verbiage.edit }}
        <span class="font-bold">{{ cachedTA.name }}</span></div>
      <div slot="body">
        <input type="text" class="w-full bg-gray-100 text-gray-700 outline-none focus:outline-none p-2 mb-2"
               v-model="editedTA.name" id="name">
        <input type="text" class="w-full bg-gray-100 text-gray-700 outline-none focus:outline-none p-2 mb-2"
               v-model="editedTA.email" id="email">
        <input type="text" class="w-full bg-gray-100 text-gray-700 outline-none focus:outline-none p-2 mb-2"
               v-model="editedTA.phone" id="phone">
        <input type="text" class="w-full bg-gray-100 text-gray-700 outline-none focus:outline-none p-2 mb-2"
               v-model="editedTA.fax" id="fax">
      </div>
    </modal>
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
  import Popup from '@/mixins/Popup'
  import {mapActions, mapGetters} from 'vuex'
  import VueElementLoading from 'vue-element-loading'
  import ModalComponent from '@/components/ModalComponent'

  export default {
    name: "translation-agencies",
    mixins: [Popup],
    data() {
      return {
        showEditModal: false,
        loading: false,
        show: false,
        page: 0,
        name: '',
        email: '',
        phone: '',
        fax: '',
        currentIndex: null,
        cachedTA: {
          id: null,
          name: null,
          email: null,
          phone: null,
          fax: null,
        },
        editedTA: {
          id: null,
          name: null,
          email: null,
          phone: null,
          fax: null,
        },
      }
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading,
      'modal': ModalComponent,
    },
    computed: {
      ...mapGetters('translationAgencies', {
        agencies: 'translation_agencies',
        total: 'total'
      }),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
    },
    methods: {
      ...mapActions('translationAgencies', [
        'getTranslationAgencies',
        'store',
        'update'
      ]),
      pageChange(page) {
        this.page = page;
      },

      addTranslationAgency() {
        if (this.name.trim() == '' || this.email.trim() == '' || this.phone.trim() == '' || this.fax.trim() == '') {
          this.popup('Please fill all fields before adding new Agency', 'error', 3000)
          return;
        }
        this.show = true
        this.store({
          name: this.name,
          email: this.email,
          phone: this.phone,
          fax: this.fax
        }).then(() => {
          this.popup('Agency Added successfully.', 'success', 2000)
          this.name = ''
          this.email = ''
          this.phone = ''
          this.fax = ''
          this.show = false
        })
      },
      rangeChange() {
        this.loading = true
        this.show = true
        this.getTranslationAgencies({
          page: this.page,
          all: false,
        }).then(() => {
          this.loading = false
          this.show = false
        })
      },
      showModal(index) {
        this.showEditModal = true
        this.currentIndex = index
        this.editedTA.id = this.cachedTA.id = this.agencies[index].id
        this.editedTA.name = this.cachedTA.name = this.agencies[index].name
        this.editedTA.email = this.cachedTA.email = this.agencies[index].email
        this.editedTA.phone = this.cachedTA.phone = this.agencies[index].phone
        this.editedTA.fax = this.cachedTA.fax = this.agencies[index].fax
      },
      doneEdit() {
        this.showEditModal = false
        if (JSON.stringify(this.editedTA) != JSON.stringify(this.cachedTA)) {
          this.show = true
          this.update({
            index: this.currentIndex,
            editedTA: this.editedTA
          }).then(() => {
            this.show = false
            this.popup('Updated successfully', 'success', 2000)
          }).catch(() => {
            this.show = false
            this.popup('Unable to update.', 'error', 2000)
          })
        }
      }
    },
  }
</script>

<style scoped>

</style>
