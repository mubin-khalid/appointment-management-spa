<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('dismiss')">
        <div class="modal-container " :class="[width, height]" @click.stop="">

          <div class="modal-header">
            <slot name="header">
              Your appointment has been booked.
            </slot>
          </div>

          <div class="modal-body">
            <span class="circle mt-10">
              <div class="circle-with-text multi-line-text">
                <slot name="number"></slot>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "BookingConfirmation",
    props: {
      width: {
        type: String
      },
      height: {
        default: 'h-32',
        type: String
      },
      buttonText: {
        default: 'OK',
        type: String
      }
    }
  }
</script>

<style scoped>
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

  .modal-container {
    /*width: 300px;*/
    margin: 0px auto;
    padding: 20px 30px;
    background-image: linear-gradient(rgba(126, 213, 111, 0.8), rgba(40, 180, 133, 0.8));
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .circle {
    /*position: absolute;*/
    /*padding-top: 5%;*/
    /*padding-left: 8%;*/
    display: flex;
    margin-left: 30%;
  }

  .circle-with-text {
    background: rgba(0, 0, 0, .1);
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    text-align: center;
    /*margin: 5px 20px;*/
    font-size: 35px;
    /*padding: 15px;*/
    display: flex;
    height: 180px;
    width: 180px;
    color: #fff;
  }
  .multi-line-text {
    font-size: 20px;
  }

  .modal-header {
    font-family: 'Lato', sans-serif;
    font-size: 30px;
    font-weight: 400;
    color: white;
    text-align: center;
    padding-top: 20px;
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