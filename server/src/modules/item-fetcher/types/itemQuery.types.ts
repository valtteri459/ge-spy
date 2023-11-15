export type JagexItemQueryItemInfo = {
  examine: string,
  id: number,
  members: boolean,
  lowalch: number | null,
  limit: number | null,
  value: number | null,
  highalch: number | null,
  icon: string,
  name: string
}

export type JagexItemQueryResponse = JagexItemQueryItemInfo[]

export type JagexItemPriceQueryData = {
  [key:string]: {
    avgHighPrice: number | null
    avgLowPrice: number | null
    highPriceVolume: number | null
    lowPriceVolume: number | null
  }
}

export type JagexItemPriceQueryResponse = {
  data: JagexItemPriceQueryData
  timestamp: number
}