<template>
    <div class="bg-white mt-4">
      <div class="table w-full">
        <div class="table-row">
          <span class="bg-teal-600 cursor-pointer fa fa-plus px-5 py-2 rounded text-white"
          @click="addLanguageModal = true"
          ></span>
        </div>
        <div class="table-row" v-for="(language, index) in languages" :key="language.id">
          <div class="flex-1 px-4 py-2 table-cell text-center text-gray-700 text-lg text-sm align-middle">{{language
            .language}} <span class="text-sm font-light">({{language.language_code}})</span></div>
          <div class="table-cell text-gray-700 text-sm w-1 align-middle">
            <div class="flex flex-1 h-4 items-center rounded-full w-4" 
                 :class="'_' + language.implemented"></div>
          </div>
          <div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle">
                  <label class="switch">
                    <input type="checkbox" v-model="language.active" :value="language.active" :id="'switch-' + 
                    language.id" @click="update(!language.active, index)">
                    <span class="slider rounded-full"></span>
                  </label>
          </div>
          <div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle" :id="'edit-' + language.id">
            <span class="fa fa-edit text-blue-600 cursor-pointer" @click="editLanguage(index)"></span>
          </div>
          <div class="px-4 py-2 table-cell text-gray-700 text-sm w-1 align-middle" :id="'delete-' + language.id">
            <span class="fa fa-trash text-red-600 cursor-pointer" @click="remove(index)"></span>
          </div>
        </div>
      </div>
      <modal v-if="addLanguageModal" @close = "saveLanguage" @dismiss="dismissModal" width="w-1/5" height="h-auto"
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
    </div>
</template>

<script>
   import {mapActions, mapGetters} from 'vuex'
   import '@fortawesome/fontawesome-free/css/all.min.css'
   import ModalComponent from '@/components/ModalComponent'
   import Popup from '@/mixins/Popup'
    export default {
      name: "Language",
      mixins: [Popup],
      components: {
        'modal': ModalComponent
      },
      data() {
        return {
          showModal: false,
          language: null,
          languageCode: null,
          languageIndex: null,
          addLanguageModal: false,
          newLanguage: null,
          newLanguageCode: null
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
          languages: 'getPaginatedLanguages'
        }),
      },
      methods: {
        ...mapActions('language', [
          'getLanguagesPaginated',
          'updateLanguage',
          'addLanguage',
          'deleteLanguage'
        ]),
        closeModal() {
          this.showModal = false
          if(this.languages[this.languageIndex].language != this.language ||
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
            active: status ? 1: 0,
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
        // languageChanged: event => {
        //   //eventBus.$emit('languageChanged', {"languageId": event.target.value})
        // }
      }
    }
</script>

<style scoped>
</style>