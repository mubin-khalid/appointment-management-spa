export default {
  appointments: state => {
    return (state.appointments.appointments || {})
  },
  total: state => {
    return state.appointments.total || 1
  }
}