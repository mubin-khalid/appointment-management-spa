<template>
  <div class="w-full">
    <vue-element-loading :active="show" spinner="ring" is-full-screen color="#38b2ac"/>
    <form class="w-full px-3 mb-2" @submit.prevent="addUser">
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
        <input
          class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Facility Address"
          aria-label="facility"
          v-model="facility_address"
        >
        <span class="font-hairline text-gray-700 mr-2">
          {{verbiage.licensed}}
        </span>
        <input type="checkbox" title="Licensed Client" aria-label="facility" class="mr-8" v-model="licensed">

        <span class="font-hairline text-gray-700 mr-2">
          {{verbiage.admin}}
        </span>
        <input type="checkbox" title="Admin" aria-label="Admin" class="mr-8" v-model="isAdmin">


        <button
          class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >{{verbiage.add}}
        </button>
      </div>
    </form>
    <div class="table w-full border-blue-800 border-t-4 rounded shadow-2xl">
      <div class="table-row bg-teal-600 font-bold text-center text-lg text-white">
        <div class="table-cell p-4">{{verbiage.name}}</div>
        <div class="table-cell p-4">{{verbiage.email}}</div>
        <div class="table-cell p-4">{{verbiage.phone}}</div>
        <div class="table-cell p-4">{{verbiage.facility}}</div>
        <div class="table-cell p-4">{{verbiage.facility}} {{verbiage.address}}</div>
        <div class="table-cell p-4">{{verbiage.licensed}}</div>
        <div class="table-cell p-4">{{verbiage.admin}}</div>
        <div class="table-cell p-4">{{verbiage.actions}}</div>
      </div>
      <div
        class="table-row p-4 text-center text-sm text-gray-700"
        v-for="(user, index) in users"
        :key="user.id"
        :id="user.id"
      >
        <div
          class="table-cell px-4 py-2"
        >{{ user.name }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ user.email }}
        </div>

        <div
          class="table-cell px-4 py-2"
        >{{ user.phone }}
        </div>
        <div
          class="table-cell px-4 py-2"
        >{{ user.facility }}
        </div>

        <div
          class="table-cell px-4 py-2"
        >{{ user.facility_address }}
        </div>

        <div
          class="table-cell px-4 py-2"
        > 
          <span class="fa"
                :class="{'fa-check-circle text-teal-600': (user.licensed == '1'),
               'fa-times-circle text-red-700': (user.licensed != '1')
               }
          
        ">
        </span>
        </div>

        <div
          class="table-cell px-4 py-2"
        > <span class="fa"
                :class="{'fa-check-circle text-teal-600': (user.is_admin == '1'),
               'fa-times-circle text-red-700': (user.is_admin != '1')
               }
          
        ">
        </span>
        </div>

        <div class="table-cell px-4 py-2">
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
        <input type="text"
               class="outline-none focus:outline-none bg-gray-300 rounded appearance-none p-2 w-full text-gray-700 mb-2"
               v-model="editedUser.facility_address">

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
        facility_address: '',
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
          facility_address: null,
          admin: false,
          licensed: false
        },
        editedUser: {
          id: null,
          name: null,
          email: null,
          phone: null,
          facility: null,
          facility_address: null,
          admin: false,
          licensed: false
        }
      }
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
      ]),
      ...mapGetters('verbiage', {
        verbiage: 'verbiage'
      }),
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
        this.show = true
        this.delete({
          id: user.id,
          index: index
        }).then(() => {
          this.show = false
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
          facility_address: this.facility_address,
          licensed: this.licensed ? 1 : 0,
          is_admin: this.isAdmin ? 1 : 0,
        }).then(() => {
          this.popup('User: ' + this.name + ' added.', 'success', 2000)
          this.name = this.password = this.email = this.phone = this.facility = this.facility_address = ''
          this.licensed = this.isAdmin = false
          this.show = false
        }).catch((error) => {
          this.show = false
          Object.keys(error.response.data.errors).forEach((key) => {
           this.popup(error.response.data.errors[key][0], 'error', 3000)
           return
          })
          //this.popup(error.message, 'error', 2000)
        })
      },
      rangeChange() {
        this.show = true
        this.loading = true
        this.getUsers({
          page: this.page
        }).then(() => {
          this.show = false
          this.loading = false
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
        this.cacheUser.facility_address = this.users[index].facility_address
        this.cacheUser.admin = this.users[index].is_admin
        this.cacheUser.licensed = this.users[index].licensed

        this.editedUser.id = this.users[index].id
        this.editedUser.name = this.users[index].name
        this.editedUser.email = this.users[index].email
        this.editedUser.phone = this.users[index].phone
        this.editedUser.facility = this.users[index].facility
        this.editedUser.facility_address = this.users[index].facility_address
        this.editedUser.admin = this.users[index].is_admin
        this.editedUser.licensed = this.users[index].licensed
      },
      updateUser() {
        this.showEditUserModal = false
        this.show = true
        if (JSON.stringify(this.editedUser) != JSON.stringify(this.cacheUser)) {
          this.update({
            type: 'updateUser',
            index: this.currentUserIndex,
            user: this.editedUser
          }).then(() => {
            this.show = false
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
