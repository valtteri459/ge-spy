export type JagexItemCategoryQueryResponse = {
  alpha: {letter: string, items: number}[]
}

export type JagexItemQueryItemInfo = {
  icon: string,
  icon_large: string,
  id: number,
  type: string,
  typeIcon: string,
  name: string,
  description: string,
  current: any,
  today: any,
  members: 'true' | 'false'
}

export type JagexItemQueryResponse = {
  total: number
  items: JagexItemQueryItemInfo[]
}