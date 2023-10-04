export const queryGetByProductPlanId = `
    (select	'ASE' as type,
                id,
                name,
                format
    from	app.field)

    union 	all

    (select     DISTINCT
                'VAL' as type,
                val.id,
                val.name,
                case
                    when val.valuetype_code = 'D' then 'yyyy-mm-dd'
                    when val.valuetype_code = 'S' then 'Texto'
                    when val.valuetype_code = 'C' then 'Texto'
                    when val.valuetype_code = 'N' then 'Número'
                    else val.valuetype_code
                end as format
    from	app.value val
                    inner join app.assistance asi on val.family_id = asi.family_id
                    inner join app.productassistance pra on asi.id = pra.assistance_id
                    inner join app.productplan ppl on pra.product_id = ppl.product_id
    where 	ppl.id = $1
    order 	by
                val.name)`;
