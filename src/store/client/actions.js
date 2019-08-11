import Request from "../../helper/Request";

export default {
  retrieveClients(context, payload) {
    let all = false
    if (typeof payload.all !== 'undefined' && payload.all == true) {
      all = true
    }
    return Request({
      'method': 'get',
      endpoint: 'client?page_number=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE + '&all=' + all
    }).then(response => {
      if (response.data) {
        let tempClients = response.data.clients
        let client = []
        for (let key in tempClients) {
          if (tempClients.hasOwnProperty(key)) {
            tempClients[key].editing = false
            client.push(tempClients[key])
          }
        }
        context.commit('retrieveClients', client)
        context.commit('totalClients', response.data.total)
        return response.data
      }
    })
  },

  addClient(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'client',
      data: payload,
      isDataRaw: true
    }).then(response => {
      let client = response.data
      client.editing = false
      context.commit('addClient', client)
      return response.data
    })
      .catch(error => {
        console.log(error.methods)
      })
  },
  editClient(context, payload) {
    return Request({
      method: 'put',
      data: payload,
      endpoint: 'client/' + payload.client_id,
      isDataRaw: true
    }).then(response => {
      context.commit('editClient', {
        index: payload.index,
        name: payload.name
      })
      return response.data
    })
  },
  editClientModal(context, payload) {
    return Request({
      method: 'put',
      data: payload,
      endpoint: 'client/' + payload.client_id,
      isDataRaw: true
    }).then(response => {
      return response.data
    })
  },
  deleteClient(context, payload) {
    return Request({
      method: 'delete',
      endpoint: 'client/' + payload.id
    }).then(response => {

      context.commit('deleteClient', payload.index)
      return response.data
    })
      .catch(error => {
        return error.message
      })
  },
  search(context, payload) {
    return Request({
      'method': 'get',
      endpoint: 'client?query=' + payload.keywords + '&page_number=' + payload.page + '&per_page=' + process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
    }).then(response => {
      if (response.data) {
        let tempClients = response.data.clients
        let client = []
        for (let key in tempClients) {
          if (tempClients.hasOwnProperty(key)) {
            tempClients[key].editing = false
            client.push(tempClients[key])
          }
        }
        context.commit('retrieveClients', client)
        context.commit('totalClients', response.data.total)
        return response.data
      }
    })
  },
}