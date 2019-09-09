<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="bg-white m-auto px-8 py-8 rounded shadow-2xl w-4/12">

            <div class="modal-header">
              <input type="text" v-model="updatedName" id="name" 
                     class="border leading-tight p-2 rounded text-grey-700 w-2/3">
            </div>

            <div class="modal-body">
              <input type="text" v-model="updatedEmail" id="email"
                     class="border leading-tight p-2 rounded text-grey-700 w-2/3">
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <input type="text" v-model="updatedPhone" id="phone"
                       class="border leading-tight p-2 rounded text-grey-700 w-2/3">
                <button class="bg-blue-600 float-right leading-loose px-3 py-1 rounded text-white" @click="close"
                @keyup.enter="close"
                >
                  Save
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "edit-client",
    props: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        updatedName : this.name,
        updatedEmail: this.email,
        updatedPhone: this.phone
      }
    },
    methods: {
      close() {
        eventBus.$emit('doneClientEditing', {
          name: this.updatedName,
          email: this.updatedEmail,
          phone: this.updatedPhone
        })
      }
    }
  }
</script>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>