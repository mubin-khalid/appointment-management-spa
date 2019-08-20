export default{
  loggedIn: state => {
    return state.token !== null
  },
  isAdmin: state => {
    return state.user.is_admin == 1
  },
  user: state => {
    return state.user
  }
}