export const _getBySearchValues = (rut: string, name: string) => `
        select  sum.id,
                max(sum.rut) as rut,
                max(sum.name) as name,
                count(1) as products,
                sum(sum.insured) as insured
        from (	select	ret.id,
                        max(ret.rut) as rut,
                        max(ret.name) as name,
                        ppl.plan_id,
                        sum(case when lea.policy_id is null then 0 else 1 end) as insured
                from	app.retail ret
                        inner join app.retailproduct rpr on ret.id = rpr.retail_id
                        inner join app.productplan ppl on rpr.product_id = ppl.product_id and ppl.agent_id = ret.id
                        left outer join (
                                app.leadproduct lpr
                                        inner join app.lead lea on lpr.lead_id = lea.id
                                        inner join app.policy pol on lea.policy_id = pol.id and (pol.enddate is null or pol.enddate::date >= now()::date)
                                        inner join app.customer cus on lea.customer_id = cus.id
                        )  on ppl.plan_id = lpr.productplan_id
                where 	ret.isactive is true
                        ${
                          name !== ""
                            ? `and lower(ret.name) like '%${name}%'`
                            : ""
                        }
                        ${rut !== "" ? `and ret.rut = '${rut}'` : ""}
                group 	by
                        ret.id,
                        ppl.plan_id) as sum
        group 	by
                sum.id
        order 	by
                max(sum.name)`;

export const _getSales = `
SELECT  
    MAX(CONCAT(per.name, ' ', per.paternallastname, ' ', per.maternallastname)) AS fullname,
    COUNT(lea.id) AS leads,
    SUM(CASE WHEN lea.policy_id IS NOT NULL THEN 1 ELSE 0 END) AS sales,
    pro."name" AS product,
    lp.price AS productprice,
    MAX(CONCAT(cus."name", ' ', cus.paternallastname, ' ', cus.maternallastname)) AS fullnamebuyer
FROM app.lead lea
LEFT JOIN app.user usr ON (
    CASE 
        WHEN lea.user_id ~* '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' 
        THEN lea.user_id::uuid 
        ELSE NULL 
    END = usr.id OR lea.user_id = usr.clerk_id
)
LEFT JOIN app.person per ON usr.person_id = per.id 
LEFT JOIN app.customer cus ON lea.customer_id = cus.id 
LEFT JOIN app.leadproduct lp ON lea.id = lp.lead_id 
LEFT JOIN app.product pro ON lp.product_id = pro.id 
WHERE lea.agent_id = $1
GROUP BY 
    pro."name",
    lp.price;
`;

export const _getCustomersByRetailIdAndProductId = `
        select 	cus.id as customer_id,
                cus.rut as customer_rut,
                cus.name as customer_name,
                cus.paternallastname as customer_paternallastname,
                cus.maternallastname as customer_maternallastname,
                cus.address as customer_address,
                cus.district as customer_district,
                cus.phone as customer_phone,
                cus.email as customer_email,
                ins.id as insured_id,
                ins.rut as insured_rut,
                ins.name as insured_name,
                ins.paternallastname as insured_paternallastname,
                ins.maternallastname as insured_maternallastname,
                ins.address as insured_address,
                ins.district as insured_district,
                ins.phone as insured_phone,
                ins.email as insured_email,
                ins.birthdate as insured_birthdate,
                case when pol.createdate is null then '' else to_char(pol.createdate, 'YYYY-MM-DD') end as createdate,
                case when pol.startdate is null then '' else to_char(pol.startdate, 'YYYY-MM-DD') end as initialdate,
                case when pol.enddate is null then '' else to_char(pol.enddate, 'YYYY-MM-DD') end as enddate
        from 	app.retail ret
                        inner join app.retailproduct rpr on ret.id = rpr.retail_id
                        inner join app.productplan ppl on rpr.product_id = ppl.product_id and rpr.plan_id = ppl.plan_id and ppl.agent_id = ret.id
                        inner join app.leadproduct lpr on ppl.plan_id = lpr.productplan_id
                        inner join app.lead lea on lpr.lead_id = lea.id
                        inner join app.leadinsured lin on lea.id = lin.lead_id
                        inner join app.customer cus on lea.customer_id = cus.id
                        inner join app.insured ins on lin.insured_id = ins.id
                        inner join app.policy pol on lea.policy_id = pol.id and (pol.enddate is null or pol.enddate::date >= now()::date)
        where 	ret.id = $1 and
                ppl.id = $2`;
