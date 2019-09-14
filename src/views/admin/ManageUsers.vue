<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
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
        <span class="font-hairline text-gray-700 mr-2">
          Licensed
        </span>
        <input type="checkbox" title="Licensed Client" aria-label="facility" class="mr-8" v-model="licensed">

        <span class="font-hairline text-gray-700 mr-2">
          Admin
        </span>
        <input type="checkbox" title="Admin" aria-label="Admin" class="mr-8" v-model="isAdmin">


        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >Add
        </button>
      </div>
    </form>
    <div class="table w-full py-2 shadow-2xl rounded bg-white">
      <div class="table-row flex p-4 rounded text-center">
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-md-center flex font-bold">Name</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Email</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Phone</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Facility</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Licensed Client</div>
        <div class="table-cell bg-white text-gray-700 px-4 py-4 text-sm flex font-bold">Admin</div>
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
        > {{user.licensed ? 'Yes': 'No'}}
        </div>

        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        > {{user.is_admin ? 'Yes': 'No'}}
        </div>

        <div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex rounded">
          <span class="fa fa-edit content-center text-center text-blue-500 mr-3 cursor-pointer"
                @click="editUser(index)"
          ></span>
          <span class="fa fa-trash content-center text-center text-red-600 ml-3 cursor-pointer"
                :id="user.id"
                @click="deleteUser(user, index)"
          ></span>
        </div>
      </div>
    </div>

    <modal v-if="showEditUserModal" width="w-1/3" height="h-auto"
           @close="updateUser"
           @dismiss="showEditUserModal = false"
    >
      <div slot="header"><span class="font-bold text-gray-700 text-sm">Edit Customer</span></div>
      <div slot="body">
        <input type="text"
               class="outline-none focus:outline-none bg-gray-300 rounded appearance-none p-2 w-full text-gray-700 mb-2"
               v-model="editedUser.name">
        <input type="text"
               class="outline-none focus:outline-none bg-gray-300 rounded appearance-none p-2 w-full text-gray-700 mb-2"
               v-model="editedUser.email">
        <input type="text"
               class="outline-none focus:outline-none bg-gray-300 rounded appearance-none p-2 w-full text-gray-700 mb-2"
               v-model="editedUser.phone">
        <input type="text"
               class="outline-none focus:outline-none bg-gray-300 rounded appearance-none p-2 w-full text-gray-700 mb-2"
               v-model="editedUser.facility">
        
        <div class="w-full flex justify-center">
          <div class="w-1/3">
            <span class="text-gray-700 font-light uppercase mr-3">admin</span>
            <input type="checkbox" name="admin" v-model="editedUser.admin">
          </div>
          <div class="w-1/3">
            <span class="text-gray-700 font-light uppercase mr-3">licensed</span>
            <input type="checkbox" name="admin" v-model="editedUser.licensed">
          </div>
        </div>
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
  import VueElementLoading from 'vue-element-loading'
  import {mapActions, mapGetters} from "vuex";
  import ModalComponent from '@/components/ModalComponent'

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
        licensed: false,
        isAdmin: false,
        show: false,
        showEditUserModal: false,
        currentUserIndex: null,
        cacheUser: {
          id: null,
          name: null,
          email: null,
          phone: null,
          facility: null,
          admin: false,
          licensed: false
        },
        editedUser: {
          id: null,
          name: null,
          email: null,
          phone: null,
          facility: null,
          admin: false,
          licensed: false
        }
      }
    },
    created() {
      //this.loadUsers({page: this.page})
    },
    components: {
      VueAdsPagination,
      VueAdsPageButton,
      VueElementLoading,
      'modal': ModalComponent,
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
        update: 'updateUser',
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
        }).catch((error) => {
          this.show = false
          this.popup(error.message, 'error', 2000)
        })
      },
      addUser() {
        this.show = true
        this.add({
          name: this.name,
          password: this.password,
          email: this.email,
          phone: this.phone,
          facility: this.facility,
          licensed: this.licensed ? 1 : 0,
          is_admin: this.isAdmin ? 1 : 0,
        }).then(() => {
          this.popup('User: ' + this.name + ' added.', 'success', 2000)
          this.name = this.password = this.email = this.phone = this.facility = ''
          this.licensed = this.isAdmin = false
          this.show = false
        }).catch((error) => {
          this.show = false
          this.popup(error.message, 'error', 2000)
        })
      },
      rangeChange() {
        this.getUsers({
          page: this.page
        })
      },
      editUser(index) {
        this.showEditUserModal = true
        this.currentUserIndex = index
        
        this.cacheUser.id = this.users[index].id
        this.cacheUser.name = this.users[index].name
        this.cacheUser.email = this.users[index].email
        this.cacheUser.phone = this.users[index].phone
        this.cacheUser.facility = this.users[index].facility
        this.cacheUser.admin = this.users[index].is_admin
        this.cacheUser.licensed = this.users[index].licensed
        
        this.editedUser.id = this.users[index].id
        this.editedUser.name = this.users[index].name
        this.editedUser.email = this.users[index].email
        this.editedUser.phone = this.users[index].phone
        this.editedUser.facility = this.users[index].facility
        this.editedUser.admin = this.users[index].is_admin
        this.editedUser.licensed = this.users[index].licensed
      },
      updateUser() {
        this.showEditUserModal = false
        if(JSON.stringify(this.editedUser) != JSON.stringify(this.cacheUser)) {
          this.update({
            type: 'updateUser',
            index: this.currentUserIndex,
            user: this.editedUser
          })
        }
      }
    },
  }
</script>

<style scoped>
  button {
    border-radius: 3px !important;
  }
</style>
