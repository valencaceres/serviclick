CREATE OR REPLACE FUNCTION app.customer_get_by_id(p_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	json_customer json;
	json_report json;

begin
	
	select json_build_object(
			'id', id,
			'rut', rut,
			'name', name,
			'paternalLastName', paternallastname,
			'maternalLastName', maternallastname,
			'address', address,
			'district', district,
			'email', email,
			'phone', phone)
	into 	json_customer
	from 	app.customer
	where 	id = p_id;

	select 	json_build_object(
				'customer', json_customer,
				'origins', json_agg(json_build_object(
					'type', cus.origin_type,
					'name', cus.origin_name,
					'product', json_build_object(
						'id', cus.product_id,
						'name', cus.product_name,
						'assistances', (
							SELECT	json_agg(json_build_object(
											'name', asi.assistance_name, 
											'number', asi.assistance_number, 
											'amount', asi.assistance_amount, 
											'currency', asi.assistance_currency, 
											'maximum', asi.assistance_maximum, 
											'events', asi.assistance_events, 
											'lack', asi.assistance_lack))
		        				from (	select	pas.product_id,
					        					asi.name as assistance_name, 
												pas.number as assistance_number, 
												pas.amount as assistance_amount, 
												pas.currency as assistance_currency, 
												pas.maximum as assistance_maximum, 
												pas.events as assistance_events, 
												pas.lack as assistance_lack
					        			from	app.productassistance pas
													INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
										where 	pas.product_id = cus.product_id) as asi)),
					'insured', json_build_object(
						'id', cus.insured_id,
						'rut', cus.insured_rut,
						'name', cus.insured_name,
						'paternalLastName', cus.insured_paternallastname,
						'maternalLastName', cus.insured_maternallastname,
						'address', cus.insured_address,
						'district', cus.insured_district,
						'email', cus.insured_email,
						'phone', cus.insured_phone),
					'price', json_build_object(
						'value', cus.price,
						'frequency', cus.frequency),
					'dates', json_build_object(
						'purchase', cus.purchase_date,
						'init', cus.init_date,
						'end', cus.end_date))))
	into 	json_report
	from (	select	cus.id as customer_id,
					cus.rut as customer_rut,
					cus.name as customer_name,
					cus.paternallastname as customer_paternallastname,
					cus.maternallastname as customer_maternallastname,
					cus.address as customer_address,
					cus.district as customer_district,
					cus.email as customer_email,
					cus.phone as customer_phone,
					case
						when not ret.id is null then 'Empresa' 
						when not bro.id is null then 'Broker'
						when not age.id is null then 'Web'
					end as origin_type,
					case
						when not ret.id is null then ret.fantasyname 
						when not bro.id is null then bro.fantasyname
						when not age.id is null then age.name
					end as origin_name,
					ins.id as insured_id,
					ins.rut as insured_rut,
					ins.name as insured_name,
					ins.paternallastname as insured_paternallastname,
					ins.paternallastname as insured_maternallastname,
					ins.address as insured_address,
					ins.district as insured_district,
					ins.email as insured_email,
					ins.phone as insured_phone,
					pro.id as product_id,
					pro.name as product_name,
					ppl.price,
					ppl.frequency,
					pol.createdate::date as purchase_date,
					pol.startdate::date as init_date,
					pol.enddate::date as end_date
			from 	app.lead lea
						inner join app.leadinsured lin on lea.id = lin.lead_id 
						inner join app.leadproduct lpr on lea.id = lpr.lead_id
						inner join app.customer cus on lea.customer_id = cus.id
						inner join app.insured ins on lin.insured_id = ins.id
						inner join app.policy pol on lea.policy_id = pol.id
						inner join app.product pro on lpr.product_id = pro.id
						inner join app.productplan ppl on pro.id = ppl.product_id and lea.agent_id = ppl.agent_id and lpr.productplan_id = ppl.plan_id
						left outer join app.retail ret on lea.agent_id = ret.id
						left outer join app.broker bro on lea.agent_id = bro.id
						left outer join app.agent age on lea.agent_id = age.id
			where 	lea.customer_id = p_id
			order 	by
					origin_type,
					origin_name,
					product_name) as cus;
		
	return	json_report;

end;
$function$
;
