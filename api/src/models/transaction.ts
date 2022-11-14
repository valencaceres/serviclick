import moment from "moment";

import pool from "../util/database";

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
      sqlWhere += ` and channel_id = '${channel_id}'`;
    }

    if (client_type !== "") {
      sqlWhere += ` and contractor_type = '${client_type}'`;
    }

    if (rut !== "") {
      sqlWhere += ` and contractor_rut = '${rut}'`;
    }

    if (period_id !== "") {
      switch (period_id) {
        case "y":
          sqlWhere += ` and EXTRACT(YEAR FROM datetime) = ${moment().format(
            "YYYY"
          )}`;
          break;
        case "m":
          sqlWhere += ` and to_char(datetime, 'YYYYMM') = '${moment().format(
            "YYYYMM"
          )}'`;
          break;
        case "w":
          sqlWhere += ` and to_char(datetime, 'YYYYMMDD') BETWEEN '${moment()
            .isoWeekday(1)
            .format("YYYYMMDD")}' and '${moment()
            .isoWeekday(7)
            .format("YYYYMMDD")}'`;
          break;
        case "d":
          sqlWhere += ` and to_char(datetime, 'YYYYMMDD') = '${moment().format(
            "YYYYMMDD"
          )}'`;
          break;
      }
    }

    if (status_id !== "") {
      sqlWhere += ` and status_id = '${status_id}'`;
    }
    // pro_rated_sub = True
    const result = await pool.query(`
      select 	datetime,
              to_char(datetime, 'DD/MM/YYYY') as date,
              to_char(datetime, 'HH24:MI') as time,
              channel_id,
              channel_name,
              contractor_rut,
              contractor_name,
              product_name,
              subscription_status_id,
              subscription_status_name,
              amount
      from 	(
        select  max(case when ch1.id is null then case when ch2.id is null then ch3.id else ch2.id end else ch1.id end :: text) as channel_id,
                max(case when ch1.name is null then case when ch2.name is null then ch3.name else ch2.name end else ch1.name end) as channel_name,
                max(prd.name) as product_name,
                max(case when cus.rut is null then 'c' else 'p' end) as contractor_type,
                max(case when com.companyname is null then cus.rut else com.rut end) as contractor_rut,
                max(case when com.companyname is null then concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) else com.companyname end) as contractor_name,
                max(case when com.companyname is null then cus.email else com.email end) as contractor_email,
                max(sta.status_id) as subscription_status_id,
                max(sta.name) as subscription_status_name,
                max(case when not pay.date is null then pay.date else case when not sus.last_payment_date is null then sus.last_payment_date else case when not sus.date is null then sus.date else lea.createdate end end end) as datetime,
                max(case when pay.amount is null then 0 else pay.amount end) as amount
        from    app.lead lea
                  left outer join app.customer cus on lea.customer_id = cus.id
                  left outer join app.company com on lea.company_id = com.id
                  left outer join app.subscription sus on lea.subscription_id = sus.subscription_id
                  left outer join app.leadproduct pro on lea.id = pro.lead_id
                  left outer join app.product prd on pro.product_id = prd.id
                  left outer join app.payment pay on sus.subscription_id = pay.subscription_id 
                  left outer join app.status sta on sus.status_id = sta.status_id
                  left outer join app.agent age on lea.agent_id = age.id
                  left outer join app.channel ch1 on age.channel_id = ch1.id
                  left outer join app.broker bro on lea.agent_id = bro.id
                  left outer join app.channel ch2 on bro.channel_id = ch2.id
                  left outer join app.retail ret on lea.agent_id = ret.id
                  left outer join app.channel ch3 on ret.channel_id = ch3.id
        where   sus.status_id in (1, 4, 6)
        group 	by
                lea.id) as leads
      where   amount >=0 ${sqlWhere}
      order 	by
              datetime desc`);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getActivesByRutAndProductIdModel, getByFiltersModel };

