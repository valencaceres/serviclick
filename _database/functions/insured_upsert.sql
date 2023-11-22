CREATE OR REPLACE FUNCTION app.insured_upsert(p_rut character varying, p_name character varying, p_paternallastname character varying, p_maternallastname character varying, p_address character varying, p_district character varying, p_email character varying, p_phone character varying, p_birthdate character varying)
 RETURNS TABLE(insured_id uuid, insured_rut character varying, insured_name character varying, insured_paternallastname character varying, insured_maternallastname character varying, insured_address character varying, insured_district character varying, insured_email character varying, insured_phone character varying, insured_birthdate date)
 LANGUAGE plpgsql
AS $function$

DECLARE new_id uuid;

BEGIN

    INSERT INTO app.insured (rut, name, paternallastname, maternallastname, address, district, email, phone, birthdate)
    VALUES (p_rut, p_name, p_paternallastname, p_maternallastname, p_address, p_district, p_email, p_phone, TO_DATE(p_birthdate,'YYYY-MM-DD'))
    ON	CONFLICT (rut)
    DO	UPDATE
    set	name = case when p_name = '' then app.insured.name else p_name end,
		paternallastname = case when p_paternallastname = '' then app.insured.paternallastname else p_paternallastname end,
		maternallastname = case when p_maternallastname = '' then app.insured.maternallastname else p_maternallastname end,
		address = case when p_address = '' then case when app.insured.address is null then '' else app.insured.address end else p_address end,
		district = case when p_district = '' then app.insured.district else p_district end,
		email = case when p_email = '' then app.insured.email else p_email end,
		phone = case when p_phone = '' then app.insured.phone else p_phone end,
        birthdate = case when p_birthdate = '' then case when app.insured.birthdate > '1923-01-01' then app.insured.birthdate else null end else TO_DATE(p_birthdate,'YYYY-MM-DD') end
    RETURNING id INTO new_id;

    RETURN 	QUERY
    SELECT  ins.id,
			ins.rut as rut,
			ins.name,
			ins.paternallastname,
			ins.maternallastname,
			ins.address,
			ins.district,
			ins.email,
			ins.phone,
            ins.birthdate
    FROM 	app.insured as ins
    WHERE 	id = new_id;
   
END;

$function$
;