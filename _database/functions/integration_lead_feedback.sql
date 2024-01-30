CREATE
OR REPLACE FUNCTION app.integration_lead_feedback(p_lead_id uuid, p_status integer) RETURNS jsonb LANGUAGE plpgsql AS $ function $ DECLARE p_lack int;

p_policy_id uuid;

result jsonb;

BEGIN IF p_status = 1 THEN
SELECT
    COALESCE(MAX(pas.lack), 1) INTO p_lack
FROM
    app.productassistance pas
    INNER JOIN app.productplan ppl ON pas.product_id = ppl.product_id
    AND ppl.TYPE = 'customer'
    INNER JOIN app.leadproduct lpr ON ppl.product_id = lpr.product_id
WHERE
    lpr.lead_id = p_lead_id
GROUP BY
    ppl.id;

SELECT
    policy_id INTO p_policy_id
FROM
    app.LEAD
WHERE
    id = p_lead_id;

IF p_policy_id IS NULL THEN
INSERT INTO
    app.policy(
        createdate,
        startdate,
        enddate
    )
VALUES
(
        NOW(),
        NOW() + p_lack * INTERVAL '1 day',
        null
    ) RETURNING id INTO p_policy_id;

UPDATE
    app.LEAD
SET
    policy_id = p_policy_id
WHERE
    id = p_lead_id;

END IF;

RETURN jsonb_build_object('lead_id', p_lead_id, 'policy_id', p_policy_id);

ELSE RETURN jsonb_build_object('lead_id', p_lead_id, 'policy_id', NULL);

END IF;

END;

$ function $;