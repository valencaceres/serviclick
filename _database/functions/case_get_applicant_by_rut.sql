-- DROP FUNCTION app.case_get_applicant_by_rut(varchar);

CREATE OR REPLACE FUNCTION app.case_get_applicant_by_rut(p_rut character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    p_lead_id uuid;
    json_result JSON;
BEGIN
    SELECT
        json_build_object(
            'type', result.type,
       
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
            'beneficiary', CASE WHEN result.beneficiary_id IS NULL THEN NULL ELSE json_build_object(
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
            ) END,
              'retails', (
    SELECT DISTINCT jsonb_agg(jsonb_build_object(
        'id', COALESCE(ret.id, age.id, bro.id),
        'name', COALESCE(ret.name, age.name, bro.name)
      
    ))
     FROM app.insured ins
            INNER JOIN app.leadinsured lin ON ins.id = lin.insured_id           
            INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
            INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
            INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
            INNER JOIN app.product pro ON ppl.product_id = pro.id
            INNER JOIN app.customer cus ON lea.customer_id = cus.id                        
            LEFT OUTER JOIN app.retail ret ON ppl.agent_id = ret.id
           LEFT OUTER JOIN app.agent age on ppl.agent_id = age.id
           LEFT OUTER JOIN app.broker bro on ppl.agent_id = bro.id
            LEFT OUTER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lbe.insured_id = ins.id
            LEFT OUTER JOIN app.beneficiary ben ON lbe.beneficiary_id = ben.id
      

        WHERE ins.rut = p_rut OR (ben.rut = p_rut AND ben.rut IS NOT NULL)
),
           'products', (
    select distinct jsonb_agg(jsonb_build_object(
        'id', pro.id,
        'name', pro.name,
        'agent_id', ppl.agent_id
    ))
           FROM app.insured ins
            INNER JOIN app.leadinsured lin ON ins.id = lin.insured_id           
            INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
            INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
            INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
            INNER JOIN app.product pro ON ppl.product_id = pro.id
            LEFT OUTER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lbe.insured_id = ins.id
            LEFT OUTER JOIN app.beneficiary ben ON lbe.beneficiary_id = ben.id
     
        WHERE ins.rut = p_rut OR (ben.rut = p_rut AND ben.rut IS NOT NULL)
)
        )
    INTO json_result
    FROM (
        SELECT  distinct
            CASE WHEN ins.rut = p_rut THEN 'I' ELSE 'B' END AS type,
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
            pro.name AS product_name,
            ppl.agent_id as product_agent_id
            
         
        FROM app.insured ins
            INNER JOIN app.leadinsured lin ON ins.id = lin.insured_id           
            INNER JOIN app.lead lea ON lin.lead_id = lea.id AND NOT lea.policy_id IS NULL
            INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
            INNER JOIN app.productplan ppl ON lpr.product_id = ppl.product_id AND lpr.productplan_id = ppl.plan_id
            INNER JOIN app.product pro ON ppl.product_id = pro.id
            INNER JOIN app.customer cus ON lea.customer_id = cus.id                        
            LEFT OUTER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lbe.insured_id = ins.id
            LEFT OUTER JOIN app.beneficiary ben ON lbe.beneficiary_id = ben.id
     
        WHERE ins.rut = p_rut OR (ben.rut = p_rut AND ben.rut IS NOT NULL)
        ORDER BY customer_name, product_name
    ) AS result
    GROUP by
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
        result.product_name,
        result.product_agent_id,
        result.product_id,
        result.customer_id,
        result.customer_rut,
        result.customer_name;

      

  
  
     

    RETURN CASE WHEN json_result IS NULL THEN json_build_object('type', 'C') ELSE json_result END;
END;

$function$
;
