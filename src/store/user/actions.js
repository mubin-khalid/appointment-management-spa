import Request from "../../helper/Request";

export default {
  loadUsers: (context, payload) => {
    return Request({
      method: 'get',
      endpoint: 'users',
      data: {
        page_number: payload.page,
        per_page: process.env.VUE_APP_APPOINTMENTS_PER_PAGE,
      },
      isDataRaw: true
    }).then(response => {
      context.commit('setUsers', response.data)
      return (response)
    })
      .catch(error => {
        console.log(error.message)
      })
  },
  deleteUser(context, payload) {
    return Request({
      method: 'delete',
      endpoint: 'users/' + payload.id,
    }).then(response => {

      context.commit('deleteUser', payload.index)
      return (response)
    })
      .catch(error => {
        console.log(error.message)
      })
  },
  addUser(context, payload) {
    return Request({
      method: 'post',
      endpoint: 'users',
      data: payload,
      isDataRaw: true
    }).then(response => {
      context.commit('addUser', response.data)
      return (response)
    })
      .catch(error => {
        console.log(error.methods)
      })
  },
}