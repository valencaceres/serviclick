-- DROP FUNCTION app.customer_get_by_id(uuid);

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
				'type','P',
				'origins', json_agg(json_build_object(
					'subscription_id', cus.subscription_id,
					'type', cus.origin_type,
					'lead_user', cus.lead_user_id,
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
					'beneficiaries', (
						SELECT 	json_agg(json_build_object(
									'id', ben.id,
									'rut', ben.rut,
									'name', ben.name,
									'paternalLastName', ben.paternallastname,
									'maternalLastName', ben.maternallastname,
									'address', ben.address,
									'district', ben.district,
									'phone', ben.phone,
									'email', ben.email,
									'birthDate', ben.birthdate,
									'relationship', ben.relationship
								))
						FROM 	app.lead lea
									INNER JOIN app.leadinsured lin ON lea.id = lin.lead_id
									INNER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lin.insured_id = lbe.insured_id
									INNER JOIN app.beneficiary ben ON lbe.beneficiary_id = ben.id
						WHERE 	lea.id = cus.lead_id
					),
					'price', json_build_object(
						'value', cus.price,
						'frequency', cus.frequency),
					'dates', json_build_object(
						'purchase', cus.purchase_date,
						'init', cus.init_date,
						'end', cus.end_date),
					'balance', (
						select	json_agg(json_build_object(
									'fee_value', bal.fee_value,
									'free_months', bal.free_months,
									'fees_charged', bal.fees - bal.free_months,
									'charged', bal.fee_value * (bal.fees - bal.free_months),
									'paid', bal.paid,
									'balance', case when (bal.fee_value * (bal.fees - bal.free_months)) - bal.paid > 0 then (bal.fee_value * (bal.fees - bal.free_months)) - bal.paid else 0 end
        						))
        				from (	select	max(lea.id :: text) as lead_id,
										max(case when age.name is null then bro.name else age.name end) as channel_name,
										max(concat(cus.name,' ', cus.paternallastname, ' ', cus.maternallastname)) as customer_name,
										max(cus.email) as customer_email,
										max(cus.phone) as customer_phone,
										max(pro.name) as product_name,
										min(case when pay.date is null then sub.date else pay.date end) as incorporation,
										max(lpr.price) as fee_value,
										max(case when ppl.discount_type = 't' and ppl.discount_cicles > 0 then ppl.discount_cicles else 0 end) as free_months,
										(extract(month from age(now(), min(case when pay.date is null then sub.date else pay.date end))) + 1) as fees,
										sum(case when pay.amount is null then 0 else pay.amount end) paid
								from	app.lead lea
											left outer join app.agent age on lea.agent_id = age.id
											left outer join app.broker bro on lea.agent_id = bro.id
											left outer join app.customer cus on lea.customer_id = cus.id
											left outer join app.leadproduct lpr on lea.id = lpr.lead_id
											left outer join app.productplan ppl on lpr.productplan_id = ppl.plan_id
											left outer join app.product pro on lpr.product_id = pro.id
											left outer join app.subscription sub on lea.subscription_id = sub.subscription_id
											left outer join app.payment pay on pay.subscription_id = sub.subscription_id
								where 	not lea.policy_id is null
								group  	by
										sub.subscription_id) as bal
        				where 	bal.lead_id = cus.lead_id :: text)
					)))
	into 	json_report
	from (	select	lea.id AS lead_id,
					CASE WHEN lea.subscription_id IS NULL THEN 0 ELSE lea.subscription_id END AS subscription_id,
					cus.id as customer_id,
					cus.rut as customer_rut,
					cus.name as customer_name,
					cus.paternallastname as customer_paternallastname,
					cus.maternallastname as customer_maternallastname,
					cus.address as customer_address,
					cus.district as customer_district,
					cus.email as customer_email,
					cus.phone as customer_phone,
					case when not lea.user_id is null then lea.user_id end as lead_user_id,
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