CREATE OR REPLACE FUNCTION app.get_case_dates()
RETURNS json
LANGUAGE plpgsql
AS $function$
DECLARE
    created_dates json[];
    event_dates json[];
BEGIN
    SELECT ARRAY(
        SELECT DISTINCT jsonb_pretty(jsonb_build_object(
            'month', TO_CHAR(c.createddate, 'Month'),
            'year', TO_CHAR(c.createddate, 'YYYY')
        ))
        FROM app.case c
        WHERE c.createddate IS NOT NULL
    )
    INTO created_dates;

    SELECT ARRAY(
        SELECT DISTINCT jsonb_pretty(jsonb_build_object(
            'month', TO_CHAR(c.event_date, 'Month'),
            'year', TO_CHAR(c.event_date, 'YYYY')
        ))
        FROM app.case c
        WHERE c.event_date IS NOT NULL
    )
    INTO event_dates;

    RETURN json_build_object('createdDates', created_dates, 'eventDates', event_dates);
END;
$function$;