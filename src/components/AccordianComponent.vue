<template>
  <div class="accordion" v-bind:class="theme">
    <div class="header" v-on:click="toggle">
      <slot name="header">Language</slot>
      <i class="fa fa-2x fa-angle-down header-icon" v-bind:class="{ rotate: show }"></i>
    </div>
    <transition name="accordion"
                v-on:before-enter="beforeEnter" v-on:enter="enter"
                v-on:before-leave="beforeLeave" v-on:leave="leave">
      <div class="body" v-show="show">
        <div class="body-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "accordion",
    props: [
      'theme'
    ],
    data() {
      return {
        show: false,
      }
    },
    methods: {
      toggle: function() {
        this.show = !this.show;
      },
      toggleSwitch(event) {
        console.log(event)
      },
      // enter: function(el, done) {
      //   $(el).slideDown(150, done);
      // },
      // leave: function(el, done) {
      //   $(el).slideUp(150, done);
      // },
      beforeEnter: function(el) {
        el.style.height = '0';
      },
      enter: function(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      beforeLeave: function(el) {
        el.style.height = el.scrollHeight + 'px';
      },
      leave: function(el) {
        el.style.height = '0';
      }
    }
  }
</script>

<style scoped>
  .accordion._1, .accordion._0 {
    background-color: #f36b6b;
  }
  .accordion._1 .body, .accordion._0 .body {
    border-color: #f36b6b;
  }
  .accordion._2 {
    background-color: #ffbb83;
  }
  .accordion._2 .body {
    border-color: #ffbb83;
  }
  .accordion._3 {
    background-color: #3f9462;
  }
  .accordion._3 .body {
    border-color: #3f9462;
  }

  .accordion {
    font-family: Lato;
    margin-bottom: 20px;
    box-shadow: 2px 2px 2px 2px #cccccc;
    background-color: #3182ce;
    border-radius: 6px;
  }

  .accordion .header {
    height: 40px;
    line-height: 40px;
    padding: 0 40px 0 8px;
    position: relative;
    color: #fff;
    cursor: pointer;
  }

  .accordion .header-icon {
    position: absolute;
    top: 5px;
    right: 8px;
    transform: rotate(0deg);
    transition-duration: 0.3s;
  }

  .accordion .body {
    /*   display: none; */
    overflow: hidden;
    background-color: #fff;
    border: 2px solid #3182ce;
    border-top: 0;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: 150ms ease-out;
  }

  .accordion .body-inner {
    padding: 8px;
    overflow-wrap: break-word;
    /*   white-space: pre-wrap; */
  }

  .accordion .header-icon.rotate {
    transform: rotate(180deg);
    transition-duration: 0.3s;
  }

  .accordion.purple {
    background-color: #8c618d;
  }

  .accordion.purple .body {
    border-color: #8c618d;
  }
</style>