export const _getAllRetails = `
    select	DISTINCT
            ret.id as retail_id,
            ret.rut as retail_rut,
            ret.name as retail_name
    from	app.retail ret
                inner join app.retailproduct rpr on ret.id = rpr.retail_id
                inner join app.productplan ppl on rpr.plan_id = ppl.plan_id
                inner join app.product pro on ppl.product_id = pro.id
                inner join app.fileformat fil on fil.productplan_id = ppl.id
    order 	by
            ret.name`;
