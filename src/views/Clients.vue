<template>
  <div id="patients" class="m-auto">
    <form class="w-full bg-white rounded px-3 mb-2" @submit.prevent="addPatient">
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
             class="appearance-none border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none mb-2" placeholder="Search" v-model="searchClients">
    </form>
    <div class="table w-full py-2 shadow-2xl rounded bg-white">
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
        v-for="(patient, index) in patients"
        :key="patient.id"
        :id="patient.id"
      >
        <div class="bg-white">
          <div
            class="table-cell bg-white text-gray-700 px-4 py-2 text-md-center"
            v-if="!patient.editing"
            @dblclick="edit(index)"
          >{{ patient.name}}
          </div>
          <input
            v-else
            class="appearance-none table-cell border-none bg-white text-gray-700 px-4 py-2 text-sm leading-tight focus:outline-none"
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
        >{{ patient.email }}
        </div>
        <div
          class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex"
        >{{ patient.phone }}
        </div>
        <!--<div class="table-cell bg-white text-gray-700 px-4 py-2 text-sm flex">-->
          <!--<input-->
            <!--type="button"-->
            <!--class="rounded bg-teal-500 p-2 text-white hover:text-black cursor-pointer"-->
            <!--value="Send Invite"-->
            <!--:id="patient.id"-->
          <!--&gt;-->
        <!--</div>-->
        <div class="table-cell bg-white text-gray-700 px-2 py-2 text-sm flex w-2/12">
          <input
            type="button"
            class="rounded bg-blue-500 p-2 text-white hover:text-black cursor-pointer mx-2"
            value="Edit"
            :id="patient.id"
            @click="showEdit(patient)"
          >
          <span
            class="cursor-pointer mx-2"
            :title=" 'Delete ' + patient.name"
            :id="patient.id"
            @click="deletePatient(patient.id, index)"
          >
            &times;
          </span>
        </div>
      </div>
    </div>
    <edit-patient v-if="editPatient" :name="patient.name" :email="patient.email" :phone="patient.phone"
                  @keyup.esc="cancelEditPatient"
    ></edit-patient>
  </div>
</template>

<script>
  import EditPatient from '../components/EditPatientComponent'
  import Popup from '@/mixins/Popup'
  /* eslint-disable */
  export default {
    name: "patients",
    mixins: [Popup],
    data() {
      return {
        name: "",
        email: "",
        phone: "",
        alteredName: "",
        cachedName: "",
        editPatient: false,
        patient: {},
        searchClients: '',
      };
    },
    components: {
      'edit-patient': EditPatient,
    },
    created() {
      this.$store.dispatch("retrievePatients");
      eventBus.$on('donePatientEditing', (payload) => {
        this.editPatient = false
        this.patient.name = payload.name
        this.patient.phone = payload.phone
        this.patient.email = payload.email
        this.$store.dispatch('editPatient', {
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          patient_id: this.patient.id,
          ssn: null,
        }).then(() => {
          this.popup('Patient Updated', 'success', 2000)
        })
      })
    },
    computed: {
      patients() {
        return this.$store.getters.patients;
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus();
        }
      }
    },
    methods: {
      showEdit(patient) {
        this.patient = patient
        this.editPatient = true
      },
      addPatient() {
        this.$store.dispatch('addPatient', {
          name: this.name,
          phone: this.phone,
          email: this.email,
          ssn: null
        }).then(() => {
          this.name = ''
          this.phone = ''
          this.email = ''
          this.popup('Patient added', 'success', 2000)
        }).catch(() => {
          this.popup('Something went wrong', 'error', 3000)
        })
      },
      cancelEditPatient() {
        this.editPatient = false
      },
      edit(index) {
        this.patients[index].editing = true;
        this.cachedName = this.patients[index].name;
        this.alteredName = this.cachedName
      },
      doneEdit(index) {
        this.patients[index].editing = false;
        if (this.alteredName.trim() == "") {
          this.alteredName = this.cachedName
        }
        else if (this.patients[index].name != this.alteredName) {
          this.patients[index].name = this.alteredName
          this.$store.dispatch('editPatient', {
            name: this.patients[index].name,
            phone: this.patients[index].phone,
            email: this.patients[index].email,
            patient_id: this.patients[index].id,
            ssn: null,
            index: index
          }).then(() => {
            this.popup('Patient Updated', 'success', 2000)
          })
        }
      },
      cancelEdit(index) {
        this.patients[index].editing = false;
        this.alteredName = this.cachedName
      },

      deletePatient(id, index) {
        this.$store.dispatch('deletePatient', {
          id: id,
          index: index
        }).then( () => {
          this.popup('Patient Deleted', 'success', 2000)
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
