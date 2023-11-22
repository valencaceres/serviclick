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
			        				SELECT	json_agg(json_build_object(
			        							'rut', ben.rut,
												'name', ben.name, 
												'paternallastname', ben.paternallastname, 
												'maternallastname', ben.maternallastname, 
												'relationship', ben.relationship
			        						))
			        				from (
						        			select	lbe.lead_id,
						        					ben.rut,
													ben.name,
													ben.paternallastname,
													ben.maternallastname,
													ben.relationship
						        			from	app.leadbeneficiary lbe
														inner join app.beneficiary ben on lbe.beneficiary_id = ben.id) as ben
									where 	pro.lead_id = ben.lead_id
			        			)
			        		))
			        FROM (
							SELECT 	lea.id as lead_id,
									lin.insured_id,
									pro.id as product_id,
									pro.name as product_name, 
									ppl.price as product_price
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