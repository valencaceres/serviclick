drop function app.case_get_reimbursment;
CREATE OR REPLACE FUNCTION app.case_get_reimbursment(
    p_isimed BOOLEAN,
    p_rut VARCHAR,
    p_name VARCHAR,
    p_records INT, -- Cantidad de registros por página
    p_page INT     -- Número de página
)    
RETURNS JSON AS
$$

DECLARE
    p_rows INT;       -- Cantidad total de registros
    p_total INT;      -- Cantidad total de páginas
    json_report JSON; -- Reporte en formato json
BEGIN
    
    -- Consulta de conteo
    SELECT COUNT(1)
    INTO p_rows
    FROM app.case cas
        INNER JOIN app.casereimbursment cre ON cas.id = cre.case_id
        INNER JOIN app.insured ins ON cas.insured_id = ins.id
        LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
    WHERE (p_isimed IS NULL OR (p_isimed IS TRUE AND NOT cre.register_imedamount IS NULL) OR (p_isimed IS FALSE AND NOT cre.register_amount IS NULL)) AND
          (p_rut IS NULL OR ins.rut = p_rut OR ben.rut = p_rut) AND
          (p_name IS NULL OR LOWER(TRIM(CONCAT(ins.name, ' ', ins.paternalLastName, ' ', ins.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%' OR LOWER(TRIM(CONCAT(ben.name, ' ', ben.paternalLastName, ' ', ben.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%');
        
    -- Ajuste de valores por defecto
    IF p_records IS NULL THEN
        p_records := p_rows;
        p_page := 1;
    END IF;

    IF p_page IS NULL THEN
        p_page := 1;
    END IF;

    -- Cálculo de total de páginas
    p_total := CEIL(p_rows::NUMERIC / p_records::NUMERIC);
   
    BEGIN
        EXECUTE 'DROP TABLE IF EXISTS temp_table';
    EXCEPTION
        WHEN others THEN
            NULL;
    END;

    -- Suma de reembolsos anteriores por titular/carga
    CREATE TEMP TABLE temp_table AS
    SELECT
        CASE WHEN cas.type = 'I' THEN ins.id ELSE ben.id END AS person_id,
        SUM(CASE WHEN cas.type = 'I' THEN cre.imed_amount ELSE cre.amount END) AS available_amount
    FROM app.case cas
        INNER JOIN app.casereimbursment cre ON cas.id = cre.case_id
        INNER JOIN app.insured ins ON cas.insured_id = ins.id
        LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
    WHERE (p_isimed IS NULL OR (p_isimed IS TRUE AND NOT cre.register_imedamount IS NULL) OR (p_isimed IS FALSE AND NOT cre.register_amount IS NULL)) AND
          (p_rut IS NULL OR ins.rut = p_rut OR ben.rut = p_rut) AND
          (p_name IS NULL OR LOWER(TRIM(CONCAT(ins.name, ' ', ins.paternalLastName, ' ', ins.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%' OR LOWER(TRIM(CONCAT(ben.name, ' ', ben.paternalLastName, ' ', ben.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%')
    GROUP BY
        person_id;

    -- Consulta principal
    SELECT
        json_agg(json_build_object(
            'number', case_table.number,
            'case_id', case_table.case_id,
            'id', case_table.reim_id,
            'status', case_table.case_status,
            'date', case_table.application_date,
            'name', case_table.name,
            'imed_amount', case_table.imed_amount,
             'limit', case_table.maximum,
              'product', case_table.product_name,
                 'assistance', case_table.assistance_name, 
                      'casestage_description', case_table.casestage_description,
                       'available', case_table.available_amount,
                             'amount', case_table.amount,
                               'required_amount', case_table.register_amount,
                                'case_type', case_table.type,
                                'is_active', case_table.isactive,
                                  'required_imed', case_table.register_imedamount,
                                   'rut', case_table.rut,
                                    'email', case_table.email,
                                     'phone', case_table.phone
                                     
        ))
    INTO json_report
    FROM (
        SELECT
            cas.number AS number,
            MAX(cas.id::VARCHAR) AS case_id,
 MAX(cre.id::VARCHAR) AS reim_id,
MAX(CASE WHEN cas.isactive THEN 1 ELSE 0 END) AS isactive,
            MAX(cre.status) AS case_status,
            MAX(cre.application_date) AS application_date,
            MAX(cre.imed_amount) AS imed_amount,
            MAX(pas.maximum) AS maximum,
            MAX(pro.name) AS product_name,
            MAX(asi.name) AS assistance_name,
            MAX(casg.description) AS casestage_description,
            MAX(pas.amount - COALESCE(tmp.available_amount, 0)) AS available_amount,
            MAX(cre.amount) AS amount,
            MAX(cre.register_amount) AS register_amount,
            MAX(cas.type) AS type,
            MAX(cre.register_imedamount) AS register_imedamount,
            MAX(CASE WHEN cas.type = 'I' THEN ins.rut ELSE ben.rut END) AS rut,
            MAX(CASE WHEN cas.type = 'I' THEN ins.email ELSE ben.email END) AS email,
            MAX(CASE WHEN cas.type = 'I' THEN ins.phone ELSE ben.phone END) AS phone,
            MAX(CASE WHEN cas.type = 'I' THEN CONCAT(ins.name, ' ', ins.paternalLastName, ' ', ins.paternalLastName) ELSE CONCAT(ben.name, ' ', ben.paternalLastName, ' ', ben.paternalLastName) END) AS name,
            ROW_NUMBER() OVER () AS row_number -- Nueva columna para el número de fila
        FROM
            app.casereimbursment cre
            INNER JOIN app.case cas ON cas.id = cre.case_id
            INNER JOIN app.lead lea ON cas.lead_id = lea.id
            INNER JOIN app.policy pol ON lea.policy_id = pol.id
            INNER JOIN app.insured ins ON cas.insured_id = ins.id
            LEFT OUTER JOIN app.beneficiary ben ON cas.beneficiary_id = ben.id
            INNER JOIN app.stage sta ON cas.stage_id = sta.id
            INNER JOIN app.casestage casg ON sta.id = casg.stage_id AND cas.id = casg.case_id 
            INNER JOIN app.assistance asi ON cas.assistance_id = asi.id
            INNER JOIN app.product pro ON cas.product_id = pro.id
            INNER JOIN app.productassistance pas ON asi.id = pas.assistance_id AND pro.id = pas.product_id
            LEFT OUTER JOIN temp_table tmp ON CASE WHEN cas.type = 'I' THEN ins.id ELSE ben.id END = tmp.person_id
        WHERE
            (p_isimed IS NULL OR (p_isimed IS TRUE AND NOT cre.register_imedamount IS NULL) OR (p_isimed IS FALSE AND NOT cre.register_amount IS NULL)) AND
            (p_rut IS NULL OR ins.rut = p_rut OR ben.rut = p_rut) AND
            (p_name IS NULL OR LOWER(TRIM(CONCAT(ins.name, ' ', ins.paternalLastName, ' ', ins.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%' OR LOWER(TRIM(CONCAT(ben.name, ' ', ben.paternalLastName, ' ', ben.paternalLastName))) LIKE '%' || LOWER(TRIM(p_name)) || '%')
        GROUP BY
            cas.number
        ORDER BY
            cas.number
    ) AS case_table
    WHERE
        row_number > (p_page - 1) * p_records -- Aplicar paginación
        AND row_number <= p_page * p_records;

    -- Devolver el resultado
    RETURN JSON_BUILD_OBJECT(
        'summary', JSON_BUILD_OBJECT(
            'cases', p_rows),
        'pagination', JSON_BUILD_OBJECT(
            'total', p_total,
            'page', p_page,
            'records', p_records),
        'data', json_report
    );
END;
$$
LANGUAGE plpgsql;

-- Ejecutar la función
SELECT app.case_get_reimbursment(true, null, 'fran', 10, 1);