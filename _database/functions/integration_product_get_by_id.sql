-- DROP FUNCTION app.integration_product_get_by_id(uuid);

CREATE OR REPLACE FUNCTION app.integration_product_get_by_id(p_product_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    json_result JSON;
BEGIN
    SELECT TO_JSON(product)
    INTO json_result
    FROM (
        SELECT
            pro.id,
            pro.name,
            prd.description,
            pro.frequency,
            pro.currency,
            ppl.price,
            (
                SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', asi.id, 
                        'name', asi.name,
                        'amount', pas.amount,
                        'currency', pas.currency,
                        'maximum', pas.maximum,
                        'events', pas.events,
                        'lack', pas.lack
                    )
                )
                FROM app.productassistance pas
                INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
                WHERE pas.product_id = p_product_id
            ) AS services,
            (
                SELECT JSON_AGG(DISTINCT val.name ORDER BY val.name)
                FROM app.assistancevalue ava
                INNER JOIN app.value val ON ava.value_id = val.id
                WHERE ava.assistance_id IN (
                    SELECT pas.assistance_id
                    FROM app.productassistance pas
                    WHERE pas.product_id = p_product_id
                )
            ) AS values
        FROM app.product pro
        inner join app.productassistance pas on pro.id = pas.product_id
        inner join app.productdescription prd on pro.id = prd.product_id
        inner join app.assistance asi on pas.assistance_id = asi.id
        inner join app.productplan ppl on pro.id = ppl.product_id 
        WHERE pro.id = p_product_id
    ) product;

    RETURN json_result;
END;
$function$
;