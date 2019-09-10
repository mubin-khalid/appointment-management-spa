import Request from "../../helper/Request";

export default {
  getTranslationAgencies(context, payload) {
    let all = false
    if (typeof payload.all !== 'undefined' && payload.all == true) {
      all = true
    }

    return Request({
      method: 'get',
      endpoint: 'ta?page_number=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + '&all=' + all
    }).then(response => {
      context.commit('ta', response.data)
      return (response)
    })
      .catch(error => {
        return (error.methods)
      })
  },

  store(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'ta',
      data: payload,
      isDataRaw: true
    }).then((response) => {
      context.commit('addTa', response.data)
      return response.data
    })
  }
}