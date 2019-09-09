export default {
  setLanguages: (state, languages) => state.languages = languages,
  setPaginatedLanguages: (state, paginatedLanguages) => state.paginatedLanguages = paginatedLanguages,
  setLanguagesWithTemplates: (state, response) => state.languagesWithTemplates = response,
  setLanguagesWithTemplatesTotal: (state, total) => state.totalLanguagesWithTemplates = total,
  updateLanguage(state, languageData) {
    state.paginatedLanguages[languageData.index].language = languageData.language
    state.paginatedLanguages[languageData.index].language_code = languageData.language_code
  },
  addLanguage: (state, language) => state.paginatedLanguages.push(language),
  deleteLanguage(state, index) {
    state.paginatedLanguages.splice(index, 1)
  },

  updateTemplate(state, payload) {
    state.languagesWithTemplates[payload.languageIndex].templates[payload.templateIndex].template = payload.template
  },
  deleteTemplate(state, payload) {
    state.languagesWithTemplates[payload.languageIndex].templates.splice(payload.templateIndex, 1);
    state.languagesWithTemplates[payload.languageIndex].language.implemented -= 1
  }
}