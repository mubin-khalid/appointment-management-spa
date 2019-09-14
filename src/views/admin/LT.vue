<template>
  <div class="w-full bg-white rounded px-1 py-3">
    <ul class="flex border-b">
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="languageTab ? active : inactive"
              @click="activateLanguages">
        Languages</span>
      </li>
      <li class="-mb-px mr-1">
        <span class="bg-white inline-block py-2 px-4 font-semibold cursor-pointer"
              :class="templateTab ? active : inactive"
              @click="activateTemplates"
        >Templates</span>
      </li>
    </ul>
    <language v-if="languageTab"></language>
    <templates v-if="templateTab"></templates>
  </div>
</template>
<script>
  import Templates from './Templates'
  import Language from './Language'

  export default {
    name: "lt",
    data() {
      return {
        active: 'border-l border-t border-r rounded-t text-gray-700 cursor-not-allowed',
        inactive: 'text-blue-500 hover:text-blue-800',
        languageTab: true,
        templateTab: false,
      }
    },
    components: {
      'templates': Templates,
      'language': Language
    },
    created() {

    },
    methods: {
      activateLanguages() {
        this.languageTab = true;
        this.templateTab = false;
      },
      activateTemplates() {
        this.languageTab = false;
        this.templateTab = true;
      }
    }
  }
</script>