
export interface RealTimePriceData {
  high?: number
  highTime?: number
  low?: number
  lowTime?: number
}

export interface RealTimePriceUpdate {
  data: [number, RealTimePriceData][]
}