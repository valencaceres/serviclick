drop function app.case_get_services_and_values;
CREATE OR REPLACE FUNCTION app.case_get_services_and_values(p_insured_id uuid, p_beneficiary_id uuid, p_retail_id uuid, p_customer_id uuid, p_product_id uuid, p_assistance_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

DECLARE
    p_lead_id uuid;
    json_product JSON;
    json_assistances JSON;
    json_assistance JSON;
    json_used JSON;
    json_values JSON;
    json_result JSON;

BEGIN

    IF p_beneficiary_id IS NULL THEN

        SELECT lea.id
        INTO p_lead_id
        FROM app.lead lea
            INNER JOIN app.leadinsured lin ON lea.id = lin.lead_id
            INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
                LEFT OUTER JOIN app.retail ret ON lea.agent_id = ret.id
            LEFT OUTER JOIN app.agent age on lea.agent_id = age.id
             LEFT OUTER JOIN app.broker bro on lea.agent_id = bro.id
        WHERE NOT lea.policy_id IS NULL
            AND lea.customer_id = p_customer_id
            AND lin.insured_id = p_insured_id
            AND lpr.product_id = p_product_id
            AND (p_retail_id IS NULL OR ret.id = p_retail_id or age.id = p_retail_id or bro.id = p_retail_id);

    ELSE

        SELECT lea.id
        INTO p_lead_id
        FROM app.lead lea
            INNER JOIN app.leadinsured lin ON lea.id = lin.lead_id
            INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
            INNER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lin.insured_id = lbe.insured_id
            LEFT OUTER JOIN app.retail ret ON lea.agent_id = ret.id
            LEFT OUTER JOIN app.agent age on lea.agent_id = age.id
             LEFT OUTER JOIN app.broker bro on lea.agent_id = bro.id
        WHERE NOT lea.policy_id IS NULL
            AND lea.customer_id = p_customer_id
            AND lin.insured_id = p_insured_id
            AND lbe.beneficiary_id = p_beneficiary_id
            AND lpr.product_id = p_product_id
            AND (p_retail_id IS NULL OR ret.id = p_retail_id or age.id = p_retail_id or bro.id = p_retail_id);

    END IF;

    SELECT TO_JSON(product)
    INTO json_product
    FROM (
        SELECT pro.id, pro.name
        FROM app.product pro
        WHERE pro.id = p_product_id
    ) product;

    SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', asi.id, 
            'name', asi.name,
            'assigned', JSON_BUILD_OBJECT(
                'amount', asi.amount,
                'currency', asi.currency,
                'maximum', asi.maximum,
                'events', asi.events,
                'lack', asi.lack
            ),
            'used', JSONB_BUILD_OBJECT('events', 0, 'total_amount', 0)
        )
    )
    INTO json_assistances
    FROM (
        SELECT asi.id, asi.name, pas.amount, pas.currency, pas.maximum, pas.events, pas.lack
        FROM app.productassistance pas
        INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
        WHERE pas.product_id = p_product_id
        ORDER BY pas.number
    ) asi;

    IF NOT p_lead_id IS NULL THEN

        SELECT JSON_BUILD_OBJECT(
            'events', used.events,
            'total_amount', used.total_amount
        )
        INTO json_used
        FROM (
            SELECT cas.lead_id,
                COUNT(1) AS events,
                SUM(CASE WHEN cre.amount IS NULL THEN 0 ELSE cre.amount END) AS total_amount
            FROM app.case cas
            LEFT OUTER JOIN app.casereimbursment cre ON cas.id = cre.case_id AND cre.status = 'OK'
            WHERE cas.lead_id = p_lead_id AND cas.assistance_id = p_assistance_id
            GROUP BY cas.lead_id
        ) AS used;

    END IF;

    SELECT JSON_BUILD_OBJECT(
        'id', assistance.id,
        'name', assistance.name,
        'assigned', JSON_BUILD_OBJECT(
            'amount', assistance.amount,
            'currency', assistance.currency,
            'maximum', assistance.maximum,
            'events', assistance.events,
            'lack', assistance.lack
        ),
        'used', CASE WHEN json_used IS NULL THEN JSON_BUILD_OBJECT('events', 0, 'total_amount', 0) ELSE json_used END
    )
    INTO json_assistance
    FROM (
        SELECT asi.id, asi.name, pas.amount, pas.currency, pas.maximum, pas.events, pas.lack
        FROM app.productassistance pas
        INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
        WHERE pas.product_id = p_product_id AND asi.id = p_assistance_id
        ORDER BY pas.number
    ) AS assistance;

    SELECT JSON_AGG(values)
    INTO json_values
    FROM (
        SELECT DISTINCT
            val.id,
            val.name,
            CASE WHEN lpv.value IS NULL THEN '' ELSE lpv.value END AS value,
            val.family_id,
            ava.line_order
        FROM app.assistancevalue ava
        INNER JOIN app.value val ON ava.value_id = val.id
        INNER JOIN app.productassistance pas ON ava.assistance_id = pas.assistance_id
        LEFT OUTER JOIN app.leadproductvalue lpv ON pas.product_id = lpv.product_id
            AND lpv.lead_id = p_lead_id
            AND lpv.insured_id = p_insured_id
            AND val.id = lpv.value_id
        WHERE pas.product_id = p_product_id
        ORDER BY val.family_id, ava.line_order
    ) AS values;

    SELECT CASE
        WHEN json_assistances IS NOT NULL THEN
            JSON_BUILD_OBJECT(
                'insured_id', p_insured_id,
                'beneficiary_id', p_beneficiary_id, 
                'retail_id', p_retail_id, 
                'customer_id', p_customer_id,
                'lead_id', p_lead_id,
                'product', json_product, 
                'assistances', json_assistances,
                'assistance', json_assistance,
                'values', json_values
            )
        ELSE
            JSON_BUILD_OBJECT(
                'insured_id', p_insured_id,
                'beneficiary_id', p_beneficiary_id, 
                'retail_id', p_retail_id, 
                'customer_id', p_customer_id,
                'lead_id', p_lead_id,
                'product', json_product, 
                'assistance', json_assistance,
                'used', json_used,
                'values', json_values
            )
    END
    INTO json_result;

    RETURN json_result;

END;

$function$
;
 --p_assistance_id puede ser null 