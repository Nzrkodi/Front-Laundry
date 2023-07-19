import Main from './Main.js'
import Other from './Other.js'

const baseurl = import.meta.env.VITE_GATE_SERVICE_URL
const endPoint = '/laundry/transaksi'

export default {
  getAllList(params) {
    return Main(baseurl).get(`${endPoint}?search=${params.search}&limit=${params.limit}&page=${params.page}&orderBy=${params.orderBy}&sort=${params.sort}`, Other.tokenConfig())
  },

  upsert(payload) {
    return Main(baseurl).post(endPoint, payload, Other.tokenConfig())
  },

  getById(id) {
    return Main(baseurl).get(`${endPoint}/${id}`, Other.tokenConfig())
  },

  delete(id) {
    return Main(baseurl).delete(`${endPoint}/${id}`, Other.tokenConfig())
  }
}