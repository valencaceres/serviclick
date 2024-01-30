CREATE
OR REPLACE FUNCTION app.integration_product_get_all(p_agent_id uuid) RETURNS json LANGUAGE plpgsql AS $ function $ DECLARE json_report json;

BEGIN
SELECT
    json_agg(
        json_build_object(
            'id',
            pro.id,
            'productPlan_id',
            ppl.id,
            'name',
            pro.name,
            'currency',
            pro.currency,
            'frequency',
            pro.frequency,
            'price',
            ppl.price
        )
    )
FROM
    app.product pro
    INNER JOIN app.productplan ppl ON pro.id = ppl.product_id
WHERE
    ppl.agent_id = p_agent_id
    AND ppl.TYPE = 'customer' INTO json_report;

RETURN json_report;

END;

$ function $;