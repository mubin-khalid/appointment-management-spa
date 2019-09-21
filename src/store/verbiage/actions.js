import Request from "../../helper/Request";

export default {
  loadVerbiage(context, payload) {
    return Request({
      method: 'get',
      endpoint: 'verbiage?language_code=' + payload.languageCode
    }).then(response => {
      context.commit('setVerbiage', response)
      context.commit('setLocale', payload.languageCode)
      return (response)
    })
      .catch(error => {
        return (error.methods)
      })
  },
}