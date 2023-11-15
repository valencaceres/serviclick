export const _getProcessById = `
    select 	json_build_object(
                'product', json_build_object(
                    'id', pro.id,
                    'name', pro.name),
                'agent', 
                    case 
                        when not ret.id is null then json_build_object('type', 'Retail', 'id', ret.id, 'rut', ret.rut, 'name', ret.name)
                        when not bro.id is null then json_build_object('type', 'Broker', 'id', bro.id, 'rut', bro.rut, 'name', bro.name)
                        when not age.id is null then json_build_object('type', 'Web', 'id', age.id, 'name', age.name)
                    end,
                'process', json_build_object(
                    'code', apr.process_code,
                    'url', apr.url_redirect)) as process
    from 	app.productplan ppl
                inner join app.product pro on ppl.product_id = pro.id
                left outer join app.retail ret on ppl.agent_id = ret.id
                left outer join app.broker bro on ppl.agent_id = bro.id
                left outer join app.agent age on ppl.agent_id = age.id
                left outer join app.agentprocess apr on ppl.agent_id = apr.agent_id
    where 	ppl.id = $1`;
