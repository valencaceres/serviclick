export const _selectAll = (_where: string) => `
    select 	max(type) as type,
            id,
            max(rut) as rut,
            max(name) as name,
            max(address) as address,
            max(district) as district,
            max(email) as email,
            max(phone) as phone,
            sum(active_product) as quantity
    from (	select 	'C' as type,
                    com.id,
                    com.rut,
                    com.companyname as name,
                    com.address,
                    com.district,
                    com.email,
                    com.phone,
                    case when lea.paymenttype_code in ('A', 'I') then 1 else 0 end as active_product
            from 	app.company com
                        left outer join app.lead lea on lea.company_id = com.id and lea.paymenttype_code in ('A', 'I')
                        
            union 	all
            
            select 	'C' as type,
                    com.id,
                    com.rut,
                    com.companyname as name,
                    com.address,
                    com.district,
                    com.email,
                    com.phone,
                    case when sus.status_id in (1, 2, 3, 4, 6) then 1 else 0 end as active_product
            from 	app.company com
                        left outer join app.lead lea on lea.company_id = com.id
                        left outer join app.subscription sus on lea.subscription_id = sus.subscription_id
                        
            union 	all
                    
            select 	'P' as type,
                    cus.id,
                    cus.rut,
                    concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as name,
                    cus.address,
                    cus.district,
                    cus.email,
                    cus.phone,
                    case when lea.paymenttype_code in ('A', 'I') then 1 else 0 end as active_product
            from 	app.customer cus
                        left outer join app.lead lea on lea.customer_id = cus.id and lea.paymenttype_code in ('A', 'I')
                        
            union 	all
                        
            select 	'P' as type,
                    cus.id,
                    cus.rut,
                    concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as name,
                    cus.address,
                    cus.district,
                    cus.email,
                    cus.phone,
                    case when sus.status_id in (1, 2, 3, 4, 6) then 1 else 0 end as active_product
            from 	app.customer cus
                        left outer join app.lead lea on lea.customer_id = cus.id
                        left outer join app.subscription sus on lea.subscription_id = sus.subscription_id) as contractor
    where 	active_product >= 0 ${_where}
    group 	by
            id
    order 	by
            name`;

export const _selectById = (_id: string) => `
            select 	id,
                    max(type) as type,
                    max(rut) as rut,
                    max(companyname) as companyname,
                    max(name) as name,
                    max(paternallastname) as paternallastname,
                    max(maternallastname) as maternallastname,
                    max(legalrepresentative) as legalrepresentative,
                    max(line) as line,
                    max(birthdate) as birthdate,
                    max(address) as address,
                    max(district) as district,
                    max(email) as email,
                    max(phone) as phone
            from (	select 	'C' as type,
                            id,
                            rut,
                            companyname,
                            '' as name,
                            '' as paternallastname,
                            '' as maternallastname,
                            legalrepresentative,
                            line,
                            '' as birthdate,
                            address,
                            district,
                            email,
                            phone
                    from 	app.company
                    where   id = '${_id}'
                                
                    union 	all
                            
                    select 	'P' as type,
                            id,
                            rut,
                            '' as companyname,
                            name,
                            paternallastname,
                            maternallastname,
                            '' as legalrepresentative,
                            '' as line,
                            to_char(birthdate, 'YYYY-MM-DD') AS birthdate,
                            address,
                            district,
                            email,
                            phone
                    from 	app.customer
                    where   id = '${_id}') as contractor
            group 	by
                    id
            order 	by
                    name`;

export const _selectByRut = (_rut: string, _type: string) =>
  _type === "C"
    ? ` select 	id,
                rut,
                companyname,
                '' as name,
                '' as paternallastname,
                '' as maternallastname,
                legalrepresentative,
                line,
                '' as birthdate,
                address,
                district,
                email,
                phone
        from 	app.company
        where   rut = '${_rut}'`
    : ` select 	id,
                rut,
                '' as companyname,
                name,
                paternallastname,
                maternallastname,
                '' as legalrepresentative,
                '' as line,
                to_char(birthdate, 'YYYY-MM-DD') AS birthdate,
                address,
                district,
                email,
                phone
        from 	app.customer
        where   rut = '${_rut}'`;
