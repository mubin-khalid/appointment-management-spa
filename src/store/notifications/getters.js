export default {
  notifications: state => {
    return state.notifications.notifications
  },
  total: state => {
    return state.notifications.total
  },
  notificationSettings: state => {
    return state.notificationSettings
  }
}