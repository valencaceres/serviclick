DROP FUNCTION  app.integration_lead_feedback;

CREATE OR REPLACE FUNCTION app.integration_lead_feedback(
    p_lead_id uuid,
    p_status int
) RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
    result jsonb;
BEGIN
    INSERT INTO app.leadpayment (createddate, lead_id, code)
    VALUES (
        CURRENT_DATE,
        p_lead_id,
        p_status
    )
    ON CONFLICT (lead_id) DO UPDATE
    SET code = p_status
    RETURNING jsonb_build_object('lead_id', lead_id, 'status', code)
    INTO result;

    RETURN result;
END;
$function$;