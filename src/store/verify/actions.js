import Request from "../../helper/Request";

export default {
  verifyEmail(context, payload) {
    return new Request({
      method: 'GET',
      endpoint: 'verify?checksum=' + payload.checksum
    }).then(() => {
      return true
    }).catch(() => {
      throw new Error()
    })
  },
  updatePassword(context, payload) {
    return new Request({
      method: 'PUT',
      endpoint: 'verify/' + payload.id,
      data: payload,
      isDataRaw: true,
    }).then(() => {
      return true
    }).catch(() => {
      throw new Error()
    })
  }
}