CREATE OR REPLACE FUNCTION app.gtrgm_in(cstring)
 RETURNS app.gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_in$function$
;
