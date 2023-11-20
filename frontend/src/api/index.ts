import { reactive, ref } from 'vue';
import {RealTimeItemResponse, RealTimeItemSearch, RealTimePriceData, RealTimePriceUpdate} from '../../../shared/dto/interfaces'
import {io} from 'socket.io-client'

const socketStatus = reactive<{connected: boolean}>({
  connected: false
})

const latestPrices = reactive<RealTimePriceUpdate>({
  data: []
})
const itemSearchResults = reactive<{items: RealTimeItemResponse[]}>({
  items: []
})

const socket = io('http://localhost:4000');
socket.connect()
socket.on("connect", () => {
  socketStatus.connected = true;
});

socket.on("disconnect", () => {
  socketStatus.connected = false;
});

socket.on("api/unstablePrices", (newPrices: RealTimePriceUpdate) => {
  console.log(newPrices)
  latestPrices.data = newPrices.data
});


const sendQuery = (searchString: string) => {
  socket.emit('api/searchItem', {name: searchString} as RealTimeItemSearch)
}
socket.on('api/searchItem', (itemSearchResponse: RealTimeItemResponse[]) => {
  itemSearchResults.items = itemSearchResponse
})

export const useSocket = () => socketStatus
export const useLatestPrices = () => latestPrices
export const useItemSearch = (): [(searchString: string) => void, {items: RealTimeItemResponse[]}] => {
  return [sendQuery, itemSearchResults]
}