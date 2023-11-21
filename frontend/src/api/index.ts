import { reactive, ref } from 'vue';
import {RealTimeItemResponse, RealTimePriceData, RealTimePriceUpdate} from '../../../server/src/shared/interfaces'
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
  sendQuery();
});

socket.on("disconnect", () => {
  socketStatus.connected = false;
});

socket.on("api/unstablePrices", (newPrices: RealTimePriceUpdate) => {
  latestPrices.data = newPrices.data
});


const sendQuery = () => {
  socket.emit('api/searchItem')
}
socket.on('api/searchItem', (itemSearchResponse: RealTimeItemResponse[]) => {
  itemSearchResults.items = itemSearchResponse
})

export const useSocket = () => socketStatus
export const useLatestPrices = () => latestPrices
export const useItemSearch = (): [(searchString: string) => void, {items: RealTimeItemResponse[]}] => {
  return [sendQuery, itemSearchResults]
}