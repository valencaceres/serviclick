CREATE OR REPLACE FUNCTION app.report_customer_get_all(p_rut character varying, p_name character varying, p_records integer, p_page integer)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_total int;
	p_customer int;
	p_products int;
	json_report json;

begin

	select	count(distinct cus.id),
			count(1)
	into	p_customer,
			p_products
	from	app.customer cus
				inner join app.lead lea on cus.id = lea.customer_id
				inner join app.policy pol on lea.policy_id = pol.id
	where 	(pol.enddate is null or pol.enddate::date >= now()::date) and
			(p_rut is null or cus.rut = p_rut) and
			(p_name is null or lower(trim(concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname))) like concat('%', p_name, '%'));

	if p_records is null then
		p_records := p_customer;
		p_page := 1;
	end if;

	if p_page is null then
		p_page := 1;
	end if;

	p_total := ceil(p_customer::numeric / p_records::numeric);
	
	select	json_build_object(
				'summary', json_build_object(
					'customer', p_customer,
					'products', p_products),
				'pagination', json_build_object(
					'total', p_total,
					'page', p_page,
					'records', p_records),
				'data', json_agg(json_build_object(
					'id', cus.id,
					'rut', cus.rut,
					'name', cus.name,
					'products', cus.products)))
	into 	json_report
	from (	
		select 	cus.id,
				max(cus.rut) as rut,
				max(concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname)) as name,
				count(1) as products
		from	app.customer cus
					inner join app.lead lea on cus.id = lea.customer_id
					inner join app.policy pol on lea.policy_id = pol.id
		where 	(pol.enddate is null or pol.enddate::date >= now()::date) and
				(p_rut is null or cus.rut = p_rut) and
				(p_name is null or lower(trim(concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname))) like concat('%', p_name, '%'))
		group 	by
				cus.id
		order 	by
				max(concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname))
		limit 	p_records
		offset  (p_page - 1) * p_records) as cus;

    return	json_report;
	
end;
$function$
;