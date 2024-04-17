CREATE OR REPLACE FUNCTION app.integration_customer_get_by_rut(p_rut character varying)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    json_report json;
BEGIN
    SELECT json_build_object(
        'name', cus.name,
        'paternalLastName', cus.paternallastname,
        'maternalLastName', cus.maternallastname,
        'address', cus.address,
        'district', cus.district,
        'email', cus.email,
        'phone', cus.phone,
        'products', json_agg(json_build_object(
            'lead_id', lea.id,
            'lead_status_payemnt', ldp.code,
            'lead_document', igd.document,
            'id', pro.id,
            'name', pro.name,
            'description', prd.description,
            'services', (
                SELECT json_agg(json_build_object(
                    'name', asi.name, 
                    'number', pas.number, 
                    'amount', pas.amount, 
                    'currency', pas.currency, 
                    'maximum', pas.maximum, 
                    'events', pas.events, 
                    'lack', pas.lack
                ))
                FROM app.productassistance pas
                INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
                WHERE pas.product_id = pro.id
            ),
            'beneficiaries', (
                SELECT json_agg(json_build_object(
                   'rut', ben.rut,
                    'name', ben.name,
                    'paternalLastName', ben.paternallastname,
									'maternalLastName', ben.maternallastname,
									'address', ben.address,
									'district', ben.district,
									'phone', ben.phone,
									'email', ben.email,
									'birthDate', ben.birthdate,
									'relationship', ben.relationship
                ))
                FROM app.beneficiary ben
                INNER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND ben.id = lbe.beneficiary_id
            ),
            'values', (
                SELECT json_agg(json_build_object(
                    'name', val.name,
                    'value', lpv.value
                ))
                FROM app.leadproductvalue lpv
                INNER JOIN app.value val ON val.id = lpv.value_id 
                WHERE lpv.lead_id = lea.id
            )
        ))
    )
    INTO json_report
    FROM app.customer cus
    LEFT OUTER JOIN app.lead lea ON lea.customer_id = cus.id
    left outer join app.leadpayment ldp on ldp.lead_id = lea.id
    left outer join app.integrationdocument igd on igd.lead_id = lea.id
    LEFT OUTER JOIN app.agent age ON lea.agent_id = age.id
    LEFT OUTER JOIN app.broker bro ON lea.agent_id = bro.id
    LEFT OUTER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
    LEFT OUTER JOIN app.product pro ON lpr.product_id = pro.id
    LEFT OUTER JOIN app.productdescription prd ON prd.product_id = pro.id  
    WHERE cus.rut = p_rut
    GROUP BY cus.id, lea.id, pro.id; 

    RETURN json_report;
END;
$function$
;