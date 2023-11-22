CREATE OR REPLACE FUNCTION app.person_upsert(p_rut character varying, p_name character varying, p_paternallastname character varying, p_maternallastname character varying, p_address character varying, p_district character varying, p_email character varying, p_phone character varying, p_birthdate character varying)
 RETURNS TABLE(person_id uuid, person_rut character varying, person_name character varying, person_paternallastname character varying, person_maternallastname character varying, person_address character varying, person_district character varying, person_email character varying, person_phone character varying, person_birthdate date)
 LANGUAGE plpgsql
AS $function$

DECLARE new_id uuid;

BEGIN

    INSERT INTO app.person (rut, name, paternallastname, maternallastname, address, district, email, phone, birthdate)
    VALUES (p_rut, p_name, p_paternallastname, p_maternallastname, p_address, p_district, p_email, p_phone, TO_DATE(p_birthdate,'YYYY-MM-DD'))
    ON	CONFLICT (rut)
    DO	UPDATE
    set	name = case when p_name = '' then app.person.name else p_name end,
		paternallastname = case when p_paternallastname = '' then app.person.paternallastname else p_paternallastname end,
		maternallastname = case when p_maternallastname = '' then app.person.maternallastname else p_maternallastname end,
		address = case when p_address = '' then case when app.person.address is null then '' else app.person.address end else p_address end,
		district = case when p_district = '' then app.person.district else p_district end,
		email = case when p_email = '' then app.person.email else p_email end,
		phone = case when p_phone = '' then app.person.phone else p_phone end,
        birthdate = case when p_birthdate = '' then case when app.person.birthdate > '1923-01-01' then app.person.birthdate else null end else TO_DATE(p_birthdate,'YYYY-MM-DD') end
    RETURNING id INTO new_id;

    RETURN 	QUERY
    SELECT  per.id,
			per.rut as rut,
			per.name,
			per.paternallastname,
			per.maternallastname,
			per.address,
			per.district,
			per.email,
			per.phone,
            per.birthdate
    FROM 	app.person as per
    WHERE 	id = new_id;
   
END;

$function$
;
