<template>
  <div id="clients" class="m-auto">
    <form class="w-full bg-white rounded px-3 mb-2" @submit.prevent="addClient">
      <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Jane Doe"
          aria-label="Full name"
          v-model="name"
        >
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="jane@example.com"
          aria-label="email"
          v-model="email"
        >
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Phone"
          aria-label="phone"
          v-model="phone"
        >
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >Add
        </button>
      </div>
    </form>
    <form action="" class="w-full bg-white rounded px-3 mb-2 shadow-2xl border-b-2 border-teal-500">
      <input type="text"
             class="appearance-none border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mb-2"
             placeholder="Search" v-model="searchClients">
    </form>
    <div class="table w-full py-2 shadow-2xl rounded bg-white text-center">
      <div class="table-row flex p-4 rounded">
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-md-center flex" title="Double click to edit">Name
        </div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex">Email</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex">Phone</div>
        <!--<div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex">Invite</div>-->
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex">Actions</div>
      </div>
      <div
        class="table-row flex p-4 border border-black"
        v-for="(client, index) in clients"
        :key="client.id"
        :id="client.id"
      >
        <div class="bg-white">
          <div
            class="bg-white text-gray-700 px-4 py-2 text-md-center text-center"
            v-if="!client.editing"
            @dblclick="edit(index)"
          >{{ client.name}}
          </div>
          <input
            v-else
            class="appearance-none text-center table-cell border-none bg-white text-gray-700 px-4 py-2 text-sm leading-tight focus:outline-none"
            type="text"
            v-model="alteredName"
            @blur="doneEdit(index)"
            @keyup.enter="doneEdit(index)"
            @keyup.esc="cancelEdit(index)"
            v-focus
          >
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ client.email }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex text-center"
        >{{ client.phone }}
        </div>
        <!--<div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex">-->
        <!--<input-->
        <!--type="button"-->
        <!--class="rounded bg-teal-500 p-2 text-white hover:text-black cursor-pointer"-->
        <!--value="Send Invite"-->
        <!--:id="client.id"-->
        <!--&gt;-->
        <!--</div>-->
        <div class="table-cell bg-white text-gray-700 px-2 py-2 text-sm flex w-2/12 text-center">
          <span
            class="cursor-pointer mx-2 text-blue-500 fa fa-edit"
            value="Edit"
            :id="client.id"
            @click="showEdit(client)"
          ></span>
          <span
            class="cursor-pointer mx-2 text-red-500 fa fa-trash"
            :title=" 'Delete ' + client.name"
            :id="client.id"
            @click="deleteClient(client.id, index)"
          >
          </span>
        </div>
      </div>
    </div>
    
    <edit-client v-if="editClient" :name="client.name" :email="client.email" :phone="client.phone"
                 @keyup.esc="cancelEditClient"
    ></edit-client>
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
          <span>Clients {{ props.start }} to {{ props.end }} from <span class="font-bold text-teal-600">{{ props.total 
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
  import EditClientComponent from '../components/EditClientComponent'
  import LanguageComponent from '../components/LanguageComponent'
  import Popup from '@/mixins/Popup'
  import '@fortawesome/fontawesome-free/css/all.min.css'
  import 'vue-ads-pagination/dist/vue-ads-pagination.css'
  import VueAdsPagination, {VueAdsPageButton} from 'vue-ads-pagination';

  import {mapActions, mapGetters} from "vuex";
  
  /* eslint-disable */
  export default {
    name: "clients",
    mixins: [Popup],
    data() {
      return {
        name: "",
        email: "",
        phone: "",
        alteredName: "",
        cachedName: "",
        editClient: false,
        client: {},
        searchClients: '',
        loading: false,
        page: 0,
      };
    },
    created() {
      this.retrieveClients({
        page: this.page,
      }),
      eventBus.$on('doneClientEditing', (payload) => {
        this.editClient = false
        this.client.name = payload.name
        this.client.phone = payload.phone
        this.client.email = payload.email
        this.updateClientModal({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          client_id: this.client.id,
          ssn: null,
        }).then(() => {
          this.popup('Client Updated', 'success', 2000)
        })
      })
    },
    computed: {
      ...mapGetters({
        clients: 'client/clients',
        total: 'client/total'
      })
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      'edit-client': EditClientComponent,
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    watch: {
      searchClients(after, before) {
        this.performSearch()
      }
    },
    methods: {
      ...mapActions('client', {
        retrieveClients: 'retrieveClients',
        updateClient: 'editClient',
        addNew: 'addClient',
        delete: 'deleteClient',
        updateClientModal: 'editClientModal',
        search: 'search'
      }),
      pageChange(page) {
        this.page = page;
      },

      rangeChange() {
        if(this.searchClients != '') {
          this.performSearch()
        } else {
          this.retrieveClients({
            page: this.page,
          })
        }
      },
      performSearch() {
        this.search({
          keywords: this.searchClients,
          page: this.page
        })
      },
      showEdit(client) {
        this.client = client
        this.editClient = true
      },
      addClient() {
        this.addNew({
          name: this.name,
          phone: this.phone,
          email: this.email,
          ssn: null
        }).then(() => {
          this.name = ''
          this.phone = ''
          this.email = ''
          this.popup('Client added', 'success', 2000)
        }).catch(() => {
          this.popup('Something went wrong', 'error', 3000)
        })
      },
      cancelEditClient() {
        this.editClient = false
      },
      edit(index) {
        this.clients[index].editing = true;
        this.cachedName = this.clients[index].name;
        this.alteredName = this.cachedName
      },
      doneEdit(index) {
        this.clients[index].editing = false;
        if (this.alteredName.trim() == "") {
          this.alteredName = this.cachedName
        } else if (this.clients[index].name != this.alteredName) {
          this.clients[index].name = this.alteredName
          this.updateClient({
            name: this.clients[index].name,
            phone: this.clients[index].phone,
            email: this.clients[index].email,
            client_id: this.clients[index].id,
            ssn: null,
            index: index
          }).then(() => {
            this.popup('Client Updated', 'success', 2000)
          })
        }
      },
      cancelEdit(index) {
        this.clients[index].editing = false;
        this.alteredName = this.cachedName
      },

      deleteClient(id, index) {
        this.delete({
          id: id,
          index: index
        }).then(() => {
          this.popup('Client Deleted', 'success', 2000)
        })
      }
    }
  };
</script>

<style scoped>
  table {
    width: 100%;
  }
</style>
