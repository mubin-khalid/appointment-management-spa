<template>
  <div class="w-full">
    <div id="top" class="bg-white flex pt-2 rounded p-2">
      <div class="w-1/2 p-3">
        <span class="text-2xl text-teal-700"></span>
      </div>
      <div class="w-1/2">
        <button id="show-modal" class='bg-teal-600 float-right font-bold h-auto mt-0 mb-2 rounded text-white'
                @click="showModal = true"><span 
          class="bg-teal-600 cursor-pointer fa fa-plus px-5 py-2 rounded text-white"></span>
        </button>
      </div>

      <!-- use the modal component, pass in the prop -->
      <modal v-if="showModal" @close="addTemplate" @dismiss="dismissModal" width="w-1/3" height="h-auto"
             buttonText="Save">
        <!--
          you can use custom content here to overwrite
          default content
        -->
        <div slot="header">
          <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
            <select name="languages" id="languages"
                    class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    v-model="selectedLanguage"
                    @change="updateTemplateTypes"
            >
              <option value="null" disabled selected>Choose Language</option>
              <option v-for="(language, langIndex) in languages" :key="'language' + language.language.id"
                      v-if="language.language.implemented < 3"
                      :value="language.language.id"
                      class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"

              >{{language.language.language}}
              </option>
            </select>
          </div>

          <!--          Template Type-->
          <div class="flex items-center border-b border-b-2 border-teal-500 py-2"
               v-if="selectedLanguage != null"
          >
            <select name="template_type" id="template_type"
                    class="capitalize appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            v-model="selectedTemplateType"
            >
              <option value="null" disabled selected>Choose Template Type</option>
              <option v-for="(templateType, index) in templateTypes" :key="'template-' + index"
                      :id="'template-' + index"
                      :value="templateType"
                      class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"

              >{{templateType}}
              </option>
            </select>
          </div>
          <div class="flex items-center border-b border-b-2 border-teal-500 py-2" v-if="selectedLanguage != null">
            <textarea name="template" id="template_text" cols="50" rows="10" :disabled="selectedTemplateType == null"
                      class="focus:outline-none leading-tight mt-5 outline-none p-3 w-full resize-none"
                      placeholder="Template Text"
                      v-model="newTemplate"
            ></textarea>
          </div>
        </div>
        <div slot="body">

        </div>
      </modal>
    </div>

    <modal v-if="showEditModal" @close="updateTemplate" @dismiss="dismissModal" width="w-1/3" height="h-auto"
           buttonText="Save">
      <div slot="header">
        <div class="">
          <p class="px-5">Type: <span class="font-bold capitalize">{{editTemplateType}}</span></p>
          <textarea name="template" id="edit_template_text" cols="50" rows="10"
                    class="focus:outline-none leading-tight mt-5 outline-none p-3 w-full resize-none"
                    v-model="editTemplateText"
          ></textarea>
        </div>
      </div>
    </modal>

    <accordion
      v-for="(language, li) in languages"
      :key="language.language.language"
      :id="language.language.id"
      :class="'_' + language.language.implemented"
    >
      <div slot="header">{{language.language.language}}</div>
      <div class="flex content-start flex-wrap bg-gray-200">
        <div class="w-1/3 p-2 border-teal-600" v-for="(template, ti) in language.templates"
             :key="template.id"
             :id="template.id"
             :class="ti !== language.templates.length-1 ? 'border-r': ''"
        >
          <div class="flex">
            <p class="px-5 flex-1">Type: <span class="font-bold capitalize">{{template.template_type}}</span></p>
            <span class="fa fa-edit text-blue-600 mr-3 cursor-pointer" @click="editTemplate(li, ti)"></span>
            <span class="fa fa-trash text-red-600 cursor-pointer" @click="deleteTemplate(li, ti)"></span>
          </div>
          <p class="p-5">
            {{template.template}}
          </p>
        </div>
      </div>
    </accordion>
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
          <span>Languages: {{ props.start }} to {{ props.end }} from <span class="font-bold text-teal-600">{{ 
            props.total 
            }}</span></span>
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
  import Popup from '../../mixins/Popup'
  import {mapActions, mapGetters} from "vuex";
  import AccordionComponent from '@/components/AccordianComponent'
  import ModalComponent from '@/components/ModalComponent'

  export default {
    name: "templates",
    mixins: [Popup],
    data() {
      return {
        loading: false,
        page: 0,
        showModal: false,
        showEditModal: false,
        editTemplateType: null,
        editTemplateText: null,
        newTemplate: null,
        templateTypes: [
          'cancel',
          'register',
          'reminder'
        ],
        selectedLanguage: null,
        selectedTemplateType: null,
        languageIndex: null,
        templateIndex: null,
      }
    },
    created() {
      this.loadLanguageWithTemplates({page: this.page})
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      'modal': ModalComponent,
      'accordion': AccordionComponent
    },
    computed: {
      ...mapGetters('language', {
        languages: 'getLanguagesWithTemplates',
        total: 'totalLanguagesWithTemplates'
      })
    },
    methods: {
      ...mapActions('language', {
        loadLanguageWithTemplates: 'loadLanguageWithTemplates',
        edit: 'editTemplate',
        removeTemplate: 'deleteTemplate',
        createTemplate: 'addTemplate'
      }),

      pageChange(page) {
        this.page = page;
      },
      updateTemplateTypes() {
        let languages = this.languages
        Object.keys(languages).forEach((v, k) => {
          if (languages[k].language.id == this.selectedLanguage) {
            if (languages[k].language.implemented < 3 && typeof
              languages[k].templates !== 'undefined') {
              let templates = languages[k].templates
              Object.keys(templates).forEach((t, tk) => {
                let index = this.templateTypes.indexOf(templates[tk].template_type)
                if (index > -1) {
                  this.templateTypes.splice(index, 1)
                }
              })
            } else {
              this.templateTypes = [
                'cancel',
                'register',
                'reminder'
              ]
            }
          }
        })
      },
      dismissModal() {
        this.showModal = false
        this.selectedLanguage = null
        this.showEditModal = false
        this.editTemplateType = null
        this.editTemplateText = null
      },
      editTemplate(languageIndex, templateIndex) {
        this.showEditModal = true
        let template = this.languages[languageIndex].templates[templateIndex]
        //console.log(this.languages[languageIndex].templates[templateIndex])
        this.editTemplateType = template.template_type
        this.editTemplateText = template.template
        this.languageIndex = languageIndex
        this.templateIndex = templateIndex
      },
      updateTemplate() {
        this.showEditModal = false
        let template = this.languages[this.languageIndex].templates[this.templateIndex]
        this.edit({
          id: template.id,
          template_type: template.template_type,
          template: this.editTemplateText,
          languageIndex: this.languageIndex,
          templateIndex: this.templateIndex
        })
      },
      addTemplate(){
        this.showModal = false
        this.createTemplate({
          language_id: this.selectedLanguage,
          template_type: this.selectedTemplateType,
          template: this.newTemplate
        })
      },
      deleteTemplate(languageIndex, templateIndex){
        let template = this.languages[languageIndex].templates[templateIndex]
        this.removeTemplate({
          languageIndex, 
          templateIndex,
          'languageId': template.language_id,
          'id': template.id
        })
      },
// eslint-disable-next-line no-unused-vars
      rangeChange(_, __) {
        this.loadLanguageWithTemplates({page: this.page})
      },
    },
  }
</script>

<style scoped>

</style>
