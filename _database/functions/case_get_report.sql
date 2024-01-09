-- DROP FUNCTION IF EXISTS app.case_get_report(uuid, varchar, varchar, int4, int4);

CREATE OR REPLACE FUNCTION app.case_get_report(
    p_retail_id uuid,
    p_date_case varchar DEFAULT NULL,
    p_date_event varchar DEFAULT NULL,
    p_records integer DEFAULT NULL,
    p_page integer DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
AS $function$

DECLARE
    p_cases  int;
    p_total  int;
    json_cases JSON;

BEGIN
    SELECT COUNT(1)
    INTO p_cases
    FROM app.case cas
        INNER JOIN app.assistance asi ON cas.assistance_id = asi.id
        INNER JOIN app.lead lea ON cas.lead_id = lea.id
        INNER JOIN app.customer cus ON cas.customer_id = cus.id
        INNER JOIN app.insured ins ON cas.insured_id = ins.id
        INNER JOIN app.stage sta ON cas.stage_id = sta.id
        LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
        LEFT OUTER JOIN app.retail ret ON cas.retail_id = ret.id
    WHERE
        ((p_retail_id IS NULL) OR (lea.agent_id = p_retail_id)) AND
        (
            ((p_date_case IS NULL) AND (p_date_event IS NULL))
            OR
            (
                (p_date_case IS NOT NULL) AND (TO_CHAR(cas.createddate, 'YYYY-MM') = p_date_case)
                AND
                (p_date_event IS NULL)
            )
            OR
            (
                (p_date_event IS NOT NULL) AND (TO_CHAR(cas.event_date, 'YYYY-MM') = p_date_event)
                AND
                (p_date_case IS NULL)
            )
        );

    p_total := CEIL(p_cases::numeric);

    IF p_records IS NULL THEN
        p_records := p_cases;
        p_page := 1;
    END IF;

    IF p_page IS NULL THEN
        p_page := 1;
    END IF;

    SELECT JSON_BUILD_OBJECT(
            'summary', JSON_BUILD_OBJECT('cases', p_cases),
            'pagination', JSON_BUILD_OBJECT('total', p_total, 'page', p_page, 'records', p_records),
            'data', JSON_AGG(JSON_BUILD_OBJECT(
                'id', cas.id,
                'number', cas.number,
                'createddate', cas.createddate,
                'customer_id', cas.customer_id,
                'customer_name', cas.customer_name,
                'applicant_rut', cas.applicant_rut,
                'applicant_name', cas.applicant_name,
                'assistance_name', cas.assistance_name,
                'stage_id', cas.stage_id,
                'stage_name', cas.stage_name,
                'code', cas.stage_code)))
    INTO json_cases
    FROM (
        SELECT
            cas.id,
            cas.number,
            cas.createddate,
            CASE WHEN ret.id IS NULL THEN cus.id ELSE ret.id END AS customer_id,
            CASE WHEN ret.id IS NULL THEN CONCAT(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) ELSE ret.name END AS customer_name,
            CASE WHEN ben.id IS NULL THEN ins.rut ELSE ben.rut END AS applicant_rut,
            CASE WHEN ben.id IS NULL THEN CONCAT(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname) ELSE CONCAT(ben.name, ' ', ben.paternallastname, ' ', ben.maternallastname) END AS applicant_name,
            asi.name AS assistance_name,
            cas.stage_id AS stage_id,
            sta.code AS stage_code,
            sta.name AS stage_name
        FROM
            app.case cas
            INNER JOIN app.assistance asi ON cas.assistance_id = asi.id
            INNER JOIN app.lead lea ON cas.lead_id = lea.id
            INNER JOIN app.customer cus ON cas.customer_id = cus.id
            INNER JOIN app.insured ins ON cas.insured_id = ins.id
            INNER JOIN app.stage sta ON cas.stage_id = sta.id
            LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
            LEFT OUTER JOIN app.retail ret ON cas.retail_id = ret.id
        WHERE
            ((p_retail_id IS NULL) OR (lea.agent_id = p_retail_id)) AND
            (
                ((p_date_case IS NULL) AND (p_date_event IS NULL))
                OR
                (
                    (p_date_case IS NOT NULL) AND (TO_CHAR(cas.createddate, 'YYYY-MM') = p_date_case)
                    AND
                    (p_date_event IS NULL)
                )
                OR
                (
                    (p_date_event IS NOT NULL) AND (TO_CHAR(cas.event_date, 'YYYY-MM') = p_date_event)
                    AND
                    (p_date_case IS NULL)
                )
            )
        ORDER BY
            cas.number DESC
        LIMIT
            p_records
        OFFSET
            (p_page - 1) * p_records
    ) AS cas;

    RETURN json_cases;

END;
$function$;