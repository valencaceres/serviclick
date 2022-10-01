import moment from "moment";

import pool from "../util/database";

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
      sqlWhere += ` and client_type = '${client_type}'`;
    }

    if (rut !== "") {
      sqlWhere += ` and client_rut = '${rut}'`;
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
    from (	select	MAX(lea.channel_id :: text) as channel_id,
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
                    pro.id) as transactions
    where   amount >= 0 ${sqlWhere}
    order 	by
            date desc,
            time desc,
            product_name`);

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByFiltersModel };
