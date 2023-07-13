import Main from './Main.js'

const baseurl = import.meta.env.VITE_GATE_SERVICE_URL
const endPoint = '/laundry/jenis'

export default {
  getAllList(params) {
    return Main(baseurl).get(`${endPoint}?search=${params.search}&limit=${params.limit}&page=${params.page}&orderBy=${params.orderBy}&sort=${params.sort}`)
  }
}