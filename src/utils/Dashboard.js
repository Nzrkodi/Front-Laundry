import Main from './Main.js'
import Other from './Other.js'

const baseurl = import.meta.env.VITE_GATE_SERVICE_URL
const endPoint = '/laundry/dashboard'

export default {
  countData() {
    return Main(baseurl).get(`${endPoint}`, Other.tokenConfig())
  }
}