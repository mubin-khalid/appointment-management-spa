export default {
  setUsers: (state, users) => state.admin.users = users,
  deleteUser: (state, index) => {
    state.admin.users.users.splice(index, 1)
    state.admin.users.total -= 1
  },
  addUser: (state, user) => {
    state.admin.users.push(user)
    state.admin.users.total += 1
  }
}