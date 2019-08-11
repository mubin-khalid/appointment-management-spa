import Request from "../../helper/Request";

export default {
  loadNotifications: (context, payload) => {
    let all = false
    if (typeof payload.all !== 'undefined' && payload.all == true) {
      all = true
    }
    return Request({
      method: 'get',
      endpoint: 'notifications',
      data: {
        page: payload.page,
        per_page: process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
        all: all
      }
    })
      .then(response => {
        console.log(response.data)
        context.commit('notification', response.data)
        return (response)
      })
      .catch(error => {
        return (error)
      })
  },
}