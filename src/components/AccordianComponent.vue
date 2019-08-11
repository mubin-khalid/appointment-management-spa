<template>
  <div class="bg-white">
    <div class="tab__header">
      <a href="#"
         class="tab__link p-4 block bg-gray-500 hover:bg-gray-700 no-underline text-white border-b-2 border-white flex justify-between"
         @click.prevent="active = !active">
        <strong>{{title}}</strong>
        <span class="down-Arrow" :class="implemented" v-show="!active">&#9660;</span>
        <span class="up-Arrow" :class="implemented" v-show="active">&#9650;</span>
      </a>
    </div>
    <div class="tab__content p-2" v-show="active">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accordion",
    props: [
      'title',
      'implemented'
    ],
    data() {
      return {
        active: false,
      }
    },
  }
</script>

<style scoped>
  ._1 {
    color: #f56565;
  }
  ._2 {
    color: #ed8936;
  }
  ._3 {
    color: #3f9462;
  }
</style>