-- DROP FUNCTION app.case_get_dates();

CREATE OR REPLACE FUNCTION app.case_get_dates()
 RETURNS json
 LANGUAGE plpgsql
AS $function$
DECLARE
    created_dates json[];
    event_dates json[];
BEGIN
    -- Cambiar el localizador para nombres de meses en español en sistemas Unix

    SELECT ARRAY(
        SELECT DISTINCT ON (EXTRACT(YEAR FROM createddate), EXTRACT(MONTH FROM createddate))
            jsonb_pretty(jsonb_build_object(
                'month', TO_CHAR(createddate, 'Month'),
                'year', TO_CHAR(createddate, 'YYYY')
            ))
        FROM app.case
        WHERE createddate IS NOT NULL
        ORDER BY EXTRACT(YEAR FROM createddate) DESC, EXTRACT(MONTH FROM createddate) DESC
    )
    INTO created_dates;

    SELECT ARRAY(
        SELECT DISTINCT ON (EXTRACT(YEAR FROM event_date), EXTRACT(MONTH FROM event_date))
            jsonb_pretty(jsonb_build_object(
                'month', TO_CHAR(event_date, 'Month'),
                'year', TO_CHAR(event_date, 'YYYY')
            ))
        FROM app.case
        WHERE event_date IS NOT NULL
        ORDER BY EXTRACT(YEAR FROM event_date) DESC, EXTRACT(MONTH FROM event_date) DESC
    )
    INTO event_dates;

    RETURN json_build_object('createdDates', created_dates, 'eventDates', event_dates);
END;
$function$
;
