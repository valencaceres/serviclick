export const _getById = `select app.case_get_by_id($1)`;
export const _getAll = `select app.case_get_all($1, $2, $3, $4, $5, $6)`;

export const _getBeneficiaryData = `
    SELECT  ins.id AS insured_id,
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
            ben.relationship AS beneficiary_relationship,
            pro.id AS product_id,
            pro.name AS product_name,
            asi.name AS assistance_name,
            asi.id AS assistance_id,
            fam.id AS family_id,
            pra.number AS assistance_number,
            pra.amount AS assistance_amount,
            pra.currency AS assistance_currency,
            pra.maximum AS assistance_maximum,
            pra.events AS assistance_events,
            pra.lack AS assistance_lack,
            lea.id AS lead_id,
            lin.insured_id,
            lea.customer_id,
            -- lea.company_id,
            lea.createdate,
            -- COALESCE(lea.customer_id, lea.company_id) AS contractor_id
            lea.customer_id AS contractor_id
    FROM    app.lead lea
                INNER JOIN app.leadinsured lin ON lea.id = lin.lead_id 
                INNER JOIN app.insured ins ON lin.insured_id = ins.id
                INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
                INNER JOIN app.product pro ON lpr.product_id = pro.id
                INNER JOIN app.productassistance pra ON pro.id = pra.product_id
                INNER JOIN app.assistance asi ON pra.assistance_id = asi.id
                INNER JOIN app.family fam ON asi.family_id = fam.id
                LEFT OUTER JOIN app.leadbeneficiary lbe ON lea.id = lbe.lead_id AND lbe.insured_id = lin.insured_id 
                LEFT OUTER JOIN app.beneficiary ben ON lbe.beneficiary_id = ben.id
    WHERE   lea.policy_id IS NOT NULL AND (ins.rut = $1 OR ben.rut = $1)
    ORDER   BY
            pro.name,
            pra.number`;

export const _getApplicantByRut = `select app.case_get_applicant_by_rut($1);`;

export const _getServicesAndValues = `select app.case_get_services_and_values($1, $2, $3, $4, $5, $6);`;

export const _upsert = `select app.case_upsert($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);`;

export const _getRetails = `
        select	distinct
                ret.id,
                ret.rut,
                ret.name
        from	app.retail ret
                inner join app.case cas on ret.id = cas.retail_id
        order 	by
                ret.name`;

export const _getStatus = `
        select	distinct
		sta.id,
		sta.name
        from	app.stage sta
		        inner join app.case cas on sta.id = cas.stage_id
        order 	by
		sta.name`;
