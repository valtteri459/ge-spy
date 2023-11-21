
export interface RealTimePriceData {
  high?: number
  highTime?: number
  low?: number
  lowTime?: number
}

export interface RealTimePriceUpdate {
  data: [number, RealTimePriceData][]
}

export interface RealTimeItemRequest {
  id: number
}

export interface RealTimeItemResponse {
  id: number
  name: string
  description: string
  purchaseLimit?: number
  lowAlchemy?: number
  highAlchemy?: number
  shopPrice?: number
  members: boolean
  icon: string
  icon_large: string
}

export interface ItemGraphRequest {
  id: number
  startTimestamp: number
  endTimestamp: number
}

export interface ItemGraphResponse {
  id: number
  startTimestamp: number
  endTimestamp: number
  bucketSize: number
  graphData: {
    timestamp: number
    high: number
    low: number
    highVolume: number
    lowVolume: number
  }[]
}

export interface SystemNoticeMessage {
  type: 'INFO' | 'WARNING' | 'ERROR'
  message: string
}