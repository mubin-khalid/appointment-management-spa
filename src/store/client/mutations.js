export default {
  retrieveClients: (state, clients) => state.clients = clients,
  totalClients: (state, total) => state.total = total,
  deleteClient(state, index) {
    state.clients.splice(index, 1)
    state.total -= 1
  },
  addClient: (state, client) => {
    state.clients.push(client)
    state.total += 1
  },
  editClient: (state, data) => state.clients[data.index].name = data.name,
}