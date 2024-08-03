export interface IBin {
  success: boolean,
  data: IBinData
}

interface IBinData {
  broker_id: string,
  holding: string,
  brand:string,
  bin:number,
  product:string,
  type:string
}