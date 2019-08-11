export default {
  appointments: (state, appointments) => state.appointments = appointments,
  addAppointment: (state, appointment) => state.appointments.push(appointment),
  removeCancelledAppointment: (state, index) => {
    state.appointments.appointments.splice(index, 1)
    state.appointments.total -= 1
  },
}