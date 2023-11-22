CREATE OR REPLACE FUNCTION app.beneficiary_upsert(p_rut character varying, p_name character varying, p_paternallastname character varying, p_maternallastname character varying, p_address character varying, p_district character varying, p_email character varying, p_phone character varying, p_birthdate character varying)
 RETURNS TABLE(beneficiary_id uuid, beneficiary_rut character varying, beneficiary_name character varying, beneficiary_paternallastname character varying, beneficiary_maternallastname character varying, beneficiary_address character varying, beneficiary_district character varying, beneficiary_email character varying, beneficiary_phone character varying, beneficiary_birthdate date)
 LANGUAGE plpgsql
AS $function$

DECLARE new_id uuid;

BEGIN

    INSERT INTO app.beneficiary (rut, name, paternallastname, maternallastname, address, district, email, phone, birthdate)
    VALUES (p_rut, p_name, p_paternallastname, p_maternallastname, p_address, p_district, p_email, p_phone, TO_DATE(p_birthdate,'YYYY-MM-DD'))
    ON	CONFLICT (rut)
    DO	UPDATE
    set	name = case when p_name = '' then app.beneficiary.name else p_name end,
		paternallastname = case when p_paternallastname = '' then app.beneficiary.paternallastname else p_paternallastname end,
		maternallastname = case when p_maternallastname = '' then app.beneficiary.maternallastname else p_maternallastname end,
		address = case when p_address = '' then case when app.beneficiary.address is null then '' else app.beneficiary.address end else p_address end,
		district = case when p_district = '' then app.beneficiary.district else p_district end,
		email = case when p_email = '' then app.beneficiary.email else p_email end,
		phone = case when p_phone = '' then app.beneficiary.phone else p_phone end,
        birthdate = case when p_birthdate = '' then case when app.beneficiary.birthdate > '1923-01-01' then app.beneficiary.birthdate else null end else TO_DATE(p_birthdate,'YYYY-MM-DD') end
    RETURNING id INTO new_id;

    RETURN 	QUERY
    SELECT  ben.id,
			ben.rut as rut,
			ben.name,
			ben.paternallastname,
			ben.maternallastname,
			ben.address,
			ben.district,
			ben.email,
			ben.phone,
            ben.birthdate
    FROM 	app.beneficiary as ben
    WHERE 	id = new_id;
   
END;

$function$
;
