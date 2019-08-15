export default {
  setLanguages: (state, languages) => state.languages = languages,
  setLanguagesWithTemplates: (state, response) => state.languagesWithTemplates = response,
  setLanguagesWithTemplatesTotal: (state, total) => state.totalLanguagesWithTemplates = total
}