drop function case_get_applicant_by_rut;
CREATE OR REPLACE FUNCTION app.case_get_applicant_by_rut(p_rut character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

DECLARE
    p_lead_id uuid;
    json_product JSON;
    json_assistances JSON;
    json_values JSON;
    json_result JSON;

BEGIN
    -- Buscar beneficiarios
    IF EXISTS (
        SELECT 1
        FROM app.beneficiary ben
            INNER JOIN app.leadbeneficiary lbe ON ben.id = lbe.beneficiary_id
            INNER JOIN app.leadinsured lin ON lbe.insured_id = lin.insured_id
            INNER JOIN app.insured ins ON lin.insured_id = ins.id
            INNER JOIN app.lead lea ON lbe.lead_id = lea.id AND NOT lea.policy_id IS NULL
        WHERE ben.rut = p_rut
    ) THEN
        -- Se encontró un beneficiario
        SELECT json_build_object(
                'type', result.type,
                'retail', CASE WHEN result.retail_id IS NULL THEN NULL ELSE json_build_object(
                        'id', result.retail_id,
                        'rut', result.retail_rut,
                        'name', result.retail_name
                    ) END,
                'customer', json_build_object(
                    'id', result.customer_id,
                    'rut', result.customer_rut,
                    'name', result.customer_name
                ),
                'insured', json_build_object(
                    'id', result.customer_id,
                    'rut', result.customer_rut,
                    'name', result.customer_name,
                    'paternalLastName', result.insured_paternallastname,
                    'maternalLastName', result.insured_maternallastname,
                    'address', result.insured_address,
                    'district', result.insured_district,
                    'email', result.insured_email,
                    'phone', result.insured_phone,
                    'birthDate', result.insured_birthdate
                ),
                'beneficiary', json_build_object(
                    'id', result.beneficiary_id,
                    'rut', result.beneficiary_rut,
                    'name', result.beneficiary_name,
                    'paternalLastName', result.beneficiary_paternallastname,
                    'maternalLastName', result.beneficiary_maternallastname,
                    'address', result.beneficiary_address,
                    'district', result.beneficiary_district,
                    'email', result.beneficiary_email,
                    'phone', result.beneficiary_phone,
                    'birthDate', result.beneficiary_birthdate
                ),
                'products', json_agg(json_build_object(
                    'id', result.product_id,
                    'name', result.product_name
                ))
            )
        INTO json_result
        FROM (
            -- Consulta principal
            SELECT DISTINCT
                'B'::varchar AS type,
                ret.id::varchar AS retail_id,
                ret.rut AS retail_rut,
                ret.name AS retail_name,
                cus.id AS customer_id,
                cus.rut AS customer_rut,
                CONCAT(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) AS customer_name,
                ins.id AS insured_id,
                ins.rut AS insured_rut,
                ins.name AS insured_name,
                ins.paternallastname AS insured_paternallastname,
                ins.maternallastname AS insured_maternallastname,
                ins.address AS insured_address,
                ins.district AS insured_district,
                ins.email AS insured_email,
                ins.phone AS insured_phone,
                ins.birthdate AS insured_birthdate,
                ben.id AS beneficiary_id,
                ben.rut AS beneficiary_rut,
                ben.name AS beneficiary_name,
                ben.paternallastname AS beneficiary_paternallastname,
                ben.maternallastname AS beneficiary_maternallastname,
                ben.address AS beneficiary_address,
                ben.district AS beneficiary_district,
                ben.email AS beneficiary_email,
                ben.phone AS beneficiary_phone,
                ben.birthdate AS beneficiary_birthdate,
                pro.id AS product_id,
                pro.name AS product_name
            FROM app.beneficiary ben
                INNER JOIN app.leadbeneficiary lbe ON ben.id = lbe.beneficiary_id
                INNER JOIN app.leadinsured lin ON lbe.insured_id = lin.insured_id 
                INNER JOIN app.insured ins ON lin.insured_id = ins.id
                INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
                INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
                INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
                INNER JOIN app.product pro ON ppl.product_id = pro.id AND pro.beneficiaries > 0
                INNER JOIN app.customer cus ON lea.customer_id = cus.id
                LEFT OUTER JOIN app.retail ret ON ppl.agent_id = ret.id
            WHERE ben.rut = p_rut
            ORDER BY
                customer_name,
                product_name
        ) AS result
        GROUP BY
            result.type,
            result.insured_id,
            result.insured_rut,
            result.insured_name,
            result.insured_paternallastname,
            result.insured_maternallastname,
            result.insured_address,
            result.insured_district,
            result.insured_email,
            result.insured_phone,
            result.insured_birthdate,
            result.beneficiary_id,
            result.beneficiary_rut,
            result.beneficiary_name,
            result.beneficiary_paternallastname,
            result.beneficiary_maternallastname,
            result.beneficiary_address,
            result.beneficiary_district,
            result.beneficiary_email,
            result.beneficiary_phone,
            result.beneficiary_birthdate,
            result.customer_id,
            result.customer_rut,
            result.customer_name,
            result.retail_id,
            result.retail_rut,
            result.retail_name;

        RETURN json_result;
    ELSE
        -- No se encontraron beneficiarios
        -- Buscar asegurados
        IF EXISTS (
            SELECT 1
            FROM app.insured ins
                INNER JOIN app.leadinsured lin ON ins.id = lin.insured_id
                INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
                INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
                INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
                INNER JOIN app.product pro ON ppl.product_id = pro.id
                INNER JOIN app.customer cus ON lea.customer_id = cus.id
                LEFT OUTER JOIN app.retail ret ON ppl.agent_id = ret.id
            WHERE ins.rut = p_rut
        ) THEN
            -- Se encontró un asegurado
            SELECT json_build_object(
                    'type', result.type,
                    'retail', CASE WHEN result.retail_id IS NULL THEN NULL ELSE json_build_object(
                            'id', result.retail_id,
                            'rut', result.retail_rut,
                            'name', result.retail_name
                        ) END,
                    'customer', json_build_object(
                        'id', result.customer_id,
                        'rut', result.customer_rut,
                        'name', result.customer_name
                    ),
                    'insured', json_build_object(
                        'id', result.insured_id,
                        'rut', result.insured_rut,
                        'name', result.insured_name,
                        'paternalLastName', result.insured_paternallastname,
                        'maternalLastName', result.insured_maternallastname,
                        'address', result.insured_address,
                        'district', result.insured_district,
                        'email', result.insured_email,
                        'phone', result.insured_phone,
                        'birthDate', result.insured_birthdate
                    ),
                    'beneficiary', NULL,
                    'products', json_agg(json_build_object(
                        'id', result.product_id,
                        'name', result.product_name
                    ))
                )
            INTO json_result
            FROM (
                -- Consulta principal
                SELECT DISTINCT
                    'I'::varchar AS type,
                    ret.id::varchar AS retail_id,
                    ret.rut AS retail_rut,
                    ret.name AS retail_name,
                    cus.id AS customer_id,
                    cus.rut AS customer_rut,
                    CONCAT(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) AS customer_name,
                    ins.id AS insured_id,
                    ins.rut AS insured_rut,
                    ins.name AS insured_name,
                    ins.paternallastname AS insured_paternallastname,
                    ins.maternallastname AS insured_maternallastname,
                    ins.address AS insured_address,
                    ins.district AS insured_district,
                    ins.email AS insured_email,
                    ins.phone AS insured_phone,
                    ins.birthdate AS insured_birthdate,
                    pro.id AS product_id,
                    pro.name AS product_name
                FROM app.insured ins
                    INNER JOIN app.leadinsured lin ON ins.id = lin.insured_id
                    INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
                    INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
                    INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
                    INNER JOIN app.product pro ON ppl.product_id = pro.id
                    INNER JOIN app.customer cus ON lea.customer_id = cus.id
                    LEFT OUTER JOIN app.retail ret ON ppl.agent_id = ret.id
                WHERE ins.rut = p_rut
                ORDER BY
                    customer_name,
                    product_name
            ) AS result
            GROUP BY
                result.type,
                result.insured_id,
                result.insured_rut,
                result.insured_name,
                result.insured_paternallastname,
                result.insured_maternallastname,
                result.insured_address,
                result.insured_district,
                result.insured_email,
                result.insured_phone,
                result.insured_birthdate,
                result.customer_id,
                result.customer_rut,
                result.customer_name,
                result.retail_id,
                result.retail_rut,
                result.retail_name;

            RETURN json_result;
        ELSE
            -- No se encontraron ni beneficiarios ni asegurados
            RETURN json_build_object('type', 'C');
        END IF;
    END IF;
END;
$function$
;