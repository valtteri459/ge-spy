import axios from 'axios'
const domain = process.env.NODE_ENV === 'development' ? 'localhost' : 'ge.noire.io'
const port = process.env.NODE_ENV === 'development' ? '5000' : '443'
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
const url = `${protocol}://${domain}:${port}/api`

export default {
  getPrefix () {
    return axios.get(`${url}/imagePrefix`)
  },
  getItem (itemId) {
  },
  getItems () {
    return axios.get(`${url}/allPrices`)
  },
  getItemPrices (itemId, startTime, endTime) {
  }
}
