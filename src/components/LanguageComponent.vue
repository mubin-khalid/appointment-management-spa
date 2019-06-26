<template>
  <select
    class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    id="language"
    @change="languageChanged($event)"
  >
    <option value="0">Please Select</option>
    <option v-for="language in languages" :id="language.id" :value="language.id">{{ 
      language.name 
      }}</option>
  </select>
</template>

<script>
  export default {
    name: "LanguageComponent",
    created() {
      this.$store.dispatch('getLanguages')
    },
    computed: {
      languages() {
        return this.$store.getters.getLanguages
      }
    },
    methods: {
      languageChanged: event => {
        eventBus.$emit('languageChanged', { "languageId": event.target.value})
      } 
    }
  }
</script>

<style scoped>

</style>