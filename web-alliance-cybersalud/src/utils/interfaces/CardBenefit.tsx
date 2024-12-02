import { StaticImageData } from "next/image"

export interface ICardBenefit{
    id: string,
    productplan_id: string,
    image?: StaticImageData,
    name: string,
    price: string,
    detail: string,
    assistances: Array<{
        id: string,
        name: string,
        description: string,
        amount: number,
        currency: string,
        maximun: string,
        events: number,
        lack: number
    }>
    hiring_conditions: string
}