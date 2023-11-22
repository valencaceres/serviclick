CREATE OR REPLACE FUNCTION app.customer_upsert(p_rut character varying, p_name character varying, p_paternallastname character varying, p_maternallastname character varying, p_address character varying, p_district character varying, p_email character varying, p_phone character varying)
 RETURNS TABLE(customer_id uuid, customer_rut character varying, customer_name character varying, customer_paternallastname character varying, customer_maternallastname character varying, customer_address character varying, customer_district character varying, customer_email character varying, customer_phone character varying)
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_id uuid;
BEGIN
    INSERT INTO app.customer (rut, name, paternallastname, maternallastname, address, district, email, phone)
    VALUES (p_rut, p_name, p_paternallastname, p_maternallastname, p_address, p_district, p_email, p_phone)
    ON	CONFLICT (rut)
    DO	UPDATE
    set	name = case when p_name = '' then app.customer.name else p_name end,
		paternallastname = case when p_paternallastname = '' then app.customer.paternallastname else p_paternallastname end,
		maternallastname = case when p_maternallastname = '' then app.customer.maternallastname else p_maternallastname end,
		address = case when p_address = '' then app.customer.address else p_address end,
		district = case when p_district = '' then app.customer.district else p_district end,
		email = case when p_email = '' then app.customer.email else p_email end,
		phone = case when p_phone = '' then app.customer.phone else p_phone end
    RETURNING id INTO new_id;

    RETURN 	QUERY
    SELECT  cus.id,
			cus.rut as rut,
			cus.name,
			cus.paternallastname,
			cus.maternallastname,
			cus.address,
			cus.district,
			cus.email,
			cus.phone
    FROM 	app.customer as cus
    WHERE 	id = new_id;
   
END;

$function$
;