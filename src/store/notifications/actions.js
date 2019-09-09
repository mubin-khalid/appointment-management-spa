import Request from "../../helper/Request";

export default {
  loadNotifications: (context, payload) => {
    let all = false
    if (typeof payload.all !== 'undefined' && payload.all == true) {
      all = true
    }
    return Request({
      method: 'get',
      endpoint: 'notifications?page=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + '&all=' + all
    })
      .then(response => {
        context.commit('notification', response.data)
        return (response)
      })
      .catch(error => {
        return (error)
      })
  },
  
  getUserSettings: (context) => {
    // if (typeof payload.all !== 'undefined' && payload.all == true) {
    //   all = true
    // }
    return Request({
      method: 'get',
      endpoint: 'notification-settings'
    })
      .then(response => {
        context.commit('notificationSettings', response.data)
      })
      .catch(error => {
        return (error)
      })
  },

  updateSmsSettings:(context, payload) => {
    return Request({
      method: 'put',
      endpoint: 'notification-settings',
      data: payload,
      isDataRaw: true
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return (error)
      })
  }
}