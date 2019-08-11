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
  
  languageWithTemplates(context, payload) {
    
  }
  
}