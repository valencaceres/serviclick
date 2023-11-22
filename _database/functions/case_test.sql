CREATE OR REPLACE FUNCTION app.case_test(p_product json)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$

declare
	p_product_id uuid;

begin
	
	if not p_product is null then
		p_product_id := (p_product->>'id')::uuid;
	end if;
	
	RETURN	p_product_id;
	
end;

$function$
;
