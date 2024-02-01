-- DROP FUNCTION app.case_get_all(uuid, varchar, varchar, uuid, int4, int4);

CREATE OR REPLACE FUNCTION app.case_get_all(p_retail_id uuid, p_applicant_rut character varying, p_applicant_name character varying, p_stage_id uuid, p_records integer, p_page integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_cases int;
	p_total int;
	json_cases JSON;

begin
	
	select 	count(1)
	into	p_cases
	from	app.case cas
				inner join app.assistance asi on cas.assistance_id = asi.id
				inner join app.lead lea on cas.lead_id = lea.id
				inner join app.customer cus on cas.customer_id = cus.id
				inner join app.insured ins on cas.insured_id = ins.id
				inner join app.stage sta on cas.stage_id = sta.id
				left outer join app.beneficiary ben on cas.beneficiary_id = ben.id
				left outer join app.retail ret on cas.retail_id = ret.id
	where 	((p_retail_id is null) or (lea.agent_id = p_retail_id)) and
			((p_stage_id is null) or (cas.stage_id = p_stage_id)) and
			((p_applicant_rut is null) or (case when ben.id is null then ins.rut else ben.rut end = p_applicant_rut)) and
			((p_applicant_name is null) or (lower(trim(case when ben.id is null then concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname) else concat(ben.name, ' ', ben.paternallastname, ' ', ben.maternallastname) end)) like concat('%', lower(trim(p_applicant_name)), '%')));
			
	if p_records is null then
		p_records := p_cases;
		p_page := 1;
	end if;

	if p_page is null then
		p_page := 1;
	end if;

	p_total := ceil(p_cases::numeric / p_records::numeric);

	select	json_build_object(
				'summary', json_build_object(
					'cases', p_cases),
				'pagination', json_build_object(
					'total', p_total,
					'page', p_page,
					'records', p_records),
				'data', json_agg(json_build_object(
					'id', cas.id,
					'number', cas.number,
					'createddate', cas.createddate,
					'customer_id', cas.customer_id,
					'customer_name', cas.customer_name,
					'applicant_rut', cas.applicant_rut,
					'applicant_name', cas.applicant_name,
					'assistance_name', cas.assistance_name,
					'stage_id', cas.stage_id,
					'stage_name', cas.stage_name,
					'code', cas.stage_code)))
	into	json_cases
	from (	select	cas.id,
					cas.number,
					cas.createddate,
					case when ret.id is null then cus.id else ret.id end as customer_id,
					case when ret.id is null then concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) else ret.name end as customer_name,
					case when ben.id is null then ins.rut else ben.rut end as applicant_rut,
					case when ben.id is null then concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname) else concat(ben.name, ' ', ben.paternallastname, ' ', ben.maternallastname) end as applicant_name,
					asi.name as assistance_name,
					cas.stage_id as stage_id,
					sta.code as stage_code,
					sta.name as stage_name
			from	app.case cas
						inner join app.assistance asi on cas.assistance_id = asi.id
						inner join app.lead lea on cas.lead_id = lea.id
						inner join app.customer cus on cas.customer_id = cus.id
						inner join app.insured ins on cas.insured_id = ins.id
						inner join app.stage sta on cas.stage_id = sta.id
						left outer join app.beneficiary ben on cas.beneficiary_id = ben.id
						left outer join app.retail ret on cas.retail_id = ret.id
			where 	((p_retail_id is null) or (lea.agent_id = p_retail_id)) and
					((p_stage_id is null) or (cas.stage_id = p_stage_id)) and
					((p_applicant_rut is null) or (case when ben.id is null then ins.rut else ben.rut end = p_applicant_rut)) and
					((p_applicant_name is null) or (lower(trim(case when ben.id is null then concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname) else concat(ben.name, ' ', ben.paternallastname, ' ', ben.maternallastname) end)) like concat('%', lower(trim(p_applicant_name)), '%')))
			order 	by
					cas.number desc
			limit 	p_records
			offset  (p_page - 1) * p_records) as cas;
				
    return	json_cases;
	
end;
$function$
;
