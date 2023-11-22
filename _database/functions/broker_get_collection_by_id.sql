CREATE OR REPLACE FUNCTION app.broker_get_collection_by_id(p_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare

	json_result json;
	p_quantity int;
	p_charged int;
	p_paid int;
	p_due int;
			
begin
	
    begin
        execute 'DROP TABLE IF EXISTS temp_table';
    exception
        when others then
            null;
    end;
	
	create 	temp table temp_table AS
	select	MAX(bro.id::varchar)::uuid as broker_id,
			MAX(bro.rut) as broker_rut,
			MAX(bro.name) as broker_name,
			MAX(cus.id::varchar)::uuid as customer_id,
			MAX(cus.rut) as customer_rut,
			MAX(CONCAT(cus.name,' ', cus.paternallastname, ' ', cus.maternallastname)) as customer_name,
			MAX(cus.email) as customer_email,
			MAX(cus.phone) as customer_phone,
			MAX(pro.id::varchar)::uuid as product_id,
			MAX(pro.name) as product_name,
			MAX(pol.createdate) as incorporation,
			MAX(lpr.price) as price,
			MAX(CASE WHEN ppl.discount_type = 't' AND ppl.discount_cicles > 0 THEN ppl.discount_cicles ELSE 0 END) as free_months,
			(extract(month from age(NOW(), MAX(pol.createdate)))::int + 1) as fees,
			SUM(CASE WHEN pay.amount IS NULL THEN 0 ELSE pay.amount END) as paid
	from	app.lead lea
				inner join app.policy pol on lea.policy_id = pol.id
			    inner join app.broker bro on lea.agent_id = bro.id
			    inner join app.customer cus ON lea.customer_id = cus.id
			    inner join app.leadproduct lpr ON lea.id = lpr.lead_id
			    inner join app.productplan ppl ON lpr.productplan_id = ppl.plan_id
			    inner join app.product pro ON lpr.product_id = pro.id
			    inner join app.subscription sub ON lea.subscription_id = sub.subscription_id
			    left outer join app.payment pay ON pay.subscription_id = sub.subscription_id
	where	not lea.policy_id is null
			and lea.agent_id = p_id
	group 	by 
			sub.subscription_id;
		
	select 	count(1),
			sum(((fees - free_months) * price)),
			sum(paid),
			sum(((fees - free_months) * price) - paid)
	into	p_quantity,
			p_charged,
			p_paid,
			p_due
	from 	temp_table;
	
	select	json_build_object(
				'summary', json_build_object(
					'quantity', p_quantity,
					'charged', p_charged,
					'paid', p_paid,
					'due', p_due),
				'detail', json_agg(json_build_object(
					'customer', json_build_object(
						'id', pay.customer_id,
						'rut', pay.customer_rut,
						'name', pay.customer_name,
						'email', pay.customer_email,
						'phone', pay.customer_phone),
					'product', json_build_object(
						'id', pay.product_id,
						'name', pay.product_name,
						'incorporation', pay.incorporation,
						'price', pay.price),
					'collection', json_build_object(
						'fee', json_build_object(
							'quantity', pay.fees,
							'free', pay.free_months),
						'charged', ((pay.fees - pay.free_months) * pay.price),
						'paid', pay.paid,
						'due', ((pay.fees - pay.free_months) * pay.price) - pay.paid))))
	from	temp_table as pay
	into 	json_result;

	return	json_result;
				
end;
$function$
;