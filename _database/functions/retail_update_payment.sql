CREATE OR REPLACE FUNCTION app.retail_update_payment(p_retail_id uuid, p_json_lead_code json[])
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	item JSON;

begin
	
	if not p_json_lead_code is null then
		
		foreach item in array p_json_lead_code
		loop
		    insert into app.leadpayment (
		        lead_id,
		        code)
			values (
		        (item->>'lead_id')::uuid,
		        (item->>'code')::varchar)
		    on conflict (lead_id)
		    do update
		    set code = (item->>'code')::varchar;
		end loop;

	end if;

	return app.retail_get_payment(p_retail_id);
	
end;
$function$
;