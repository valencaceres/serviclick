CREATE OR REPLACE FUNCTION app.case_upsert(p_case_id uuid, p_user_id character varying, p_type character varying, p_insured json, p_beneficiary json, p_customer json, p_retail json, p_product json, p_assistance json, p_lead_id uuid, p_values json[], p_event json, p_files json[], p_procedure_id uuid, p_refund json, p_specialist json, p_alliance json, p_cost json)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	p_retail_id uuid;
	p_customer_id uuid;
	p_insured_id uuid;
	p_beneficiary_id uuid;
	p_product_id uuid;
	p_assistance_id uuid;
	p_refund_json JSON;
	item JSON;
	json_case JSON;
	json_values JSON;
	json_files JSON;
	json_history JSON;
	json_result JSON;

begin
	
	if not p_retail is null then
		p_retail_id := (p_retail->>'id')::uuid;
	end if;

	if not p_customer is null then
		p_customer_id := (p_customer->>'id')::uuid;
	end if;

	if not p_insured is null then
		p_insured_id := (p_insured->>'id')::uuid;
	end if;

	if not p_beneficiary is null then
		p_beneficiary_id := (p_beneficiary->>'id')::uuid;
	end if;

	if not p_product is null then
		p_product_id := (p_product->>'id')::uuid;
	end if;

	if not p_assistance is null then
		p_assistance_id := (p_assistance->>'id')::uuid;
	end if;
	
	if p_case_id is null then
	
		insert	into app.case(
				type,
				retail_id,
				customer_id,
				insured_id,
				beneficiary_id,
				product_id,
				assistance_id,
				lead_id)
		select 	p_type,
				p_retail_id,
				p_customer_id,
				p_insured_id,
				p_beneficiary_id,
				p_product_id,
				p_assistance_id,
				p_lead_id
		returning id into p_case_id;
		
	end if;

	perform	app.case_stage_upsert (
	    p_case_id,
	    'f11bc238-9f08-4284-a296-81f1f7acc130',
	    p_user_id
	);
	
	if not p_beneficiary_id is null then
	
		perform	app.case_stage_upsert (
		    p_case_id,
		    'c61c7987-a614-462a-bcf0-d939f63037a1'::uuid,
		    p_user_id
		);
	
	end if;

	if not p_values is null then
		
		foreach item in array p_values
		loop
		    insert into app.leadproductvalue (
		        lead_id,
		        product_id,
		        insured_id,
		        value_id,
		        value)
			values (
		        p_lead_id,
		        p_product_id,
		        p_insured_id,
		        (item->>'id')::uuid,
		        item->>'value')
		    on conflict (lead_id, product_id, insured_id, value_id)
		    do update
		    set value = item->>'value';
		end loop;

	end if;
	
	perform	app.case_stage_upsert (
	    p_case_id,
	    'aab315fa-6b7a-4b73-96f1-dfda6cd9f2be'::uuid,
	    p_user_id
	);

	if not p_event is null then
	
		update 	app.case
		set 	event_date = (p_event->>'date')::date,
				event_location = (p_event->>'location')::varchar,
				event_description = (p_event->>'description')::varchar
		where 	id = p_case_id;
		
		perform	app.case_stage_upsert (
		    p_case_id,
		    '34a209ea-a027-46b6-8dcf-61d62ee19cd2'::uuid,
		    p_user_id
		);
		
	end if;

	if not p_files is null then
		
		delete 	from app.casestageattach
		where 	case_id = p_case_id;
	
		foreach item in array p_files
		loop
		    insert into app.casestageattach (
		        case_id,
		        document_id,
		        file_date,
		        file_tag)
			values (
		        p_case_id,
		        (item->>'document_id')::uuid,
		        now(),
		        (item->>'file_tag'));
		end loop;
			
	end if;

	if not p_procedure_id is null then
		
		update	app.case
		set 	procedure_id = p_procedure_id
		where 	id = p_case_id;
	
		if p_procedure_id = '788b10c8-cb71-4afe-8aa5-4d8e484c2e63' then
		
			p_refund_json := (p_refund->>'amount')::json;
			
			if not p_refund_json is null then
			
				insert	into app.casereimbursment(
						case_id,
						user_id,
						register_amount,
						application_date)
				values(	p_case_id,
						p_user_id,
						(p_refund_json->>'required')::int,
						now())
				on 		conflict (case_id)
			    do 		nothing;
			
				perform	app.case_stage_upsert (
					p_case_id,
					'32db9ffe-6ee5-4b43-a27d-4811176d822f'::uuid,
					p_user_id
				);
			
			end if;
			
		end if;
	
		if p_procedure_id = 'cfb3a7ab-686b-4dd9-ba56-df2a1adb9682' then
		
			p_refund_json := (p_refund->>'imed')::json;
			
			if not p_refund_json is null then
				
				insert	into app.casereimbursment(
						case_id,
						user_id,
						register_imedamount,
						application_date)
				values(	p_case_id,
						p_user_id,
						(p_refund_json->>'required')::int,
						now())
				on 		conflict (case_id)
			    do 		nothing;
				
				perform	app.case_stage_upsert (
					p_case_id,
					'3134ab63-ccb4-42bc-a32b-ac53a530f2ee'::uuid,
					p_user_id
				);
			
			end if;
			
		end if;
		
		if p_procedure_id = 'bc1698ca-9800-40d9-a2ed-8f595b36c06f' and not p_specialist is null then
			
			insert	into app.casestagespecialist (
					case_id,
					specialist_id,
					specialty_id,
					district_id,
					scheduled_date,
					scheduled_time,
					confirmed,
					completed,
					qualification_id,
					comment)
			values(	p_case_id,
					(p_specialist->>'specialist_id')::uuid,
					(p_specialist->>'specialty_id')::uuid,
					(p_specialist->>'district_id')::uuid,
					(p_specialist->>'scheduled_date')::date,
					(p_specialist->>'scheduled_time')::time,
		    		(p_specialist->>'confirmed')::boolean,
		    		(p_specialist->>'completed')::boolean,
					(case when p_specialist->>'qualification_id' = '' then null else p_specialist->>'qualification_id' end)::uuid,
					(p_specialist->>'comment')::varchar)
			on 		conflict (case_id)
		    do 		update
		    set 	confirmed_date = (p_specialist->>'scheduled_date')::date,
		    		confirmed_time = (p_specialist->>'scheduled_time')::time,
		    		confirmed = (p_specialist->>'confirmed')::boolean,
		    		completed = (p_specialist->>'completed')::boolean,
		    		qualification_id = (case when p_specialist->>'qualification_id' = '' then null else p_specialist->>'qualification_id' end)::uuid,
					comment = (p_specialist->>'comment')::varchar;
			
			perform	app.case_stage_upsert (
				p_case_id,
				'bf16e693-c7ef-41fe-8a3e-49e3a7c9a6c3'::uuid,
				p_user_id
			);
			
		end if;
	
		if p_procedure_id = 'fb3ca6af-cad1-4f90-ad6b-9d393f1e9566' and not p_alliance is null then
		
			insert	into app.casestagepartner (
					case_id,
					partner_id,
					specialty_id,
					scheduled_date,
					scheduled_time,
					confirmed,
					completed,
					qualification_id,
					comment)
			values(	p_case_id,
					(p_alliance->>'partner_id')::uuid,
					(p_alliance->>'specialty_id')::uuid,
					(p_alliance->>'scheduled_date')::date,
					(p_alliance->>'scheduled_time')::time,
		    		(p_alliance->>'confirmed')::boolean,
		    		(p_alliance->>'completed')::boolean,
					(p_alliance->>'qualification_id')::uuid,
					(p_alliance->>'comment')::varchar)
			on 		conflict (case_id)
		    do 		update
		    set 	confirmed_date = (p_alliance->>'scheduled_date')::date,
		    		confirmed_time = (p_alliance->>'scheduled_time')::time,
		    		confirmed = (p_alliance->>'confirmed')::boolean,
		    		completed = (p_alliance->>'completed')::boolean,
		    		qualification_id = (p_alliance->>'qualification_id')::uuid,
					comment = (p_alliance->>'comment')::varchar;
			
			perform	app.case_stage_upsert (
				p_case_id,
				'e1a1797a-0dfd-44fc-bf24-cd9a1dbd3730'::uuid,
				p_user_id
			);
		
		end if;
	
	end if;

	if not p_cost is null then
		
		insert	into app.casesummary (
				case_id,
				amount,
				extraamount,
				comment)
		values(	p_case_id,
				(p_cost->>'amount')::int,
				(p_cost->>'extra')::int,
				(p_cost->>'comment')::varchar)
		on 		conflict (case_id)
	    do 		update
	    set 	amount = (p_cost->>'amount')::int,
	    		extraamount = (p_cost->>'extra')::int,
	    		comment = (p_cost->>'comment')::varchar;

	    /*
		perform	app.case_stage_upsert (
			p_case_id,
			'78e32120-3537-412f-9aab-68758ef02459'::uuid,
			p_user_id
		);
		*/
	
	end if;
	
	RETURN	app.case_get_by_id(p_case_id);
	
end;
$function$
;
