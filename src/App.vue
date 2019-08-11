<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>

  </div>
</template>

<script>
  import "./assets/css/main.css";

  const defaultLayout = 'default'
  export default {
    name: "app",
    computed: {
      layout() {
        return (this.$route.meta.layout || defaultLayout) + '-layout'
      }
    }
  };
</script>

