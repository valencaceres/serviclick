CREATE OR REPLACE FUNCTION app.gtrgm_same(app.gtrgm, app.gtrgm, internal)
 RETURNS internal
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_same$function$
;
