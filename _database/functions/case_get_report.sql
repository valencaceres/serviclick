-- DROP FUNCTION app.case_get_report();

CREATE OR REPLACE FUNCTION app.case_get_report(p_retail_id uuid, p_date_case character varying DEFAULT NULL::character varying, p_date_event character varying DEFAULT NULL::character varying, p_records integer DEFAULT NULL::integer, p_page integer DEFAULT NULL::integer, p_export boolean DEFAULT false)
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
                     (
    (p_date_case IS NULL) 
    AND (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)  OR
(
    (
        p_date_case = 'Todos'
        OR (
            p_date_case = 'Hoy' 
            AND TO_CHAR(cas.createddate, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_case = 'Esta semana' 
            AND TO_CHAR(cas.createddate, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.createddate, 'YYYY-MM') = p_date_case
    ) 
    AND
    (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)
OR
(
    (
        p_date_event = 'Todos'
        OR (
            p_date_event = 'Hoy' 
            AND TO_CHAR(cas.event_date, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_event = 'Esta semana' 
            AND TO_CHAR(cas.event_date, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.event_date, 'YYYY-MM') = p_date_event
    ) 
    AND
    (p_date_case IS NULL)
)
                );


  IF p_export THEN
    SELECT JSON_BUILD_OBJECT(
        'summary', JSON_BUILD_OBJECT('cases', p_cases),
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
            'code', cas.stage_code,
            'policy_id', cas.lead_policy,
            'product_name', cas.product_name,
            'register_amount', cas.register_amount,
            'register_imedamount', cas.register_imedamount,
            'retail_name', cas.retail_name, 
            'applicant_phone',applicant_phone ,
            'applicant_birthdate', applicant_birthdate, 
            'applicant_district',applicant_district,
            'applicant_relationship', applicant_relationship
        ))
    ) INTO json_cases
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
            sta.name AS stage_name,
            pol.number AS lead_policy,
            pro.name AS product_name,
            car.register_amount,
            car.register_imedamount,
            COALESCE(ret.name, bro.name, age.name) AS retail_name,
            COALESCE(ben.phone, ins.phone) as applicant_phone,
            COALESCE(ben.birthdate, ins.birthdate) AS applicant_birthdate,
            COALESCE(ins.district, ben.district) AS applicant_district,
            COALESCE(ben.relationship, CASE WHEN ben.id IS NOT NULL THEN 'carga' ELSE 'titular' END) AS applicant_relationship
        FROM
            app.case cas
            INNER JOIN app.assistance asi ON cas.assistance_id = asi.id
            INNER JOIN app.product pro ON cas.product_id = pro.id
            INNER JOIN app.lead lea ON cas.lead_id = lea.id
            INNER JOIN app.customer cus ON cas.customer_id = cus.id
            INNER JOIN app.insured ins ON cas.insured_id = ins.id
            INNER JOIN app.stage sta ON cas.stage_id = sta.id
            left outer join app.policy pol on lea.policy_id = pol.id
            LEFT OUTER JOIN app.casereimbursment car ON car.case_id = cas.id
            LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
            LEFT OUTER JOIN app.retail ret ON cas.retail_id = ret.id
            LEFT OUTER JOIN app.broker bro ON cas.retail_id = bro.id
            LEFT OUTER JOIN app.agent age ON cas.retail_id = age.id
        
            WHERE
                ((p_retail_id IS NULL) OR (lea.agent_id = p_retail_id)) AND
                (
                     (
    (p_date_case IS NULL) 
    AND (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)  OR
(
    (
        p_date_case = 'Todos'
        OR (
            p_date_case = 'Hoy' 
            AND TO_CHAR(cas.createddate, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_case = 'Esta semana' 
            AND TO_CHAR(cas.createddate, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.createddate, 'YYYY-MM') = p_date_case
    ) 
    AND
    (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)
OR
(
    (
        p_date_event = 'Todos'
        OR (
            p_date_event = 'Hoy' 
            AND TO_CHAR(cas.event_date, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_event = 'Esta semana' 
            AND TO_CHAR(cas.event_date, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.event_date, 'YYYY-MM') = p_date_event
    ) 
    AND
    (p_date_case IS NULL)
)
                )
            ORDER BY
                cas.number DESC
        ) AS cas;
    ELSE
        IF p_records IS NULL THEN
            p_records := p_cases;
            p_page := 1;
        END IF;

        IF p_page IS NULL THEN
            p_page := 1;
        END IF;

        SELECT JSON_BUILD_OBJECT(
                'summary', JSON_BUILD_OBJECT('cases', p_cases),
                'pagination', JSON_BUILD_OBJECT('total', p_cases, 'page', p_page, 'records', p_records),
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
               	 CASE
                WHEN ret.id IS NOT NULL THEN ret.id
                WHEN age.id IS NOT NULL THEN age.id
                WHEN bro.id IS NOT NULL THEN bro.id
                ELSE cus.id
            end as customer_id,
					CASE
                WHEN ret.id IS NOT NULL THEN ret.name
                WHEN age.id IS NOT NULL THEN age.name
                WHEN bro.id IS NOT NULL THEN bro.name
                ELSE concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname)
            end  as customer_name,
					case when ins.id is not null then ins.rut else ben.rut end as applicant_rut,
					case when ins.id is not null then concat(ins.name, ' ', ins.paternallastname, ' ', ins.maternallastname) else concat(ben.name, ' ', ben.paternallastname, ' ', ben.maternallastname) end as applicant_name,
					asi.name as assistance_name,
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
                  LEFT OUTER JOIN app.broker bro ON cas.retail_id = bro.id
            LEFT OUTER JOIN app.agent age ON cas.retail_id = age.id
            WHERE
                ((p_retail_id IS NULL) OR (lea.agent_id = p_retail_id)) AND
               (
                     (
    (p_date_case IS NULL) 
    AND (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)  OR
(
    (
        p_date_case = 'Todos'
        OR (
            p_date_case = 'Hoy' 
            AND TO_CHAR(cas.createddate, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_case = 'Esta semana' 
            AND TO_CHAR(cas.createddate, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.createddate, 'YYYY-MM') = p_date_case
    ) 
    AND
    (p_date_event IS NULL OR p_date_event IN ('Todos', 'Hoy', 'Esta semana'))
)
OR
(
    (
        p_date_event = 'Todos'
        OR (
            p_date_event = 'Hoy' 
            AND TO_CHAR(cas.event_date, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD')
        )
        OR (
            p_date_event = 'Esta semana' 
            AND TO_CHAR(cas.event_date, 'IYYY-IW') = TO_CHAR(NOW(), 'IYYY-IW')
        )
        OR TO_CHAR(cas.event_date, 'YYYY-MM') = p_date_event
    ) 
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
    END IF;

    RETURN json_cases;
END;
$function$
;