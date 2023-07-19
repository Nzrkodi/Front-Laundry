import Main from './Main.js'
import Other from './Other.js'

const baseurl = import.meta.env.VITE_GATE_SERVICE_URL
const endPoint = '/laundry/report/order'

export default {
  getAllList(params) {
    return Main(baseurl).get(`${endPoint}?year=${params.year}&start_month=${params.start_month}&end_month=${params.end_month}`, Other.tokenConfig())
  }
}