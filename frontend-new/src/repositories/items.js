import axios from 'axios'
const domain = process.env.NODE_ENV === 'development' ? 'localhost' : 'ge.noire.io'
const port = process.env.NODE_ENV === 'development' ? '3030' : '443'
const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
const url = `${protocol}://${domain}:${port}`

export default {
  getPrefix () {
    return axios.get(`${url}/imagePrefix`)
  },
  async getItem (itemId) {
    return (await axios.get(`${url}/items/${itemId}`)).data
  },
  async getItems () {
    return (await axios.get(`${url}/items?$limit=5000`)).data
  },
  async getItemPrices (itemId, startTime, endTime) {
    startTime = new Date(startTime).getTime()
    endTime = new Date(endTime).getTime()
    return (await axios.get(`${url}/item-prices/?item=${itemId}&$and[0][timestamp][$gte]=${startTime}&$and[0][timestamp][$lte]=${endTime}`)).data
  }
}
