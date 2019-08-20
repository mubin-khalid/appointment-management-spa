export default {
  setUser: (state, userObj) => state.user = userObj,
  setToken: (state, token) => state.token = token,
  logout(state) {
    state.token = null
  },
}