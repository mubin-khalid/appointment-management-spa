<template>
  <div class="w-full">
    <h2 class="bg-white mb-2 px-5 rounded text-2xl text-teal-700">Users</h2>
    <form class="w-full bg-white rounded px-3 mb-2" @submit.prevent="addUser">
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
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Password"
          aria-label="password"
          v-model="password"
        >
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Facility"
          aria-label="facility"
          v-model="facility"
        >
        <input type="checkbox" title="Licensed Client" aria-label="facility" class="mr-8" v-model="licensed">
        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >Add
        </button>
      </div>
      {{licensed}}
    </form>
    <div class="table w-full py-2 shadow-2xl rounded bg-white">
      <div class="table-row flex p-4 rounded text-center">
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-md-center flex font-bold">Name</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Email</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Phone</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Facility</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Licensed Client</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Actions</div>
      </div>
      <div
        class="table-row flex p-4 border border-black text-center"
        v-for="(user, index) in users"
        :key="user.id"
        :id="user.id"
      >
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ user.name }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ user.email }}
        </div>

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ user.phone }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ user.facility }}
        </div>

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >No
        </div>

        <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex rounded">
          <input
            type="button"
            class="rounded bg-red-600 p-2 text-white hover:text-black cursor-pointer mx-2"
            value="Delete"
            :id="user.id" style="border-radius: 0.25rem;"
            @click="deleteUser(user, index)"
          >
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

  export default {
    name: "manage-users",
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
        licensed: false
      }
    },
    created() {
      //this.loadUsers({page: this.page})
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
    },
    computed: {
      ...mapGetters('user', [
        'users',
        'total'
      ])
    },
    methods: {
      ...mapActions('user', {
        getUsers: 'loadUsers',
        add: 'addUser',
        delete: 'deleteUser'
      }),
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
          licensed: this.licensed,
        }).then( () =>  {
          this.popup('User: ' + this.name + ' added.', 'success', 2000)
          this.name = this.password = this.email = this.phone = this.facility = ''
        }).catch( () => {
          this.popup('Unable to add user.', 'error', 2000)
        })
      },
// eslint-disable-next-line no-unused-vars
      rangeChange(_, __) {
        this.getUsers({
          page: this.page
        })
      },
    },
  }
</script>

<style scoped>
  button {
    border-radius: 3px !important;
  }
</style>
