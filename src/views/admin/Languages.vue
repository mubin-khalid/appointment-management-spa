<template>
  <div class="w-full">
    <h2 class="bg-white mb-2 px-5 rounded text-2xl text-teal-700">Languages/Templates</h2>
<!--    <form class="w-full bg-white rounded px-3 mb-2" @submit.prevent="addUser">-->
<!--      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">-->
<!--        <input-->
<!--          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"-->
<!--          type="text"-->
<!--          placeholder="Jane Doe"-->
<!--          aria-label="Full name"-->
<!--          v-model="name"-->
<!--        >-->
<!--        <input-->
<!--          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"-->
<!--          type="text"-->
<!--          placeholder="jane@example.com"-->
<!--          aria-label="email"-->
<!--          v-model="email"-->
<!--        >-->
<!--        <input-->
<!--          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"-->
<!--          type="text"-->
<!--          placeholder="Phone"-->
<!--          aria-label="phone"-->
<!--          v-model="phone"-->
<!--        >-->
<!--        <input-->
<!--          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"-->
<!--          type="text"-->
<!--          placeholder="Password"-->
<!--          aria-label="password"-->
<!--          v-model="password"-->
<!--        >-->
<!--        <input-->
<!--          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"-->
<!--          type="text"-->
<!--          placeholder="Facility"-->
<!--          aria-label="facility"-->
<!--          v-model="facility"-->
<!--        >-->
<!--        <button-->
<!--          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"-->
<!--          type="submit"-->
<!--        >Add-->
<!--        </button>-->
<!--      </div>-->
<!--    </form>-->
    <accordion
      v-for="language in languages"
      :key="language.language.language"
      :id="language.language.id"
      :class="'_' + language.language.implemented"
    >
<!--      <label class="switch">-->
<!--        <span class="pr-2">Active: </span>-->
<!--        <input type="checkbox" v-model="language.language.active" :id="'switch-' + language.language.id">-->
<!--        <span class="slider round"></span>-->
<!--      </label>-->
      <div class="flex content-start flex-wrap bg-gray-200">
        <div class="w-1/3 p-2" v-for="template in language.templates"
          :key="template.id"
          :id="template.id"
        >
          <p class="px-5">Type: <span class="font-bold capitalize">{{template.template_type}}</span></p>
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
          <span>Users: {{ props.start }} to {{ props.end }} from <span class="font-bold text-teal-600">{{ props.total 
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

  export default {
    name: "languages",
    mixins: [Popup],
    data() {
      return {
        loading: false,
        page: 0,
        name: '',
        email: '',
        phone: '',
        password: '',
        facility: '',
        title: 'Test',
        active: false,
        checked: false
      }
    },
    created() {
      this.loadLanguageWithTemplates({page: this.page})
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      'accordion': AccordionComponent
    },
    computed: {
      ...mapGetters('language', {
        languages: 'getLanguagesWithTemplates',
        total: 'totalLanguagesWithTemplates'
      })
    },
    methods: {
      ...mapActions('user', {
        getUsers: 'loadUsers',
        add: 'addUser',
        delete: 'deleteUser'
      }),
      ...mapActions('language', [
        'loadLanguageWithTemplates'
      ]),
      
      pageChange(page) {
        this.page = page;
      },
      deleteUser(user, index) {
        this.delete({
          id: user.id,
          index: index
        }).then(() => {
          this.popup('User: ' + user.name + ' deleted.', 'success', 2000)
        })
      },
      addUser() {
        this.add({
          name: this.name,
          password: this.password,
          email: this.email,
          phone: this.phone,
          facility: this.facility,
        }).then(() => {
          this.popup('User: ' + this.name + ' added.', 'success', 2000)
          this.name = this.password = this.email = this.phone = this.facility = ''
        }).catch(() => {
          this.popup('Unable to add user.', 'error', 2000)
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
  button {
    border-radius: 3px !important;
  }


  .onoffswitch {
    position: relative;
    width: 90px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  .onoffswitch-checkbox {
    display: none;
  }

  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #999999;
    border-radius: 20px;
  }

  .onoffswitch-inner {
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
  }

  .onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block;
    float: left;
    width: 50%;
    height: 30px;
    padding: 0;
    line-height: 30px;
    font-size: 12px;
    color: white;
    font-family: Trebuchet, Arial, sans-serif;
    font-weight: bold;
    box-sizing: border-box;
  }

  .onoffswitch-inner:before {
    content: "Active";
    padding-left: 10px;
    background-color: #38b2ac;
    color: #FFFFFF;
  }

  .onoffswitch-inner:after {
    content: "Inactive";
    padding-right: 10px;
    background-color: #EEEEEE;
    color: #999999;
    text-align: right;
  }

  .onoffswitch-switch {
    display: block;
    width: 20px;
    height: 20px;
    margin: 5px;
    background: #FFFFFF;
    position: absolute;
    right: 56px;
    border: 2px solid #999999;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }

  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
  }

  .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px;
  }


  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
