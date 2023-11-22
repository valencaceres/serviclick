CREATE OR REPLACE FUNCTION app.gtrgm_union(internal, internal)
 RETURNS app.gtrgm
 LANGUAGE c
 IMMUTABLE PARALLEL SAFE STRICT
AS '$libdir/pg_trgm', $function$gtrgm_union$function$
;
