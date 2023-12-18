drop function app.case_get_services_and_values;
CREATE OR REPLACE FUNCTION app.case_get_services_and_values(p_insured_id uuid, p_beneficiary_id uuid, p_retail_id uuid, p_customer_id uuid, p_product_id uuid, p_assistance_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_lead_id uuid;
	json_product JSON;
   	json_assistances JSON;
   	json_assistance JSON;
   	json_used JSON;
	json_values JSON;
	json_result JSON;

begin
	
	if p_beneficiary_id is null then
	
		select	lea.id as lead_id
		from 	app.lead lea
					inner join app.leadinsured lin on lea.id = lin.lead_id
					inner join app.leadproduct lpr on lea.id = lpr.lead_id
					left outer join app.retail ret on lea.agent_id = ret.id
		where 	not lea.policy_id is null and
				lea.customer_id = p_customer_id and
				lin.insured_id = p_insured_id and
				lpr.product_id = p_product_id and
				((p_retail_id is null) or (ret.id = p_retail_id))
		into 	p_lead_id;
	
	else
	
		select	lea.id as lead_id
		from 	app.lead lea
					inner join app.leadinsured lin on lea.id = lin.lead_id
					inner join app.leadproduct lpr on lea.id = lpr.lead_id
					inner join app.leadbeneficiary lbe on lea.id = lbe.lead_id and lin.insured_id = lbe.insured_id
					left outer join app.retail ret on lea.agent_id = ret.id
		where 	not lea.policy_id is null and
				lea.customer_id = p_customer_id and
				lin.insured_id = p_insured_id and
				lbe.beneficiary_id = p_beneficiary_id and
				lpr.product_id = p_product_id and
				((p_retail_id is null) or (ret.id = p_retail_id))
		into 	p_lead_id;
	
	end if;
	
	select	to_json(product)
	into	json_product
	from (	select 	pro.id as id,
					pro.name as name
			from 	app.product pro
			where 	pro.id = p_product_id) product;
    
	
	
		select	json_agg(json_build_object(
					'id', asi.id, 
					'name', asi.name,
					'assigned', json_build_object(
						'amount', asi.amount,
						'currency', asi.currency,
						'maximum', asi.maximum,
						'events', asi.events,
						'lack', asi.lack),
					'used', jsonb_build_object(
						'events', 0,
            			'total_amount', 0)))
		into	json_assistances
		from (	select 	asi.id as id,
						asi.name as name,
						pas.amount as amount,
						pas.currency as currency,
						pas.maximum as maximum,
						pas.events as events,
						pas.lack as lack
				from 	app.productassistance pas
							inner join app.assistance asi on pas.assistance_id = asi.id
				where 	pas.product_id = p_product_id
				order 	by
						pas.number) as asi;
					
	
		if not p_lead_id is null then
			
			select	json_build_object(
						'events', used.events,
						'total_amount', used.total_amount)
			into	json_used
			from (	select  cas.lead_id,
							count(1) as events,
							sum(case when cre.amount is null then 0 else cre.amount end) as total_amount
					from 	app.case cas
								left outer join app.casereimbursment cre on cas.id = cre.case_id and cre.status = 'Aprobado'
					where 	cas.lead_id = p_lead_id and
							cas.assistance_id = p_assistance_id
					group 	by
							cas.lead_id) as used;
		
	
		select	json_build_object(
					'id', assistance.id,
					'name', assistance.name,
					'assigned', json_build_object(
						'amount', assistance.amount,
						'currency', assistance.currency,
						'maximum', assistance.maximum,
						'events', assistance.events,
						'lack', assistance.lack),
					'used', case when json_used is null then json_build_object('events', 0, 'total_amount', 0) else json_used end)
		into	json_assistance
		from (	select 	asi.id as id,
						asi.name as name,
						pas.amount as amount,
						pas.currency as currency,
						pas.maximum as maximum,
						pas.events as events,
						pas.lack as lack
				from 	app.productassistance pas
							inner join app.assistance asi on pas.assistance_id = asi.id
				where 	pas.product_id = p_product_id and
						asi.id = p_assistance_id
				order 	by
						pas.number) as assistance;
		
	end if;
				
	select	json_agg(values)
	into	json_values
	from (	select	distinct
					val.id,
					val.name,
					case when lpv.value is null then '' else lpv.value end as value,
					val.family_id,
					ava.line_order
			from 	app.assistancevalue ava
						inner join app.value val on ava.value_id = val.id
						inner join app.productassistance pas on ava.assistance_id = pas.assistance_id
						left outer join app.leadproductvalue lpv on pas.product_id = lpv.product_id and lpv.lead_id = p_lead_id and lpv.insured_id = p_insured_id and val.id = lpv.value_id
			where 	pas.product_id = p_product_id
			order 	by
					val.family_id,
					ava.line_order) as values;
	
	select	case when json_assistances is null then
				json_build_object(
					'insured_id', p_insured_id,
					'beneficiary_id', p_beneficiary_id, 
					'retail_id', p_retail_id, 
					'customer_id', p_customer_id,
					'lead_id', p_lead_id,
					'product', json_product, 
					'assistance', json_assistance,
					'values', json_values)
			else
				json_build_object(
					'insured_id', p_insured_id,
					'beneficiary_id', p_beneficiary_id, 
					'retail_id', p_retail_id, 
					'customer_id', p_customer_id,
					'lead_id', p_lead_id,
					'product', json_product, 
					'assistances', json_assistances, 
					'assistance', json_assistance,
					'used', json_used,
					'values', json_values)
			end
    into	json_result;

    return	json_result;
	
END;
$function$
;
