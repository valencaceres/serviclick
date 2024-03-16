-- DROP FUNCTION app.retail_get_payment(uuid);

CREATE OR REPLACE FUNCTION app.retail_get_payment(p_retail_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	json_report json;

begin
	
	select 	json_agg(json_build_object(
				'lead_id', lea.id,
				'date', lea.date,
				'time', lea.time,
				'customer', json_build_object(
					'id', lea.customer_id,
					'rut', lea.customer_rut,
					'name', lea.customer_name),
				'product', json_build_object(
					'id', lea.product_id,
					'name', lea.product_name,
					'frequency', lea.frequency,
					'currency', lea.currency_code,
					'price', lea.price),
				'code', lea.lead_code,
				'status', lea.approved))
	into 	json_report
	from (	select 	lea.id,
					lea.createdate::date as date,
					left(lea.createdate::time::varchar, 5) as time,
					cus.id as customer_id,
					cus.rut as customer_rut,
					concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as customer_name,
					pro.id as product_id,
					pro.name as product_name,
					ppl.frequency,
					lpr.currency_code,
					lpr.price,
					case when lpy.code is null then '' else lpy.code end as lead_code,
					lpy.approved
			from 	app.lead lea
						inner join app.leadproduct lpr on lea.id = lpr.lead_id
						inner join app.productplan ppl on lpr.product_id = ppl.product_id and lpr.productplan_id = ppl.plan_id
						inner join app.product pro on lpr.product_id = pro.id and ppl.type = 'company'
						inner join app.customer cus on lea.customer_id = cus.id
						left outer join app.leadpayment lpy on lea.id = lpy.lead_id
			where 	lea.agent_id = p_retail_id and
					lea.policy_id is null
			order 	by
					lea.createdate desc) as lea;

    return	json_report;
	
end;
$function$
;