export const _getService = `
select case 
		when not bro.id is null then 'broker'
		when not age.id is null then 'web'
		when not ret.id is null then 'retail'
	end as channel_code
from app.lead lea
		left outer join app.broker bro on bro.id = lea.agent_id 
		left outer join app.agent age on age.id = lea.agent_id 
		left outer join app.retail ret on ret.id = lea.agent_id 
where lea.id = $1
`