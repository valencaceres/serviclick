export const _getAll = `
        select  pro.id,
                pro.name,
                sta.code
        from 	app.procedure pro
                        inner join app.procedurestage pst on pro.id = pst.procedure_id
                        inner join app.stage sta on pst.stage_id = sta.id
        order 	by
                pro.name`;
