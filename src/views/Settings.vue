<template>
  <div>
    <p>settings</p>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <modal v-if="showModal">
      <h3 slot="header">Settings</h3>
      <p slot="body">Body goes here</p>
      <p class="text-sm" slot="footer">footer note
        <button class="modal-default-button" @click="close">
          OK
        </button></p>
    </modal>
  </div>
</template>

<script>
  import ModalComponent from '../components/EditPatient'

  export default {
    name: "Settings",
    components: {
      'modal': ModalComponent,
    },
    data(){
      return {
        showModal: false
      }
    },
    methods: {
      close() {
          this.showModal = false
      }
    }
  }
</script>

<style scoped>

</style>
