CREATE
OR REPLACE FUNCTION app.integration_product_get_by_id(p_retail_id uuid, p_product_id uuid) RETURNS json LANGUAGE plpgsql AS $ function $ DECLARE json_result JSON;

BEGIN
SELECT
    JSON_BUILD_OBJECT(
        'id',
        pro.id,
        'productplan_id',
        ppl.id,
        'name',
        pro.name,
        'description',
        des.description,
        'frequency',
        ppl.frequency,
        'currency',
        pro.currency,
        'price',
        ppl.price,
        'services',
        (
            SELECT
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id',
                        asi.id,
                        'name',
                        asi.name,
                        'amount',
                        pas.amount,
                        'currency',
                        pas.currency,
                        'maximum',
                        pas.maximum,
                        'events',
                        pas.events,
                        'lack',
                        pas.lack
                    )
                )
            FROM
                app.productassistance pas
                INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
            WHERE
                pas.product_id = p_product_id
        ),
        'values',
        (
            SELECT
                JSON_AGG(DISTINCT val.name)
            FROM
                app.assistancevalue ava
                INNER JOIN app.value val ON ava.value_id = val.id
                INNER JOIN app.assistance asi ON ava.assistance_id = asi.id
                INNER JOIN app.productassistance pas ON asi.id = pas.assistance_id
            WHERE
                pas.product_id = p_product_id
        )
    ) INTO json_result
FROM
    app.product pro
    INNER JOIN app.productdescription des ON pro.id = des.product_id
    INNER JOIN app.productplan ppl ON pro.id = ppl.product_id
WHERE
    ppl.agent_id = p_retail_id
    AND pro.id = p_product_id
    AND ppl.TYPE = 'customer';

RETURN json_result;

END;

$ function $;