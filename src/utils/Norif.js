import Main from './Main.js'
import Other from './Other.js'

const baseurl = import.meta.env.VITE_GATE_SERVICE_URL
const endPoint = '/pusher'

export default {
  sendNotif(msg) {
    return Main(baseurl).get(`${endPoint}?pesan=${msg}`, Other.tokenConfig())
  }
}