<template>
  <div class="bg-white mt-4">
    <vue-element-loading :active="show" spinner="ring" color="#38b2ac"/>
    <div class="table w-full">
      <!--<div class="table-row">-->
      <!--    <span class="bg-teal-600 cursor-pointer fa fa-plus px-5 py-2 rounded text-white"-->
      <!--          @click="addLanguageModal = true"-->
      <!--    ></span>-->
      <!--</div>-->
      <div class="table-row" v-for="(language, index) in languages" :key="language.id">
        <div class="flex-1 px-4 py-2 table-cell text-center text-gray-700 text-lg text-sm align-middle">{{language
          .language}} <span class="text-sm font-light">({{language.language_code}})</span></div>
        <div class="table-cell text-gray-700 text-sm w-1 align-middle">
          <div class="flex flex-1 h-4 items-center rounded-full w-4 mr-10"
               :class="'_' + language.implemented"></div>
        </div>
        <!--<div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle">-->
        <!--  <label class="switch">-->
        <!--    <input type="checkbox" v-model="language.active" :value="language.active" :id="'switch-' + -->
        <!--            language.id" @click="update(!language.active, index)">-->
        <!--    <span class="slider rounded-full"></span>-->
        <!--  </label>-->
        <!--</div>-->
        <!--<div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle" :id="'edit-' + language.id">-->
        <!--  <span class="fa fa-edit text-blue-600 cursor-pointer" @click="editLanguage(index)"></span>-->
        <!--</div>-->
        <!--<div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle" :id="'delete-' + language.id">-->
        <!--  <span class="fa fa-trash text-red-600 cursor-pointer" @click="remove(index)"></span>-->
        <!--</div>-->
      </div>
    </div>
    <modal v-if="addLanguageModal" @close="saveLanguage" @dismiss="dismissModal" width="w-1/5" height="h-auto"
           buttonText="Save">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <div slot="header">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" id="new_language" placeholder="English" v-model="newLanguage">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" id="new_language_code" placeholder="en" v-model="newLanguageCode">
        </div>
      </div>
      <div slot="body">

      </div>
    </modal>
    <modal v-if="showModal" @close="closeModal" @dismiss="dismissModal" width="w-1/5" height="h-auto">
      <!--
        you can use custom content here to overwrite
        default content
      -->
      <div slot="header">
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" id="language" v-model="language">
        </div>
        <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text" id="language_code" v-model="languageCode">
        </div>
      </div>
      <div slot="body">

      </div>

    </modal>

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
            {{ verbiage.languages }} {{ props.start }} {{verbiage.to}} {{ props.end }} {{verbiage.from}} 
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
  import {mapActions, mapGetters} from 'vuex'
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import ModalComponent from '@/components/ModalComponent'
  import Popup from '@/mixins/Popup'
  import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination';
  import VueElementLoading from 'vue-element-loading'


  export default {
    name: "Language",
    mixins: [Popup],
    components: {
      'modal': ModalComponent,
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading,
    },
    data() {
      return {
        showModal: false,
        language: null,
        languageCode: null,
        languageIndex: null,
        addLanguageModal: false,
        newLanguage: null,
        newLanguageCode: null,
        loading: false,
        page: 0,
        show: false,
      }
    },
    created() {
      this.getLanguagesPaginated({
        per_page: 10,
        page: 0
      })
    },
    computed: {
      ...mapGetters('language', {
        languages: 'getPaginatedLanguages',
        total: 'getPaginatedLanguagesCount'
      }),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
    },
    methods: {
      ...mapActions('language', [
        'getLanguagesPaginated',
        'updateLanguage',
        'addLanguage',
        'deleteLanguage'
      ]),
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        this.show = true
        this.loading = true
        this.getLanguagesPaginated({
          per_page: 10,
          page: this.page
        }).then(() => {
          this.show = false
          this.loading = false
        })
      },
      closeModal() {
        this.showModal = false
        if (this.languages[this.languageIndex].language != this.language ||
          this.languages[this.languageIndex].language_code != this.languageCode
        ) {
          this.updateLanguage({
            index: this.languageIndex,
            language: this.language,
            language_code: this.languageCode,
            id: this.languages[this.languageIndex].id,
          })
        }
      },
      editLanguage(index) {
        this.showModal = true
        this.language = this.languages[index].language
        this.languageCode = this.languages[index].language_code
        this.languageIndex = index
      },
      saveLanguage() {
        this.addLanguageModal = false
        this.addLanguage({
          language: this.newLanguage,
          language_code: this.newLanguageCode
        })
        this.newLanguage = null
        this.this.newLanguageCode = null
      },
      dismissModal() {
        this.language = null
        this.languageCode = null
        this.newLanguage = null
        this.newLanguageCode = null
        this.showModal = false
        this.addLanguageModal = false
      },
      update(status, index) {
        this.updateLanguage({
          active: status ? 1 : 0,
          index: index,
          language: this.languages[index].language,
          language_code: this.languages[index].languageCode,
          id: this.languages[index].id,
        }).then(() => {
          this.popup('Language Updated', 'success', 2000)
        })
      },
      remove(index) {
        this.deleteLanguage({
          id: this.languages[index].id,
          index: index
        })
      }
    }
  }
</script>

<style scoped>
</style>