export type TransactionT  ={
    lead_id: string;
    product_id: string;
    id: number;
    status_id: number;
    last_payment: string;
    status_name: string;
    plan_amount: number;
    is_uf: boolean;
    plan_id: number;
    product_name: string;
    customer: {
        rut: string;
        name: string;
        paternallastname: string;
        maternallastname: string;
        address: string;
        district: string;
        email: string;
        phone: string;
    };
    cron: {
        event: string;
        processingdate: string;
        createddate: string;
        cron_id: string;
    }[];
    payment: {
        amount: number;
        date: string;
        id: number;
        buy_order: string;
        credit_card_type: string;
        gateway_response: string;
        payment_table_id: string;
    }[];
    payment_method: {
        code: string | null;
        last_4_card_digits: string;
        payment_method_type: string;
    };
    total_successful_payments: number;
    next_due_date: string;
    created_on: string;
    paymentsArray: {
        id: number;
        amount: number;
        issued_on: string;
        buy_order: number;
        credit_card_type: string;
        is_recurrent: boolean;
        gateway_response: string;
        payment_type: string;
    }[];
    frequency: string;
    statusSubscription: string;
    customer_id:string;
  }