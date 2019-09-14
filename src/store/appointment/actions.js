import Request from "../../helper/Request";

export default {
  loadAppointments: (context, payload) => {
    let all = false
    if (typeof payload.all !== 'undefined' && payload.all == true) {
      all = true
    }
    return Request({
      method: 'get',
      endpoint: 'appointments?page_number=' + payload.page + 
        '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + 
        '&type=' + payload.type + 
        '&all=' + all
    })
      .then(response => {
        context.commit('appointments', response.data)
        return response
      })
      .catch(error => {
        return error.message
      })
  },


  save(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'appointments',
      data: payload,
      isDataRaw: true,
    }).then(response => {
      context.commit('addAppointment', response.data)
      return response
    }).catch(error => {
      return error.message
    })
  },
  get: (context, payload) => {
    return Request({
      method: 'get',
      endpoint: 'appointment/' + payload.id,
    })
      .then(response => {
        return response
      })
      .catch(error => {
        return error.message
      })

  },
  cancel: (context, payload) => {
    return Request({
      method: 'put',
      endpoint: 'appointment/' + payload.id,
      data: payload,
      isDataRaw: true
    }).then(response => {
      if (typeof payload.index !== 'undefined') {
        context.commit('removeCancelledAppointment', payload.index)
      }
      return response
    })
      .catch(error => {
        return error.message
      })
  },

  suggestTime: (context, payload) => {
    return Request({
      method: 'put',
      endpoint: 'appointment/' + payload.id,
      data: payload,
      isDataRaw: true
    }).then(() => {
      return true
    })
      .catch(() => {
        throw new Error('Processing failed.')
      })
  },
  sendReminder: (context, payload) => {
    return Request({
      method: 'post',
      endpoint: 'push-notification',
      data: payload,
      isDataRaw: true
    }).then(() => {
      return true
    })
      .catch(() => {
        throw new Error('Processing failed.')
      })
  },
}