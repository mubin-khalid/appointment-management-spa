export default {
  getLanguages: state => {
    return state.languages
  },
  getLanguagesWithTemplates: state => {
    return state.languagesWithTemplates
  },
  totalLanguagesWithTemplates: state => {
    return state.totalLanguagesWithTemplates
  },
  getPaginatedLanguages: state => {
    return state.paginatedLanguages
  },
  getPaginatedLanguagesCount: state => {
    return state.paginatedLanguagesTotal
  }
}