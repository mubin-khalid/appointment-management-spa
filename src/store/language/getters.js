export default {
  getLanguages: state => {
    return state.languages
  },
  getLanguagesWithTemplates: state => {
    return state.languagesWithTemplates
  },
  totalLanguagesWithTemplates: state => {
    return state.totalLanguagesWithTemplates
  }
}