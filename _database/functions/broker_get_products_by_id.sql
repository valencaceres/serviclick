CREATE OR REPLACE FUNCTION app.broker_get_products_by_id(p_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$

declare
	json_report json;

begin

	select 	json_agg(json_build_object(
				'id', tab.id,
				'icon', tab.icon,
				'name', tab.name,
				'products', (
					select	json_agg(json_build_object(
							    'id', pro.id,
							    'productPlan_id', ppl.id,
							  	'name', pro.name,
							    'currency', pro.currency,
							    'frequency', pro.frequency,
							    'price', ppl.price))
					from 	app.product pro
								inner join app.family fam ON pro.family_id = fam.id
								inner join app.brokerproduct bpr ON pro.id = bpr.product_id
								inner join app.productplan ppl on pro.id = ppl.product_id and ppl.agent_id = bpr.broker_id and ppl.type = 'customer'
					where 	bpr.broker_id = p_id and
							fam.id = tab.id and
						    bpr.isActive is true)))
	into 	json_report
	from (	select	fam.id,
					max(fam.icon) as icon,
					max(fam.name) as name					
			from 	app.product pro
						inner join app.family fam ON pro.family_id = fam.id
						inner join app.brokerproduct bpr ON pro.id = bpr.product_id
						inner join app.productplan ppl on pro.id = ppl.product_id and ppl.agent_id = bpr.broker_id
			where 	bpr.broker_id = p_id and
				    bpr.isActive is true
			group 	by
					fam.id
			order 	by
					name) as tab;
					
	return json_report;
		
end;
$function$
;