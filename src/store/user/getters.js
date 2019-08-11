export default {
  users: state => {
    return state.admin.users.users
  },
  total: state => {
    return state.admin.users.total
  }
}