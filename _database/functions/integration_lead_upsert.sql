-- DROP FUNCTION app.integration_lead_upsert(uuid, json, _json, _json, uuid);

CREATE OR REPLACE FUNCTION app.integration_lead_upsert(p_product_id uuid, p_holder json, p_beneficiaries json[], p_values json[], p_agent_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    p_lack int;
    p_policy_id uuid;
    p_holder_rut varchar;
    p_holder_name varchar;
    p_holder_paternal_last_name varchar;
    p_holder_maternal_last_name varchar;
    p_holder_address varchar;
    p_holder_district_id uuid;
    p_holder_email varchar;
    p_holder_phone varchar;
    p_holder_birth_date varchar;
    p_beneficiary json; 
    p_beneficiary_rut varchar;
    p_beneficiary_name varchar;
    p_beneficiary_paternal_last_name varchar;
    p_beneficiary_maternal_last_name varchar;
    p_beneficiary_address varchar;
    p_beneficiary_district_id uuid;
    p_beneficiary_email varchar;
    p_beneficiary_phone varchar;
    p_beneficiary_birth_date varchar;
    p_beneficiary_relationship varchar;
    p_beneficiary_relationship_id uuid;
   p_beneficiary_district_name varchar;
   p_beneficiary_ids uuid[];
    p_beneficiary_id uuid;
   p_district_name varchar;
     p_price int;
     p_plan_id int;
  p_frequency varchar;
 p_value_id uuid;
    p_insured_id uuid;
    p_lead_id uuid;
    p_customer_id uuid;
    p_person_id uuid;
       result json;

BEGIN
    IF p_holder is not null THEN
        p_holder_rut := p_holder->>'rut';
        p_holder_name := p_holder->>'name';
        p_holder_paternal_last_name := p_holder->>'paternalLastName';
        p_holder_maternal_last_name := p_holder->>'maternalLastName';
        p_holder_address := p_holder->>'address';
        p_holder_district_id := (p_holder->>'district_id'); 
        p_holder_email := p_holder->>'email';
        p_holder_phone := p_holder->>'phone';
        p_holder_birth_date := p_holder->>'birthDate';
       
       IF p_holder_district_id IS NOT NULL THEN
        SELECT district_name INTO p_district_name FROM app.district WHERE id = p_holder_district_id;
   
    END IF;
       
        SELECT cus.customer_id
        FROM app.customer_upsert(
              p_holder_rut, p_holder_name, p_holder_paternal_last_name, p_holder_maternal_last_name, p_holder_address,
              p_district_name, p_holder_email, p_holder_phone) as cus
        INTO p_customer_id;
       
        SELECT per.person_id
        FROM app.person_upsert(
              p_holder_rut, p_holder_name, p_holder_paternal_last_name, p_holder_maternal_last_name, p_holder_address,
              p_district_name, p_holder_email, p_holder_phone , p_holder_birth_date) as per
        INTO p_person_id;

        SELECT ins.insured_id
        FROM app.insured_upsert(
                p_holder_rut, p_holder_name, p_holder_paternal_last_name, p_holder_maternal_last_name, p_holder_address,
              p_district_name, p_holder_email, p_holder_phone , p_holder_birth_date) as ins
        INTO p_insured_id;
    END IF;

  IF p_beneficiaries IS NOT NULL THEN
 
       
    BEGIN
        FOREACH p_beneficiary IN ARRAY p_beneficiaries
        LOOP
          p_beneficiary_rut := p_beneficiary->>'rut';
            p_beneficiary_name := p_beneficiary->>'name';
            p_beneficiary_paternal_last_name := p_beneficiary->>'paternalLastName';
            p_beneficiary_maternal_last_name := p_beneficiary->>'maternalLastName';
            p_beneficiary_address := p_beneficiary->>'address';
            p_beneficiary_district_id := (p_beneficiary->>'district_id')::uuid;
            p_beneficiary_email := p_beneficiary->>'email';
            p_beneficiary_phone := p_beneficiary->>'phone';
            p_beneficiary_birth_date := p_beneficiary->>'birthDate';
            p_beneficiary_relationship_id := p_beneficiary->>'relationship_id';
 		 	
		 IF p_beneficiary_district_id IS NOT NULL THEN
        SELECT district_name INTO p_beneficiary_district_name FROM app.district WHERE id = p_beneficiary_district_id;

    END IF;           
           
  
            SELECT name INTO p_beneficiary_relationship
            FROM app.relationship
            WHERE id = p_beneficiary_relationship_id;
           
            INSERT INTO app.beneficiary (
                rut, name, paternallastname, maternallastname, address, district, email, phone, birthdate, relationship
            )
            VALUES (
                p_beneficiary_rut, p_beneficiary_name, p_beneficiary_paternal_last_name,
                p_beneficiary_maternal_last_name, p_beneficiary_address, p_beneficiary_district_name,
                p_beneficiary_email, p_beneficiary_phone, TO_DATE(p_beneficiary_birth_date, 'YYYY-MM-DD'),
                p_beneficiary_relationship
            )
            ON CONFLICT (rut)
            DO UPDATE
            SET
                  name = COALESCE(NULLIF(p_beneficiary_name, ''), app.beneficiary.name),
                    paternallastname = COALESCE(NULLIF(p_beneficiary_paternal_last_name, ''), app.beneficiary.paternallastname),
                    maternallastname = COALESCE(NULLIF(p_beneficiary_maternal_last_name, ''), app.beneficiary.maternallastname),
                    address = COALESCE(NULLIF(p_beneficiary_address, ''), COALESCE(app.beneficiary.address, '')),
                    district = COALESCE(NULLIF(p_beneficiary_district_name, ''), COALESCE(app.beneficiary.district, '')),
                    email = COALESCE(NULLIF(p_beneficiary_email, ''), app.beneficiary.email),
                    phone = COALESCE(NULLIF(p_beneficiary_phone, ''), app.beneficiary.phone),
                  	birthdate = case when p_beneficiary_birth_date = '' then case when app.beneficiary.birthdate > '1923-01-01' then app.beneficiary.birthdate else null end else TO_DATE(p_beneficiary_birth_date,'YYYY-MM-DD' )end,
                    relationship = COALESCE(NULLIF(p_beneficiary_relationship, ''), app.beneficiary.relationship);
        
            SELECT id INTO p_beneficiary_id
            FROM app.beneficiary
            WHERE rut = p_beneficiary_rut;

            p_beneficiary_ids := p_beneficiary_ids || p_beneficiary_id;
        END LOOP;
    END;
END IF;
  IF p_product_id IS NOT NULL THEN
    SELECT
        COALESCE(MAX(pas.lack), 1),
        MAX(lpr.price) AS price,
        MAX(lpr.productplan_id) AS productplan_id,
        MAX(lpr.frequency_code) AS frequency_code 
    INTO
        p_lack,
        p_price,
        p_plan_id,
        p_frequency
    FROM
        app.productassistance pas
    INNER JOIN
        app.leadproduct lpr ON lpr.product_id = p_product_id
    WHERE
        pas.product_id = p_product_id;
			

        INSERT INTO app.policy (createdate, startdate, enddate)
        VALUES (NOW(), NOW() + p_lack * INTERVAL '1 day', null)
        RETURNING id INTO p_policy_id;

    END IF;

    ---------------------------------------------------------------------------------
 	
   
   
   INSERT INTO app.lead (createdate, customer_id, agent_id)
VALUES (NOW(), p_customer_id, p_agent_id)
RETURNING id INTO p_lead_id;

INSERT INTO app.leadproduct (lead_id, product_id, price, currency_code, frequency_code, productplan_id)
VALUES (p_lead_id, p_product_id, p_price, 'P', p_frequency, p_plan_id);

INSERT INTO app.leadinsured (lead_id, insured_id)
VALUES (p_lead_id, p_insured_id);



IF NOT p_values IS NULL THEN
    FOR i IN 1..COALESCE(array_length(p_values, 1), 0) LOOP
        SELECT id INTO p_value_id
        FROM app.value
        WHERE name = p_values[i]->>'name';

        IF p_value_id IS NOT NULL THEN
            DECLARE
                lead_id_result uuid;
                product_id_result uuid;
                insured_id_result uuid;
                value_id_result uuid;
                value_result varchar;
            BEGIN
                SELECT * INTO
                    lead_id_result,
                    product_id_result,
                    insured_id_result,
                    value_id_result,
                    value_result
                FROM app.integration_values_upsert(
                    p_lead_id,
                    p_product_id,
                    p_insured_id,
                    COALESCE(p_value_id, NULL::uuid),
                    p_values[i]->>'value'
                );
                
            END;
        END IF;
    END LOOP;
END IF;

FOR i IN 1..COALESCE(array_length(p_beneficiary_ids, 1), 0) LOOP
    INSERT INTO app.leadbeneficiary (lead_id, insured_id, beneficiary_id)
    VALUES (p_lead_id, p_insured_id, p_beneficiary_ids[i]);
END LOOP;

SELECT
    JSON_BUILD_OBJECT(
        'data', JSON_BUILD_OBJECT(
            'lead_id', p_lead_id,
            'product', (
                SELECT JSON_BUILD_OBJECT(
                    'id', pro.id,
                    'name', pro.name,
                    'description', prd.description,
                    'frequency', pro.frequency,
                    'currency', pro.currency,
                    'price', ppl.price,
                    'services', (
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
                        WHERE pas.product_id = pro.id
                        LIMIT 1
                    )
                )
                FROM app.product pro
                INNER JOIN app.productassistance pas ON pro.id = pas.product_id
                INNER JOIN app.productdescription prd ON pro.id = prd.product_id
                INNER JOIN app.assistance asi ON pas.assistance_id = asi.id
                INNER JOIN app.productplan ppl ON pro.id = ppl.product_id 
                WHERE pro.id = p_product_id
                LIMIT 1
            ),
            'holder', json_build_object(
                'rut', p_holder_rut,
                'name', p_holder_name,
                'paternalLastName', p_holder_paternal_last_name,
                'maternalLastName', p_holder_maternal_last_name,
                'address', p_holder_address,
                'district_name', p_district_name,
                'email', p_holder_email,
                'phone', p_holder_phone,
                'birthDate', p_holder_birth_date
            ),
            'beneficiaries', (
                SELECT JSON_AGG(
                    json_build_object(
                        'name', ben.name,
                        'rut', ben.rut,
                        'paternalLastName', ben.paternallastname,
                        'maternalLastName', ben.maternallastname,
                        'address', ben.address,
                        'district_name', ben.district,
                        'email', ben.email,
                        'phone', ben.phone,
                        'birthDate', ben.birthdate,
                        'relationship_name', ben.relationship
                    )
                )
                FROM app.beneficiary ben
                WHERE ben.id = ANY(p_beneficiary_ids)
                LIMIT 1
            ),
            'values', (
                SELECT JSON_AGG(
                    json_build_object(
                        'name', val.name,
                        'value', lpv.value
                    )
                )
                FROM app.leadproductvalue lpv
                INNER JOIN app.value val ON lpv.value_id = val.id
                WHERE lpv.lead_id = p_lead_id
                LIMIT 1
            )
        )
    )
INTO result;

    RETURN result;
END;

$function$
;
