import { reactive, ref, watchEffect } from 'vue';
import {RealTimeItemRequest, RealTimeItemResponse, RealTimePriceData, RealTimePriceUpdate} from '../../../server/src/shared/interfaces'
import {io} from 'socket.io-client'

type RealTimeItemStoreObject = Map<number, RealTimeItemResponse>

const socketStatus = reactive<{connected: boolean}>({
  connected: false
})

const latestPrices = reactive<RealTimePriceUpdate>({
  data: []
})
const itemSearchResults = reactive<{items: RealTimeItemResponse[]}>({
  items: []
})

const itemInformation: RealTimeItemStoreObject = new Map<number, RealTimeItemResponse>()

watchEffect(async () => {
  itemSearchResults.items.forEach(itemRow => {
    itemInformation.set(itemRow.id, itemRow)
  })
  
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
export const useItemData = ()  => itemInformation
export const useItemSearch = (): [() => void, {items: RealTimeItemResponse[]}] => {
  return [sendQuery, itemSearchResults]
}