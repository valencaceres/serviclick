CREATE OR REPLACE FUNCTION app.lead_upsert(p_product_plan_id uuid, p_insured_rut character varying, p_insured_name character varying, p_insured_paternal_last_name character varying, p_insured_maternal_last_name character varying, p_insured_address character varying, p_insured_district character varying, p_insured_email character varying, p_insured_phone character varying, p_insured_birthdate character varying, p_init_date character varying, p_end_date character varying)
 RETURNS TABLE(lead_id uuid, policy_id uuid, customer_id uuid, insured_id uuid, insured_email character varying)
 LANGUAGE plpgsql
AS $function$

DECLARE
    p_agent_id uuid;
    p_product_id uuid;
    p_plan_id int;
    p_price int;
    p_frequency varchar;
    p_customer_id uuid;
	p_person_id uuid;
    p_insured_id uuid;
    p_lead_id uuid;
	p_policy_id uuid;

BEGIN

    select  agent_id,
            product_id,
            plan_id,
            price,
            frequency
    from    app.productplan
    where   id = p_product_plan_id
    INTO    p_agent_id,
            p_product_id,
            p_plan_id,
            p_price,
            p_frequency;
      
    select 	district_name
    from 	app.district
    where 	upper(district_name) = upper(p_insured_district)
    into 	p_insured_district;
   
	if p_insured_district is null then
		p_insured_district := 'S/C';
	end if;

    select  cus.customer_id
    from    app.customer_upsert(
            p_insured_rut,
            p_insured_name,
            p_insured_paternal_last_name,
            p_insured_maternal_last_name,
            p_insured_address,
            p_insured_district,
            p_insured_email,
            p_insured_phone) as cus
    INTO    p_customer_id;
   
    select  per.person_id
    from    app.person_upsert(
            p_insured_rut,
            p_insured_name,
            p_insured_paternal_last_name,
            p_insured_maternal_last_name,
            p_insured_address,
            p_insured_district,
            p_insured_email,
            p_insured_phone,
            p_insured_birthdate) as per
    INTO    p_person_id;

    select  ins.insured_id
    from    app.insured_upsert(
            p_insured_rut,
            p_insured_name,
            p_insured_paternal_last_name,
            p_insured_maternal_last_name,
            p_insured_address,
            p_insured_district,
            p_insured_email,
            p_insured_phone,
            p_insured_birthdate) as ins
    INTO    p_insured_id;

    select 	lea.id,
    		lea.policy_id
    from 	app.customer cus
                inner join app.lead lea on cus.id = lea.customer_id
                inner join app.leadproduct lpr on lea.id = lpr.lead_id
                inner join app.productplan ppl on lpr.productplan_id = ppl.plan_id
                inner join app.leadinsured lin on lea.id = lin.lead_id
                inner join app.insured ins on lin.insured_id = ins.id
    where 	cus.rut = p_insured_rut and
    		ins.rut = p_insured_rut and
            ppl.id = p_product_plan_id and
            not lea.policy_id is null
    INTO 	p_lead_id,
   			p_policy_id;
   		
   	if p_lead_id is null then
   	
	    select 	lea.id,
	    		lea.policy_id
	    from 	app.customer cus
	                inner join app.lead lea on cus.id = lea.customer_id
	                inner join app.leadproduct lpr on lea.id = lpr.lead_id
	                inner join app.productplan ppl on lpr.productplan_id = ppl.plan_id
	                inner join app.leadinsured lin on lea.id = lin.lead_id
	                inner join app.insured ins on lin.insured_id = ins.id
	    where 	cus.rut = p_insured_rut and
	    		ins.rut = p_insured_rut and
	            ppl.id = p_product_plan_id
	    INTO 	p_lead_id,
	   			p_policy_id;   		
   	
	end if;

   	if p_lead_id is null then
	    
   		INSERT  INTO app.lead (createdate, customer_id, agent_id)
	    VALUES( now(), p_customer_id, p_agent_id )
	    RETURNING id INTO p_lead_id;

	    INSERT  INTO app.leadproduct (lead_id, product_id, price, currency_code, frequency_code, productplan_id)
	    VALUES( p_lead_id, p_product_id, p_price, 'P', p_frequency, p_plan_id);
	
	    INSERT  INTO app.leadinsured (lead_id, insured_id)
	    VALUES( p_lead_id, p_insured_id);

    end if;
   
   	if not p_policy_id is null then
   	
   		update	app.policy
   		set 	startdate = case when p_init_date = '' then startdate else TO_DATE(p_init_date,'YYYY-MM-DD') end,
   				enddate = case when p_end_date = '' then enddate else TO_DATE(p_end_date,'YYYY-MM-DD') end
   		where 	id = p_policy_id;
   	
   	end if;
   
	if p_policy_id is null then
		
		insert	into app.policy(createdate, startdate, enddate)
		values(	now(),
				case when p_init_date = '' then now() else TO_DATE(p_init_date,'YYYY-MM-DD') end,
				case when p_end_date = '' then now() else TO_DATE(p_end_date,'YYYY-MM-DD') end)
		returning id into p_policy_id;
	
		update 	app.lead
		set 	policy_id = p_policy_id
		where 	id = p_lead_id;
		
	end if;
   	
    RETURN 	QUERY
    SELECT  p_lead_id,
    		p_policy_id,
    		p_customer_id,
    		p_insured_id,
    		p_insured_email;
   
END;

$function$
;