
drop function app.case_get_by_id;
CREATE OR REPLACE FUNCTION app.case_get_by_id(p_case_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_user_id varchar;
	p_lead_id uuid;
	p_insured_id uuid;
	p_product_id uuid;
	p_assistance_id uuid;
	json_case JSON;
	json_used JSON;
	json_values JSON;
	json_files JSON;
	json_refund JSON;
	json_specialist JSON;
	json_alliance JSON;
	json_cost JSON;
	json_history JSON;
	json_result JSON;

begin
		
	select 	lead_id,
			insured_id,
			product_id,
			assistance_id
	from	app.case cas
	where 	cas.id = p_case_id
	into 	p_lead_id,
			p_insured_id,
			p_product_id,
			p_assistance_id;
		
	select 	json_agg(json_build_object(
					'code', his.code,
					'date', to_char(his.createddate, 'DD/MM/YYYY'),
					'time', to_char(his.createddate, 'HH24:MI'),
					'user', his.user_id,
					'name', his.stage_name))
	into	json_history
	from (	select	sta.code,
					cst.createddate,
					cst.stage_id,
					cst.user_id,
					sta.name as stage_name
			from	app.casestage cst
						inner join app.stage sta on cst.stage_id = sta.id
			where 	cst.case_id = p_case_id
			order	by
					cst.createddate desc,
					sta.number desc) as his;
				
	select	json_agg(values)
	into	json_values
	from (	select	distinct
					val.id,
					val.name,
					lpv.value,
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
					
		select	json_agg(json_build_object(
					'document_id', cat.document_id,
					'document_name', cat.document_name,
					'file_tag', cat.file_tag))
		into	json_files
		from (	select  cat.document_id,
						doc.name as document_name,
						cat.file_tag
				from 	app.casestageattach cat
							inner join app.document doc on cat.document_id = doc.id
				where 	cat.case_id = p_case_id) as cat;
			
		select	json_build_object(
					'amount', json_build_object(
						'required', cas.register_amount,
						'refunded', cas.amount),
					'imed', json_build_object(
						'required', cas.register_imedamount,
						'refunded', cas.imed_amount),
					'status', cas.status,
					'comment', cas.comment)
		into	json_refund
		from (	select  cre.case_id,
						cre.amount,
						cre.register_amount,
						cre.imed_amount,
						cre.register_imedamount,
						cre.status,
						cre.comment
				from 	app.casereimbursment cre
				where 	cre.case_id = p_case_id) as cas;
			
	select 	json_build_object(
				'amount', cas.amount,
				'extra', cas.extraamount,
				'comment', cas.comment)
	into 	json_cost
	from (	select 	amount,
					extraamount,
					comment
			from 	app.casesummary
			where 	case_id = p_case_id) as cas;
			
	select	json_build_object(
				'specialist_id', cas.specialist_id,
				'specialist_name', cas.specialist_name,
				'specialty_id', cas.specialty_id,
				'specialty_name', cas.specialty_name,
				'district_id', cas.district_id,
				'district_name', cas.district_name,
				'scheduled_date', cas.date,
				'scheduled_time', cas.time,
				'confirmed', cas.confirmed,
				'completed', cas.completed,
				'qualification_id', cas.qualification_id,
				'qualification_name', cas.qualification_name,
				'comment', cas.comment)
	into	json_specialist
	from (	select 	spe.id as specialist_id,
					concat(per.name, ' ', per.paternallastname, ' ', per.maternallastname) as specialist_name,
					sty.id as specialty_id,
					sty.name as specialty_name,
					dis.id as district_id,
					dis.district_name as district_name,
					case when csp.confirmed_date is null then csp.scheduled_date else csp.confirmed_date end as date,
					case when csp.confirmed_time is null then csp.scheduled_time else csp.confirmed_time end as time,
					csp.confirmed,
					csp.completed,
					csp.qualification_id,
					qua.name as qualification_name,
					csp.comment
			from 	app.casestagespecialist csp
						inner join app.specialist spe on csp.specialist_id = spe.id
						inner join app.person per on spe.person_id = per.id
						inner join app.district dis on csp.district_id = dis.id
						inner join app.specialty sty on csp.specialty_id = sty.id
						left outer join app.qualification qua on csp.qualification_id = qua.id
			where 	csp.case_id = p_case_id) as cas;
			
	select	json_build_object(
				'partner_id', cas.partner_id,
				'partner_name', cas.partner_name,
				'partner_address', cas.partner_address,
				'partner_district', cas.partner_district,
				'partner_email', cas.partner_email,
				'partner_phone', cas.partner_phone,
				'specialty_id', cas.specialty_id,
				'specialty_name', cas.specialty_name,
				'scheduled_date', cas.date,
				'scheduled_time', cas.time,
				'confirmed', cas.confirmed,
				'completed', cas.completed,
				'qualification_id', cas.qualification_id,
				'qualification_name', cas.qualification_name,
				'comment', cas.comment)
	into	json_alliance
	from (	select 	csp.case_id,
					spe.id as partner_id,
					spe.name as partner_name,
					spe.address as partner_address,
					spe.district as partner_district,
					spe.email as partner_email,
					spe.phone as partner_phone,
					sty.id as specialty_id,
					sty.name as specialty_name,
					case when csp.confirmed_date is null then csp.scheduled_date else csp.confirmed_date end as date,
					case when csp.confirmed_time is null then csp.scheduled_time else csp.confirmed_time end as time,
					csp.confirmed,
					csp.completed,
					csp.qualification_id,
					qua.name as qualification_name,
					csp.comment
			from 	app.casestagepartner csp
						inner join app.partner spe on csp.partner_id = spe.id
						inner join app.specialty sty on csp.specialty_id = sty.id
						left outer join app.qualification qua on csp.qualification_id = qua.id
			where 	csp.case_id = p_case_id) as cas;
	
	select 	json_build_object(
			'case_id', cas.id,
			'user_id', '',
			'date', to_char(cas.createddate, 'DD/MM/YYYY'),
			'time', to_char(cas.createddate, 'HH24:MI'),
			'case_number', cas.number,
			'type', cas.type,
			'lead_id', cas.lead_id,
			'policy', json_build_object(
				'id', cas.policy_id,
				'startDate', cas.policy_startdate,
				'endDate', cas.policy_enddate),
			'retail', case when cas.retail_id is null then null else json_build_object(
				'id', cas.retail_id,
				'rut', cas.retail_rut,
				'name', cas.retail_name) end,
			'customer', json_build_object(
				'id', cas.customer_id,
				'rut', cas.customer_rut,
				'name', cas.customer_name),
			'insured', json_build_object(
				'id', cas.insured_id,
				'rut', cas.insured_rut,
				'name', cas.insured_name,
				'paternalLastName', cas.insured_paternallastname,
				'maternalLastName', cas.insured_maternallastname,
				'address', cas.insured_address,
				'district', cas.insured_district,
				'phone', cas.insured_phone,
				'email', cas.insured_email,
				'birthDate', cas.insured_birthdate),
			'beneficiary', case when cas.beneficiary_id is null then null else json_build_object(
				'id', cas.beneficiary_id,
				'rut', cas.beneficiary_rut,
				'name', cas.beneficiary_name,
				'paternalLastName', cas.beneficiary_paternallastname,
				'maternalLastName', cas.beneficiary_maternallastname,
				'address', cas.beneficiary_address,
				'district', cas.beneficiary_district,
				'phone', cas.beneficiary_phone,
				'email', cas.beneficiary_email,
				'birthDate', cas.beneficiary_birthdate) end,
			'product', json_build_object(
				'id', cas.product_id,
				'name', cas.product_name),
			'assistance', json_build_object(
				'id', cas.assistance_id,
				'name', cas.assistance_name,
				'assigned', json_build_object(
					'amount', cas.assistance_amount,
					'currency', cas.assistance_currency,
					'maximum', cas.assistance_maximum,
					'events', cas.assistance_events,
					'lack', cas.assistance_lack),
				'used', json_used),
			'values', json_values,
			'event', json_build_object(
				'date', cas.event_date,
				'location', cas.event_location,
				'description', cas.event_description),
			'files', json_files,
			'procedure_id', cas.procedure_id,
			'refund', json_refund,
			'specialist', json_specialist,
			'alliance', json_alliance,
			'cost', json_cost,
			'status', json_build_object(
			'isClosed', cas.isclosed,
			'description', cas.description_closed),
			'history', json_history)
	into	json_case
	from (	select	cas.id as id,
					cas.createddate as createddate,
					cas.number as number,
					cas.isclosed,
					cas.description_closed,
					cas.type as type,
					lea.id as lead_id,
					pol.id as policy_id,
					pol.startdate as policy_startdate,
					pol.enddate as policy_enddate,
					ret.id as retail_id,
					ret.rut as retail_rut,
					ret.name as retail_name,
					cus.id as customer_id,
					cus.rut as customer_rut,
					concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as customer_name,
					ins.id as insured_id,
					ins.rut as insured_rut,
					ins.name as insured_name,
					ins.paternallastname as insured_paternallastname,
					ins.maternallastname as insured_maternallastname,
					ins.address as insured_address,
					ins.district as insured_district,
					ins.email as insured_email,
					ins.phone as insured_phone,
		            ins.birthdate as insured_birthdate,
					ben.id as beneficiary_id,
					ben.rut as beneficiary_rut,
					ben.name as beneficiary_name,
					ben.paternallastname as beneficiary_paternallastname,
					ben.maternallastname as beneficiary_maternallastname,
					ben.address as beneficiary_address,
					ben.district as beneficiary_district,
					ben.email as beneficiary_email,
					ben.phone as beneficiary_phone,
		            ben.birthdate as beneficiary_birthdate,
		            pro.id as product_id,
		            pro.name as product_name,
		            asi.id as assistance_id,
		            asi.name as assistance_name,
					pas.amount as assistance_amount,
					pas.currency as assistance_currency,
					pas.maximum as assistance_maximum,
					pas.events as assistance_events,
					pas.lack as assistance_lack,
		            cas.event_date as event_date,
		            case when cas.event_location is null then '' else cas.event_location end as event_location,
		            cas.event_description as event_description,
		            cas.procedure_id as procedure_id
			from 	app.case cas
						inner join app.customer cus on cas.customer_id = cus.id
						inner join app.insured ins on cas.insured_id = ins.id
						inner join app.product pro on cas.product_id = pro.id
						inner join app.assistance asi on cas.assistance_id = asi.id
						inner join app.productassistance pas on asi.id = pas.assistance_id and pro.id = pas.product_id
						inner join app.lead lea on cas.lead_id = lea.id
						inner join app.policy pol on lea.policy_id = pol.id
						left outer join app.retail ret on cas.retail_id = ret.id				
						left outer join app.beneficiary ben on cas.beneficiary_id = ben.id
			where 	cas.id = p_case_id) as cas;
	
    return	json_case;
	
end;
$function$
;