/* 
  select	MAX(lea.channel_id :: text) as channel_id,
          MAX(pay.date) as datetime,
          MAX(to_char(pay.date, 'DD/MM/YYYY')) as date,
          MAX(to_char(pay.date, 'HH:MI')) as time,
          MAX (case when cus.rut is null then 'c' else 'p' end) as client_type,
          MAX (case when cus.rut is null then com.rut else cus.rut end) as client_rut,
          MAX (case when cus.name is null then com.companyname else cus.name end) as client_name,
          MAX(pro.name) as product_name,
          COUNT(1) :: int as num_insured,
          MAX(sta.id :: text) as status_id,
          MAX(sta.name) as status_name,
          MAX(pay.amount) as amount
  from    app.lead lea
          inner join app.leadproduct lpr on lea.id = lpr.lead_id
          inner join app.product pro on lpr.product_id = pro.id
          inner join app.leadinsured lin on lea.id = lin.lead_id
          inner join app.subscription sub on lea.subscription_id = sub.subscription_id
          inner join app.payment pay on sub.subscription_id = pay.subscription_id
          inner join app.status sta on sub.status_id = sta.status_id
          left outer join app.customer cus on lea.customer_id = cus.id
          left outer join app.company com on lea.company_id = com.id
  group   by
          lea.id,
          pro.id,
          pay.id
          
  union 	all
          
  select	MAX(lea.channel_id :: text) as channel_id,
          MAX(sub.date) as datetime,
          MAX(to_char(sub.date, 'DD/MM/YYYY')) as date,
          MAX(to_char(sub.date, 'HH:MI')) as time,
          MAX (case when cus.rut is null then 'c' else 'p' end) as client_type,
          MAX (case when cus.rut is null then com.rut else cus.rut end) as client_rut,
          MAX (case when cus.name is null then com.companyname else cus.name end) as client_name,
          MAX(pro.name) as product_name,
          COUNT(1) :: int as num_insured,
          MAX(sta.id :: text) as status_id,
          MAX(sta.name) as status_name,
          MAX(case when pay.amount is null then 0 else pay.amount end) as amount
  from    app.lead lea
          inner join app.leadproduct lpr on lea.id = lpr.lead_id
          inner join app.product pro on lpr.product_id = pro.id
          inner join app.leadinsured lin on lea.id = lin.lead_id
          inner join app.subscription sub on lea.subscription_id = sub.subscription_id
          inner join app.status sta on sub.status_id = sta.status_id
          left outer join app.payment pay on sub.subscription_id = pay.subscription_id
          left outer join app.customer cus on lea.customer_id = cus.id
          left outer join app.company com on lea.company_id = com.id
  where 	pay.id is null
  group   by
          lea.id,
          pro.id
*/

/*
    select	channel_id,
            date,
            time,
            client_type,
            client_rut,
            client_name,
            product_name,
            num_insured,
            status_id,
            status_name,
            amount
    from (	
      select	MAX(cha.id :: text) as channel_id,
              MAX(sub.date) as datetime,
              MAX(to_char(sub.date, 'DD/MM/YYYY')) as date,
              MAX(to_char(sub.date, 'HH24:MI')) as time,
              MAX (case when cus.rut is null then 'c' else 'p' end) as client_type,
              MAX (case when cus.rut is null then com.rut else cus.rut end) as client_rut,
              MAX (case when cus.name is null then com.companyname else concat(cus.name, ' ', cus.paternallastname) end) as client_name,
              MAX(pro.name) as product_name,
              COUNT(1) :: int as num_insured,
              MAX(sta.id :: text) as status_id,
              MAX(sta.name) as status_name,
              MAX(pay.amount) as amount
      from    app.lead lea
                inner join app.leadproduct lpr on lea.id = lpr.lead_id
                inner join app.product pro on lpr.product_id = pro.id
                inner join app.leadinsured lin on lea.id = lin.lead_id
                inner join app.subscription sub on lea.subscription_id = sub.subscription_id
                inner join app.status sta on sub.status_id = sta.status_id
                inner join app.agent age on lea.agent_id = age.id
                inner join app.channel cha on age.channel_id = cha.id
                left outer join app.payment pay on sub.subscription_id = pay.subscription_id
                left outer join app.customer cus on lea.customer_id = cus.id
                left outer join app.company com on lea.company_id = com.id
      group   by
              lea.id,
              pro.id) as transactions
    where   amount >= 0 ${sqlWhere}
    order 	by
            date desc,
            time desc,
            product_name
*/
