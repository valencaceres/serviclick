CREATE OR REPLACE FUNCTION app.case_stage_upsert(p_case_id uuid, p_stage_id uuid, p_user_id character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$

begin
	
	insert	into app.casestage(
			case_id,
			createddate,
			stage_id,
			user_id)
	values(	p_case_id,
			now(),
			p_stage_id,
			p_user_id)
	on		conflict (case_id, stage_id)
	do		nothing;
	/*
	do		update
	set 	createddate = now(),
			user_id = p_user_id;
	*/

	update 	app.case
	set 	stage_id = p_stage_id
	where 	id = p_case_id;
		
end;

$function$
;