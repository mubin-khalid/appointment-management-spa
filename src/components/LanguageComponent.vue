<template>
  <select
    class="block appearance-none w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    id="language"
    @change="languageChanged($event)"
    v-model="languageIndex"
  >
    <option value="0" disabled>Please Select</option>
    <option v-for="language in languages" :key="language.id" :id="language.id" :value="language.id">{{
      language.language
      }}
    </option>
  </select>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "LanguageComponent",
    data() {
      return {
        languageIndex: 0
      }
    },
    created() {
      eventBus.$on('resetLanguageComponent', () => {
        this.languageIndex = 0
      })
      this.getLanguages()
    },
    computed: {
      ...mapGetters('language', {
        languages: 'getLanguages'
      }),
    },
    methods: {
      ...mapActions('language', [
        'getLanguages'
      ]),
      languageChanged: event => {
        eventBus.$emit('languageChanged', {"languageId": event.target.value})
      }
    }
  }
</script>

<style scoped>

</style>