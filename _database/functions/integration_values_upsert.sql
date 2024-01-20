drop function app.integration_values_upsert;
CREATE OR REPLACE FUNCTION app.integration_values_upsert(
    p_lead_id uuid,
    p_product_id uuid,
    p_insured_id uuid,
    p_value_id uuid,
    p_input_value varchar
) RETURNS TABLE(leadintegration_id uuid)

LANGUAGE plpgsql
AS $function$
DECLARE
BEGIN
    RETURN query
    INSERT INTO app.leadproductvalue (lead_id, product_id, insured_id, value_id, value)
    VALUES (
        p_lead_id,
        p_product_id,
        p_insured_id,
        p_value_id,
        p_input_value
    )
    ON CONFLICT (lead_id, product_id, insured_id, value_id)
    DO UPDATE 
    SET value = p_input_value
    RETURNING lead_id;

END;
$function$;