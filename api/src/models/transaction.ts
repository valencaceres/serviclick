import moment from "moment";

import pool from "../util/database";
interface CronEvent {
  event: string;
  processingdate: Date;
  createddate: Date;
  cron_id: string;
}
interface PaymentEvent {
  amount: number;
  date: Date;
  id: string;
  buy_order: number,
  credit_card_type: string,
  gateway_response: number,
  payment_table_id: string;
}
interface Customer {
  rut: string;
  name: string;
  paternallastname: string;
  maternallastname: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

interface SubscriptionData {
  id: number;
  product_name:string
  product_id: string;
  status_name: string;
  lead_id: string;
  last_payment: string,
  status_id: string;
  cron: CronEvent[];
  customer: Customer;
  payment: PaymentEvent[];
  plan_id: string;
  customer_id: string;
}

interface QueryResult {
  success: boolean;
  data: SubscriptionData[];
  error: string | null;
}
const getActivesByRutAndProductIdModel: any = async (
  customer_type: string,
  rut: string,
  product_id: string
) => {
  try {
    const result = await pool.query(`
      select	lea.id,
              pro.product_id,
              sub.subscription_id,
              sub.status_id
      from	  app.lead lea
              inner join app.agent age on lea.agent_id = age.id
              inner join app.channel cha on age.channel_id = cha.id
              inner join app.leadproduct pro on lea.id = pro.lead_id
              inner join app.subscription sub on lea.subscription_id = sub.subscription_id
              inner join app.${customer_type} com on lea.${customer_type}_id = com.id
      where 	com.rut = '${rut}' and
              pro.product_id = '${product_id}' and
              sub.status_id < 8`);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByFiltersModel: any = async (
  channel_id: string,
  client_type: string,
  rut: string,
  period_id: string,
  status_id: string
) => {
  try {
    let sqlWhere = "";

    if (channel_id !== "") {
      sqlWhere += ` and case when age.id is null then case when bro.id is null then ret.id else bro.id end else age.id end = '${channel_id}'`;
    }

    if (client_type !== "") {
      sqlWhere += ` and case when cus.rut is null then 'c' else 'p' end = '${client_type}'`;
    }

    if (rut !== "") {
      sqlWhere += ` and case when com.companyname is null then cus.rut else com.rut end = '${rut}'`;
    }

    if (period_id !== "") {
      switch (period_id) {
        case "l":
          sqlWhere += ` and EXTRACT(YEAR FROM pay.date) = ${moment()
            .subtract(1, "year")
            .format("YYYY")}`;
          break;
        case "y":
          sqlWhere += ` and EXTRACT(YEAR FROM pay.date) = ${moment().format(
            "YYYY"
          )}`;
          break;
        case "m":
          sqlWhere += ` and to_char(pay.date, 'YYYYMM') = '${moment().format(
            "YYYYMM"
          )}'`;
          break;
        case "w":
          sqlWhere += ` and to_char(pay.date, 'YYYYMMDD') BETWEEN '${moment()
            .isoWeekday(1)
            .format("YYYYMMDD")}' and '${moment()
            .isoWeekday(7)
            .format("YYYYMMDD")}'`;
          break;
        case "d":
          sqlWhere += ` and to_char(pay.date, 'YYYYMMDD') = '${moment().format(
            "YYYYMMDD"
          )}'`;
          break;
      }
    }

    // if (status_id !== "") {
    //   sqlWhere += ` and status_id = '${status_id}'`;
    // }
    // pro_rated_sub = True
    const result = await pool.query(`
      select	pay.date,
              to_char(pay.date, 'DD/MM/YYYY') as date,
              to_char(pay.date, 'HH24:MI') as time,
              case when age.id is null then case when bro.id is null then ret.id else bro.id end else age.id end as agent_id,
              case when age.name is null then case when bro.name is null then ret.name else bro.name end else age.name end as agent_name,
              prd.name product_name,
              case when cus.rut is null then 'c' else 'p' end as contractor_type,
              case when com.companyname is null then cus.rut else com.rut end as contractor_rut,
              case when com.companyname is null then concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) else com.companyname end as contractor_name,
              case when com.companyname is null then cus.address else com.address end as contractor_address,
              case when com.companyname is null then cus.district else com.address end as contractor_disrtrict,
              case when com.companyname is null then cus.email else com.email end as contractor_email,
              case when com.companyname is null then cus.phone else com.phone end as contractor_phone,
              lea.subscription_id,
              sus.id as subscription_table_id,
              pay.amount
      from	  app.lead lea
                inner join app.policy pol on lea.policy_id = pol.id
                left outer join app.customer cus on lea.customer_id = cus.id
                left outer join app.company com on lea.company_id = com.id
                left outer join app.subscription sus on lea.subscription_id = sus.subscription_id
                left outer join app.leadproduct pro on lea.id = pro.lead_id
                left outer join app.product prd on pro.product_id = prd.id
                left outer join app.payment pay on sus.subscription_id = pay.subscription_id 
                left outer join app.agent age on lea.agent_id = age.id
                left outer join app.broker bro on lea.agent_id = bro.id
                left outer join app.retail ret on lea.agent_id = ret.id
      where   pay.amount > 0 ${sqlWhere}
      order	  by
              pay.date desc,
              contractor_name`);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySubscriptionId = async (
  subscription_id: string
): Promise<QueryResult> => {
  try {
    const result = await pool.query(`
        SELECT lea.id,
               pro.product_id,
               prd.name as product_name,
               sub.subscription_id,
               sub.status_id,
               sub.plan_id as plan_id,
               crn.event,
               crn.processingdate,
               crn.createddate,
               crn.id as cron_id,
               cus.rut,
                cus.name,
                cus.paternallastname,
                cus.maternallastname,
                cus.address,
                cus.district,
                cus.email,
                cus.phone,
                pay.amount as amount_payment,
                pay.date as date_payment,
                pay.payment_id as payment_id, 
                pay.id as payment_table_id,
                cus.id as customer_id,
                pay.buy_order,
                sta.name as status_name,
                pay.credit_card_type,
                pay.gateway_response
        FROM app.lead lea
             INNER JOIN app.leadproduct pro ON lea.id = pro.lead_id
             INNER JOIN app.subscription sub ON lea.subscription_id = sub.subscription_id
             INNER JOIN app.cron crn ON sub.subscription_id = crn.subscription_id
             INNER JOIN app.customer cus ON lea.customer_id = cus.id
             INNER JOIN APP.product prd ON prd.id = pro.product_id
             left join app.payment pay on sub.subscription_id = pay.subscription_id
             left join app.status sta on sub.status_id = sta.status_id
        WHERE sub.id = '${subscription_id}'`);

    const subscriptionDataMap: { [key: string]: SubscriptionData } = {};
    result.rows.forEach((row) => {
      const {
        id,
        product_id,
        product_name,
        subscription_id,
        status_id,
        event,
        processingdate,
        createddate,
        paternallastname,
        maternallastname,
        name,
        rut,
        phone,
        email,
        district,
        address,
        amount_payment,
        payment_id,
        date_payment,
        payment_table_id,
        cron_id,
        buy_order,
        credit_card_type,
        gateway_response,
        status_name,
     customer_id,
        plan_id
      } = row;

   
      if (!subscriptionDataMap[subscription_id]) {
        subscriptionDataMap[subscription_id] = {
          lead_id: id,
          product_id,
          id: subscription_id,
          status_id,
          customer_id,
          last_payment: "",
          status_name,
          plan_id,
          product_name,
          customer: {
            rut,
            name: name + " " + paternallastname + " " + maternallastname,
            paternallastname,
            maternallastname,
            address: address + ", " + district,
            district,
            email,
            phone,
          },
          cron: [],
          payment: [],
        };
      }
      const cronExists = subscriptionDataMap[subscription_id].cron.some(
        (cronEvent) =>
          cronEvent.event === event &&
          cronEvent.processingdate.getTime() === processingdate.getTime() &&
          cronEvent.createddate.getTime() === createddate.getTime() &&
          cronEvent.cron_id === cron_id
      );

      if (!cronExists) {
        subscriptionDataMap[subscription_id].cron.push({
          event,
          processingdate,
          createddate,
          cron_id
        });
      }
     
      const paymentExists = subscriptionDataMap[subscription_id].payment.some(
        (paymentEvent) =>
          paymentEvent.amount === amount_payment &&
          paymentEvent.date.getTime() === date_payment.getTime() &&
          paymentEvent.id === payment_id &&
          paymentEvent.payment_table_id === payment_table_id
      );
      

      if (!paymentExists) {
        subscriptionDataMap[subscription_id].payment.push({
          amount: amount_payment,
          date: date_payment,
          id: payment_id,
          buy_order,
          credit_card_type,
          gateway_response,
          payment_table_id,
        });
        const payments = subscriptionDataMap[subscription_id].payment;
    const lastPayment = payments.reduce((prevPayment, currentPayment) => {
    const prevDate = new Date(prevPayment.date);
    const currentDate = new Date(currentPayment.date);
    
    return prevDate.getTime() > currentDate.getTime() ? prevPayment : currentPayment;
    }, payments[0]); 
    subscriptionDataMap[subscription_id].last_payment = new Date(lastPayment.date).toISOString();

      }
    });

    const data: SubscriptionData[] = Object.values(subscriptionDataMap);
    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: [], error: (e as Error).message };
  }
};

const changeAmountModel = async (
  subscription_id: number,
  amount: number
): Promise<QueryResult> => {
  try {
    const result = await pool.query(`
      UPDATE app.subscription
      SET plan_amount = ${amount}
      WHERE subscription_id = '${subscription_id}'`);

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: [], error: (e as Error).message };
  }
}

const changeStatusModel = async (
  subscription_id: number
): Promise<QueryResult> => {
  try {
    const result = await pool.query(`
      UPDATE app.subscription
      SET status_id = 9
      WHERE subscription_id = '${subscription_id}'`);
      

    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: [], error: (e as Error).message };
  }
}

const updateSubscriptionModelDifferences = async (
  subscription_id: number,
  differences: any,
  mergedData:any
): Promise<QueryResult> => {
  try {
    for (const payment of mergedData.payment) {
      const { id, amount, issued_on, buy_order, credit_card_type, gateway_response } = payment;
    const result = await pool.query(`
    UPDATE app.payment
    SET 
      date = '${issued_on}',
      amount = ${amount},
      gateway_response = '${gateway_response}',
      buy_order = ${buy_order},
      credit_card_type = '${credit_card_type}'
    WHERE 
      payment_id = '${id}' AND
      subscription_id = '${subscription_id}'
  `);
    }
    return { success: true, data: [], error: null };
  } catch (e) {
    return { success: false, data: [], error: (e as Error).message };
  }
}

const fillReveniuTables = async (subscription: any, payment: any) => {
  try {
    await insertCustomer(subscription.customer);
    await insertSubscription(subscription);
    if (payment && subscription.id && payment.length > 0) {
      for (const singlePayment of payment) {
        await insertPayment(singlePayment, subscription.id);
      }
    }
    await insertSubscriptionDetail(subscription);
  } catch (error) {
    console.error('error in fillReveniuTablesModel:', error);
    throw new Error("Error inserting data into reveniu tables");
  }
};
const insertCustomer = async (customer: any) => {
  try {
    const customerQuery = `
      INSERT INTO reveniu.customer (id, name, email, address, rut, phone)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE 
      SET name = EXCLUDED.name, email = EXCLUDED.email, address = EXCLUDED.address, rut = EXCLUDED.rut, phone = EXCLUDED.phone;
    `;
    await pool.query(customerQuery, [customer.id, customer.name, customer.email, customer.address, customer.rut, customer.phone]);
  } catch (error) {
    console.error('Error en insertCustomer:', error);
    throw new Error("Error al insertar cliente en la tabla de reveniu");
  }
};

const insertSubscription = async (subscription: any) => {
  try {
    const subscriptionQuery = `
      INSERT INTO reveniu.subscription (id, customer_id)
      VALUES ($1, $2)
      ON CONFLICT (id) DO NOTHING;
    `;
    await pool.query(subscriptionQuery, [subscription.id, subscription.customer.id]);
  } catch (error) {
    console.error('Error en insertSubscription:', error);
    throw new Error("Error al insertar suscripción en la tabla de reveniu");
  }
};

const insertPayment = async (payment: any, subscriptionId: string) => {
  try {
    const issuedOn = payment.issued_on !== "" ? payment.issued_on : null;
    const paymentQuery = `
      INSERT INTO reveniu.payment (id,buy_order, issued_on, amount, credit_card_type, is_recurrent, subscription_id, gateway_response)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (buy_order) DO NOTHING;
    `;
    await pool.query(paymentQuery, [payment.id,payment.buy_order, issuedOn, payment.amount, payment.credit_card_type, payment.is_recurrent, subscriptionId, payment.gateway_response]);
  } catch (error) {
    console.error('Error en insertPayment:', error);
    throw new Error("Error al insertar pago en la tabla de reveniu");
  }
};

const insertSubscriptionDetail = async (subscription: any) => {
  try {
    const createdOn = subscription.created_on && subscription.created_on ? new Date(subscription.created_on).toISOString() : null;
    const subscriptionNextDue = subscription.next_due ? subscription.next_due : null;
    const subscriptionLastPayment = subscription.last_payment.date ? subscription.last_payment.date : null;
                                                                                  
    const subscriptionDetailQuery = `
      INSERT INTO reveniu.subscription_detail (subscription_id, interval, created_on, status, cicles, remaining_cicles, auto_renew_count, link_title, link_description, plan_amount, is_uf, next_due, plan_id, is_auto_renew, discount_rate, discount_is_fixed, discount_cicles, last_payment, external_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      ON CONFLICT (subscription_id) DO UPDATE
      SET interval = EXCLUDED.interval, created_on = EXCLUDED.created_on, status = EXCLUDED.status, cicles = EXCLUDED.cicles, remaining_cicles = EXCLUDED.remaining_cicles, auto_renew_count = EXCLUDED.auto_renew_count, link_title = EXCLUDED.link_title, link_description = EXCLUDED.link_description, plan_amount = EXCLUDED.plan_amount, is_uf = EXCLUDED.is_uf, next_due = EXCLUDED.next_due, plan_id = EXCLUDED.plan_id, is_auto_renew = EXCLUDED.is_auto_renew, discount_rate = EXCLUDED.discount_rate, discount_is_fixed = EXCLUDED.discount_is_fixed, discount_cicles = EXCLUDED.discount_cicles, last_payment = EXCLUDED.last_payment, external_id = EXCLUDED.external_id;
    `;
    await pool.query(subscriptionDetailQuery, [
      subscription.id, subscription.interval, createdOn, subscription.status, subscription.cicles, subscription.remaining_cicles, subscription.auto_renew_count,
      subscription.link_title, subscription.link_description, subscription.plan_amount, subscription.is_uf, subscriptionNextDue, subscription.plan_id, subscription.is_auto_renew,
      subscription.discount_rate, subscription.discount_is_fixed, subscription.discount_cicles, subscriptionLastPayment, null
    ]);
  } catch (error) {
    console.error('Error en insertSubscriptionDetail:', error);
    throw new Error("Error al insertar detalles de suscripción en la tabla de reveniu");
  }
};
export {
  getActivesByRutAndProductIdModel,
  getByFiltersModel,
  getBySubscriptionId,
  changeAmountModel,
  changeStatusModel,
  updateSubscriptionModelDifferences,
  fillReveniuTables
  
};


  