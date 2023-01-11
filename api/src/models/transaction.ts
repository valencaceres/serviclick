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
