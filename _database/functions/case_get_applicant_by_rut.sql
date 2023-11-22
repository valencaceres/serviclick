CREATE OR REPLACE FUNCTION app.case_get_applicant_by_rut(p_rut character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_lead_id uuid;
	json_product JSON;
   	json_assistances JSON;
	json_values JSON;
	json_result JSON;

begin
	
	if exists(	select 	1
				from 	app.beneficiary ben
							inner join app.leadbeneficiary lbe on ben.id = lbe.beneficiary_id
							inner join app.leadinsured lin on lbe.insured_id = lin.insured_id
							inner join app.insured ins on lin.insured_id = ins.id
							inner join app.lead lea on lbe.lead_id = lea.id and not lea.policy_id is null
				where 	ben.rut = p_rut) then

		select	json_build_object(
				'type',			result.type,
				'retail', 		case when result.retail_id is null then null else json_build_object(
									'id', result.retail_id,
									'rut', result.retail_rut,
									'name', result.retail_name) end,
				'customer', 	json_build_object(
									'id', result.customer_id,
									'rut', result.customer_rut,
									'name', result.customer_name),
				'insured', 		json_build_object(
									'id', result.customer_id,
									'rut', result.customer_rut,
									'name', result.customer_name,
									'paternalLastName', result.insured_paternallastname,
									'maternalLastName', result.insured_maternallastname,
									'address', result.insured_address,
									'district', result.insured_district,
									'email', result.insured_email,
									'phone', result. insured_phone,
									'birthDate', result.insured_birthdate),
				'beneficiary', 	json_build_object(
									'id', result.beneficiary_id,
									'rut', result.beneficiary_rut,
									'name', result.beneficiary_name,
									'paternalLastName', result.beneficiary_paternallastname,
									'maternalLastName', result.beneficiary_maternallastname,
									'address', result.beneficiary_address,
									'district', result.beneficiary_district,
									'email', result.beneficiary_email,
									'phone', result. beneficiary_phone,
									'birthDate', result.beneficiary_birthdate),
				'products', 	json_agg(json_build_object(
									'id', result.product_id,
									'name', result.product_name)))
		into 	json_result
		from (	select	distinct
						'B'::varchar as type,
						ret.id::varchar as retail_id,
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
				        pro.name as product_name
				from 	app.beneficiary ben
							inner join app.leadbeneficiary lbe on ben.id = lbe.beneficiary_id
							inner join app.leadinsured lin on lbe.insured_id = lin.insured_id and lbe.lead_id = lin.lead_id
							inner join app.insured ins on lin.insured_id = ins.id
							inner join app.lead lea on lbe.lead_id = lea.id and not lea.policy_id is null
							inner join app.leadproduct lpr on lea.id = lpr.lead_id
							inner join app.productplan ppl on lpr.product_id = ppl.product_id and lpr.productplan_id = ppl.plan_id
							inner join app.product pro on ppl.product_id = pro.id and pro.beneficiaries > 0
							inner join app.customer cus on lea.customer_id = cus.id
							left outer join app.retail ret on ppl.agent_id = ret.id
				where 	ben.rut = p_rut
				order 	by
						customer_name,
						product_name) as result
		group	by
				result.type,
				result.insured_id,
				result.insured_rut,
				result.insured_name,
				result.insured_paternallastname,
				result.insured_maternallastname,
				result.insured_address,
				result.insured_district,
				result.insured_email,
				result.insured_phone,
				result.insured_birthdate,
				result.beneficiary_id,
				result.beneficiary_rut,
				result.beneficiary_name,
				result.beneficiary_paternallastname,
				result.beneficiary_maternallastname,
				result.beneficiary_address,
				result.beneficiary_district,
				result.beneficiary_email,
				result.beneficiary_phone,
				result.beneficiary_birthdate,
				result.customer_id,
				result.customer_rut,
				result.customer_name,
				result.retail_id,
				result.retail_rut,
				result.retail_name;
						
		return	json_result;

	end if;

	select	json_build_object(
			'type',			result.type,
			'retail', 		case when result.retail_id is null then null else json_build_object(
								'id', result.retail_id,
								'rut', result.retail_rut,
								'name', result.retail_name) end,
			'customer', 	json_build_object(
								'id', result.customer_id,
								'rut', result.customer_rut,
								'name', result.customer_name),
			'insured', 		json_build_object(
								'id', result.insured_id,
								'rut', result.insured_rut,
								'name', result.insured_name,
								'paternalLastName', result.insured_paternallastname,
								'maternalLastName', result.insured_maternallastname,
								'address', result.insured_address,
								'district', result.insured_district,
								'email', result.insured_email,
								'phone', result. insured_phone,
								'birthDate', result.insured_birthdate),
			'beneficiary',	null,
			'products', 	json_agg(json_build_object(
								'id', result.product_id,
								'name', result.product_name)))
	into 	json_result
	from (	select	distinct
					'I'::varchar as type,
					ret.id::varchar as retail_id,
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
			        pro.id as product_id,
			        pro.name as product_name
			from 	app.insured ins
						inner join app.leadinsured lin on ins.id = lin.insured_id
						inner join app.lead lea on lin.lead_id = lea.id and not lea.policy_id is null
						inner join app.leadproduct lpr on lea.id = lpr.lead_id
						inner join app.productplan ppl on lpr.product_id = ppl.product_id and lpr.productplan_id = ppl.plan_id
						inner join app.product pro on ppl.product_id = pro.id
						inner join app.customer cus on lea.customer_id = cus.id
						left outer join app.retail ret on ppl.agent_id = ret.id
			where 	ins.rut = p_rut
			order 	by
					customer_name,
					product_name) as result
	group	by
			result.type,
			result.insured_id,
			result.insured_rut,
			result.insured_name,
			result.insured_paternallastname,
			result.insured_maternallastname,
			result.insured_address,
			result.insured_district,
			result.insured_email,
			result.insured_phone,
			result.insured_birthdate,
			result.customer_id,
			result.customer_rut,
			result.customer_name,
			result.retail_id,
			result.retail_rut,
			result.retail_name;
						
	return	json_result;
	
END;
$function$
;
