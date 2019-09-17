export default {
  ta: (state, ta) => state.translation_agencies = ta,
  addTa(state, response){
    state.translation_agencies.translation_agencies.push(response)
    state.translation_agencies.total += 1
  },
  updateTa(state, payload){
    state.translation_agencies.translation_agencies[payload.index] = payload.editedTA
  }
}