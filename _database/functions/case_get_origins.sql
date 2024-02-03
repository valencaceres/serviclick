-- DROP FUNCTION app.case_get_origins();

CREATE OR REPLACE FUNCTION app.case_get_origins()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    json_report json;
BEGIN
    SELECT json_agg(json_build_object(
            'id', tab.id,
            'name', tab.name
        ))
    INTO json_report
    FROM (
        SELECT DISTINCT
            ret.id,
            ret.name
        FROM app.case cas
        LEFT OUTER JOIN app.retail ret ON cas.retail_id = ret.id
        WHERE cas.retail_id IS NOT NULL AND ret.id IS NOT NULL

        union
        
            SELECT DISTINCT
            bro.id,
            bro.name
        FROM app.case cas
        LEFT OUTER JOIN app.broker bro ON cas.retail_id = bro.id
        WHERE cas.retail_id IS NOT NULL AND bro.id IS NOT NULL

        UNION

        SELECT DISTINCT
            age.id,
            age.name
        FROM app.case cas
        LEFT OUTER JOIN app.agent age ON cas.retail_id = age.id
        WHERE cas.retail_id IS NOT NULL AND age.id IS NOT NULL

       
    ) AS tab;

    RETURN json_report;
END;
$function$
;