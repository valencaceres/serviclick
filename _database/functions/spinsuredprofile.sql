-- DROP FUNCTION app.spinsuredprofile(text);

CREATE OR REPLACE FUNCTION app.spinsuredprofile(v_ins_rut text)
 RETURNS json
 LANGUAGE sql
AS $function$

	SELECT	json_build_object(
				'insured', row_to_json(ins.*),
				'products', (
			        SELECT	json_agg(json_build_object(
			        			'id', pro.product_id,
			        			'name', pro.product_name,
			        			'price', pro.product_price,
			        			'beneficiaries_max', pro.product_beneficiaries,
			        			'subscription_id', pro.subscription_id,
			        			'assistances', (
			        				SELECT	json_agg(json_build_object(
												'name', asi.assistance_name, 
												'number', asi.assistance_number, 
												'amount', asi.assistance_amount, 
												'currency', asi.assistance_currency, 
												'maximum', asi.assistance_maximum, 
												'events', asi.assistance_events, 
												'lack', asi.assistance_lack
			        						))
			        				from (
						        			select	pas.product_id,
						        					asi.name as assistance_name, 
													pas.number as assistance_number, 
													pas.amount as assistance_amount, 
													pas.currency as assistance_currency, 
													pas.maximum as assistance_maximum, 
													pas.events as assistance_events, 
													pas.lack as assistance_lack
						        			from	app.productassistance pas
														INNER JOIN app.assistance asi ON pas.assistance_id = asi.id) as asi
									where 	pro.product_id = asi.product_id
			        			),
			        			'beneficiaries', (
			        				select	json_agg(json_build_object(
			        							'id', ben.id,
			        							'rut', ben.rut,
												'name', ben.name, 
												'paternallastName', ben.paternallastname, 
												'maternallastName', ben.maternallastname, 
												'relationship', ben.relationship,
												'birthdate', ben.birthdate
			        						))
			        				from (
						        			select	lbe.lead_id,
						        			ben.id,
						        					ben.rut,
													ben.name,
													ben.paternallastname,
													ben.maternallastname,
													ben.relationship,
													ben.birthdate
						        			from	app.leadbeneficiary lbe
														inner join app.beneficiary ben on lbe.beneficiary_id = ben.id) as ben
									where 	pro.lead_id = ben.lead_id
			        			),
			        			'collection', (
			        				select	json_agg(json_build_object(
												'channel_name', col.channel_name,
												'customer_name', col.customer_name,
												'customer_email', col.customer_email,
												'customer_phone', col.customer_phone,
												'incorporation', to_char(col.incorporation, 'YYYY-MM-DD'),
												'fee_value', col.fee_value,
												'free_months', col.free_months,
												'fees_charged', col.fees - col.free_months,
												'charged', col.fee_value * (col.fees - col.free_months),
												'paid', col.paid,
												'balance', case when (col.fee_value * (col.fees - col.free_months)) - col.paid > 0 then (col.fee_value * (col.fees - col.free_months)) - col.paid else 0 end
			        						))
			        				from	(
												select	max(lea.id :: text) as lead_id,
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
														sub.subscription_id
			        						) as col
			        				where 	pro.lead_id :: text = col.lead_id
			        			)
			        		))
			        FROM (
							SELECT 	lea.id as lead_id,
									lea.subscription_id as subscription_id,
									lin.insured_id,
									pro.id as product_id,
									pro.name as product_name, 
									ppl.price as product_price,
									pro.beneficiaries as product_beneficiaries
							FROM	app.lead lea
										INNER JOIN app.leadinsured lin ON lea.id = lin.lead_id 
										INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
										INNER JOIN app.productplan ppl ON lpr.productplan_id = ppl.plan_id
										INNER JOIN app.product pro ON lpr.product_id = pro.id
							where 	not lea.policy_id is null) as pro
					WHERE pro.insured_id = ins.id
				)
			) AS json
	FROM (
		select 	ins.id,
				ins.rut,
				ins.name,
				ins.paternallastname,
				ins.maternallastname,
				ins.address,
				ins.district,
				ins.email,
				ins.phone,
				ins.birthdate
		from 	app.insured ins
		where 	ins.rut = v_ins_rut) as ins;
	
$function$
;
