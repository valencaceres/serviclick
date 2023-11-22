CREATE OR REPLACE FUNCTION app.insert_customeraccount()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO app.customeraccount (customer_id)
  SELECT NEW.id
  WHERE NEW.id NOT IN (SELECT customer_id FROM app.customeraccount);
  RETURN NEW;
END;
$function$
;
