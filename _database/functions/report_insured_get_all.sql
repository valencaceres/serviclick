CREATE OR REPLACE FUNCTION app.report_insured_get_all(p_rut character varying, p_name character varying, p_records integer, p_page integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_total int;
	p_insured int;
	p_products int;
	json_report json;

begin

	select	count(distinct ins.id),
			count(1)
	into	p_insured,
			p_products
	from	app.insured ins
				inner join app.leadinsured lin on ins.id = lin.insured_id
				inner join app.lead lea on lin.lead_id = lea.id
				inner join app.policy pol on lea.policy_id = pol.id
	where 	(pol.enddate is null or pol.enddate::date >= now()::date) and
			(p_rut is null or ins.rut = p_rut) and
			(p_name is null or lower(trim(concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname))) like concat('%', p_name, '%'));

	if p_records is null then
		p_records := p_insured;
		p_page := 1;
	end if;

	if p_page is null then
		p_page := 1;
	end if;

	p_total := ceil(p_insured::numeric / p_records::numeric);
	
	select	json_build_object(
				'summary', json_build_object(
					'insured', p_insured,
					'products', p_products),
				'pagination', json_build_object(
					'total', p_total,
					'page', p_page,
					'records', p_records),
				'data', json_agg(json_build_object(
					'id', ins.id,
					'rut', ins.rut,
					'name', ins.name,
					'products', ins.products)))
	into 	json_report
	from (	
		select 	ins.id,
				max(ins.rut) as rut,
				max(concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname)) as name,
				count(1) as products
		from 	app.insured ins
					inner join app.leadinsured lin on ins.id = lin.insured_id
					inner join app.lead lea on lin.lead_id = lea.id
					inner join app.policy pol on lea.policy_id = pol.id
		where 	(pol.enddate is null or pol.enddate::date >= now()::date) and
				(p_rut is null or ins.rut = p_rut) and
				(p_name is null or lower(trim(concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname))) like concat('%', p_name, '%'))
		group 	by
				ins.id
		order 	by
				max(concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname))
		limit 	p_records
		offset  (p_page - 1) * p_records) as ins;

    return	json_report;
	
end;
$function$
;