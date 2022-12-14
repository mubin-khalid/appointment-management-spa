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
      .catch(() => {
        throw new Error()
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
        return (error.message)
      })
  },
  updatePassword(context, payload) {
    return Request({
      method: 'put',
      endpoint: 'users/' + payload.id,
      data: payload,
      isDataRaw: true
    }).then(response => {
      if (response.status == 'success') {
        return response
      }
      throw new Error()
    })
      .catch(() => {
        throw new Error('Old password not correct')
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
      .catch((error) => {
        return Promise.reject(error)
      })
  },
  updateUser(context, payload) {
    return Request({
      method: 'put',
      endpoint: 'users/' + payload.user.id,
      data: payload,
      isDataRaw: true
    }).then(response => {
      response.data.is_admin = response.data.is_admin ? 1 : 0 
      response.data.licensed = response.data.licensed ? 1 : 0
      context.commit('updateUserState', {
        index: payload.index,
        user: response.data
      })
      return (response)
    })
      .catch((response) => {
        return Promise.reject(response)
      })
  }
}