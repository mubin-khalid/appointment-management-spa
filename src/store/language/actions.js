import Request from "../../helper/Request";

export default {

  getLanguages: (context, payload) => {
    return Request({
      method: 'get',
      endpoint: 'languages',
      data: payload,
      isDataRaw: true,
    }).then(response => {
      let filtered = response.data.languages.filter(function (el) {
        return el.active == true
      })
      context.commit('setLanguages', filtered)
      return (response)
    })
      .catch(error => {
        return (error)
      })
  },
  addLanguage(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'languages',
      data: payload,
      isDataRaw: true
    }).then(response => {
      context.commit('addLanguage', response.data.language)
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },
  updateLanguage(context, payload){
    return Request({
      method: 'put',
      endpoint: 'languages/' + payload.id,
      data: payload,
      isDataRaw: true
    }).then(response => {
      context.commit('updateLanguage', {
        language: payload.language,
        language_code: payload.language_code,
        index: payload.index
      })
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },
  deleteLanguage(context, payload) {
    return Request({
      method: 'delete',
      endpoint: 'languages/' + payload.id,
      isDataRaw: true
    }).then(response => {
      context.commit('deleteLanguage', payload.index)
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },
  editTemplate(context, payload){
    return Request({
      method: 'put',
      endpoint: 'template/' + payload.id,
      data: payload,
      isDataRaw: true
    }).then(response => {
      context.commit('updateTemplate', payload)
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },
  deleteTemplate(context, payload) {
    return Request({
      method: 'delete',
      endpoint: 'template/' + payload.languageId + '/' + payload.id,
      isDataRaw: true
    }).then(response => {
      context.commit('deleteTemplate', payload)
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },

  addTemplate: (context, payload) => {
    return Request({
      method: 'post',
      endpoint: 'add-template',
      data: payload,
      isDataRaw: true
    }).then(response => {
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  },
  
  getLanguagesPaginated: (context, payload) => {
    return Request({
      method: 'get',
      endpoint: 'languages?' + 'per_page=' + payload.per_page + '&page=' + payload.page
    }).then(response => {
      context.commit('setPaginatedLanguages', response.data.languages)
      context.commit('setTotalPaginatedLanguages', response.data.total)
    })
      .catch(error => {
        return (error)
      })
  },
  getTemplate: (context, payload) => {
    return Request({
      method: 'post',
      endpoint: 'template',
      data: payload,
      isDataRaw: true
    }).then(response => {

      return (response.data.template)
    })
      .catch(error => {
        return (error)
      })
  },
  
  loadLanguageWithTemplates(context, payload) {
    return Request({
      method: 'get',
      endpoint: 'languages-with-templates?page_number=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
    }).then(response => {
      context.commit('setLanguagesWithTemplatesTotal', response.data.total)
      delete response.data.total
      context.commit('setLanguagesWithTemplates', response.data)
      return (response.data)
    })
      .catch(error => {
        return (error)
      })
  }
  
  
  
}