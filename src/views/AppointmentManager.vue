<template>
  <div class="w-full bg-white rounded px-1 py-3">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="activeTab ? active : inactive"
              @click="activateActive">
        Active</span>
      </li>
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="passedTab ? active : inactive"
              @click="activatePassed"
        >Passed</span>
      </li>
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="cancelledTab ? active : inactive"
              @click="activateCancelled"
        >Cancelled</span>
      </li>
    </ul>
    <active-appointments v-if="activeTab"></active-appointments>
    <passed-appointments v-if="passedTab"></passed-appointments>
    <cancelled-appointments v-if="cancelledTab"></cancelled-appointments>
  </div>
</template>
<script>

  import Appointments from './Appointments'
  import PassedAppointment from './PassedAppointments'
  import CancelledAppointments from './CancelledAppointments'

  export default {
    name: "appointment-manager",
    data() {
      return {
        active: 'border-l border-t border-r rounded-t text-gray-700 cursor-not-allowed',
        inactive: 'text-blue-500 hover:text-blue-800',
        activeTab: true,
        passedTab: false,
        cancelledTab: false,
      }
    },
    components: {
      'active-appointments': Appointments,
      'passed-appointments': PassedAppointment,
      'cancelled-appointments': CancelledAppointments
    },
    created() {

    },
    methods: {
      activateActive() {
        this.activeTab = true;
        this.passedTab = false;
        this.cancelledTab = false;
      },
      activatePassed() {
        this.activeTab = false;
        this.passedTab = true;
        this.cancelledTab = false;
      },
      activateCancelled() {
        this.activeTab = false;
        this.passedTab = false;
        this.cancelledTab = true;
      }
    }
  }
</script>