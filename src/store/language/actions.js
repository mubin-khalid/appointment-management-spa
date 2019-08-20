import Request from "../../helper/Request";

export default {

  getLanguages: context => {
    return Request({
      method: 'get',
      endpoint: 'languages'
    }).then(response => {
      console.log(response)
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