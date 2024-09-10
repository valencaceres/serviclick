export interface IContractor {
    customer: ICustomer
    type: string,
    origins: IOrigins[],
}

export interface ICustomer {
    id: string,
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    address: string,
    district: string,
    email: string,
    phone: string
}

interface IOrigins {
    subscription_id: string,
    type: string,
    lead_user: string,
    name: string,
    product: IProduct,
    insured: IInsured,
    beneficiaries: IBeneficiaries[],
    price: IPrice
    dates:  IDates
    balance: IBalance[];
}

interface IProduct {
    id: string,
    name:string,
    assistances: IAssistance[]
}

interface IAssistance {
    name: string,
    number: number,
    amount: number,
    currency: string,
    maximum: string,
    events: string,
    lack: number
}

interface IInsured {
    id: string,
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    address: string,
    district: string,
    email: string,
    phone: string
}

interface IBeneficiaries {
    id: string,
    rut: string,
    name: string,
    paternallastname: string,
    maternallastname: string,
    address: string,
    district: string,
    email: string,
    phone: string
}

interface IPrice {
    value: number,
    frequency: string
}

interface IDates {
    purchase: string,
    init: string,
    end: string
}

interface IBalance {
    fee_value: number,
    free_months: number,
    fees_charged: number,
    charged: number,
    paid: number,
    balance: number
}

export interface ICustomerEndpoint {
    summary: {
        customer: number,
        products: number
    },
    pagination: {
        total: number,
        page: number,
        records: number
    },
    data: ICustomerData[]
}

interface ICustomerData {
    id: string,
    rut: string,
    name: string,
    products: number
}