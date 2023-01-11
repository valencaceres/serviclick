export const _selectAll = (_where: string) => `
    select  max(type) as type,
            id,
            max(rut) as rut,
            max(name) as name,
            max(address) as address,
            max(district) as district,
            max(email) as email,
            max(phone) as phone,
            sum(active_product) as quantity
    from (  select  'C' as type,
                    com.id,
                    com.rut,
                    com.companyname as name,
                    com.address,
                    com.district,
                    com.email,
                    com.phone,
                    case when not pol.id is null then 1 else 0 end as active_product
            from        app.company com
                        left outer join app.lead lea on lea.company_id = com.id and lea.paymenttype_code in ('A', 'I')
                        left outer join app.policy pol on lea.policy_id = pol.id
                        
            union   all
            
            select  'C' as type,
                    com.id,
                    com.rut,
                    com.companyname as name,
                    com.address,
                    com.district,
                    com.email,
                    com.phone,
                    case when not pol.id is null then 1 else 0 end as active_product
            from 	app.company com
                        left outer join app.lead lea on lea.company_id = com.id
                        left outer join app.subscription sus on lea.subscription_id = sus.subscription_id
                        left outer join app.policy pol on lea.policy_id = pol.id
                        
            union   all
                    
            select  'P' as type,
                    cus.id,
                    cus.rut,
                    concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as name,
                    cus.address,
                    cus.district,
                    cus.email,
                    cus.phone,
                    case when not pol.id is null then 1 else 0 end as active_product
            from 	app.customer cus
                        left outer join app.lead lea on lea.customer_id = cus.id and lea.paymenttype_code in ('A', 'I')
                        left outer join app.policy pol on lea.policy_id = pol.id
                        
            union   all
                        
            select  'P' as type,
                    cus.id,
                    cus.rut,
                    concat(cus.name, ' ', cus.paternallastname, ' ', cus.maternallastname) as name,
                    cus.address,
                    cus.district,
                    cus.email,
                    cus.phone,
                    case when not pol.id is null then 1 else 0 end as active_product
            from 	app.customer cus
                        left outer join app.lead lea on lea.customer_id = cus.id
                        left outer join app.subscription sus on lea.subscription_id = sus.subscription_id
                        left outer join app.policy pol on lea.policy_id = pol.id) as contractor
    where   active_product >= 0 ${_where}
    group   by
            id
    order   by
            name`;

export const _selectById = (_id: string) => `
            select  id,
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
            from (  select  'C' as type,
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
                    from    app.company
                    where   id = '${_id}'
                                
                    union   all
                            
                    select  'P' as type,
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
            group   by
                    id
            order   by
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

export const _selectSubscriptions = `
        select 	pro.id as product_id,
                lea.subscription_id,
                pro.name as product_name,
                to_char(pol.createdate, 'YYYY-MM-DD') as createdate
        from 	app.lead lea
                        inner join app.leadproduct lpr on lea.id = lpr.lead_id
                        inner join app.policy pol on lea.policy_id = pol.id
                        inner join app.product pro on lpr.product_id = pro.id
        where 	(lea.customer_id = $1 or lea.company_id = $1)
        order 	by
                pol.createdate,
                pro.name`;

export const _selectSubscription = `
        select	sus.subscription_id,
                pro.name product_name,
                pro.frequency product_frequency,
                lpr.price as product_price,
                lpr.currency_code as product_currency_code,
                to_char(pol.createdate, 'YYYY-MM-DD') as policy_createdate,
                to_char(pol.startdate, 'YYYY-MM-DD') as policy_startdate,
                asi.name as assistance_name,
                pas.amount as assistance_amount,
                pas.currency as assistance_currency,
                pas.maximum as assistance_maximum,
                pas.events as assistance_events,
                pas.lack as assistance_lack
        from	app.lead lea 
                        inner join app.leadproduct lpr on lea.id = lpr.lead_id
                        inner join app.subscription sus on lea.subscription_id = sus.subscription_id
                        inner join app.policy pol on lea.policy_id = pol.id
                        inner join app.product pro on lpr.product_id = pro.id
                        inner join app.productassistance pas on pro.id = pas.product_id
                        inner join app.assistance asi on pas.assistance_id = asi.id
        where 	sus.subscription_id = $1
        order 	by
                pas.number`;

export const _selectInsured = `
        select	ins.id as insured_id,
                ins.rut as insured_rut,
                to_char(ins.birthdate, 'YYYY-MM-DD') as insured_birthdate,
                ins.name as insured_name,
                ins.paternallastname as insured_paternallastname,
                ins.maternallastname as insured_maternallastname,
                ins.address as insured_address,
                ins.district as insured_district,
                ins.email as insured_email,
                ins.phone as insured_phone,
                to_char(pol.createdate, 'YYYY-MM-DD') as insured_incorporation,
                case when not ben.id is null then ben.id::text else '' end as beneficiary_id,
                case when not ben.rut is null then ben.rut else '' end as beneficiary_rut,
                case when not ben.birthdate is null then to_char(ben.birthdate, 'YYYY-MM-DD') else '' end as beneficiary_birthdate,
                case when not ben.name is null then ben.name else '' end as beneficiary_name,
                case when not ben.paternallastname is null then ben.paternallastname else '' end as beneficiary_paternallastname,
                case when not ben.maternallastname is null then ben.maternallastname else '' end as beneficiary_maternallastname,
                case when not ben.address is null then ben.address else '' end as beneficiary_address,
                case when not ben.district is null then ben.district else '' end as beneficiary_district,
                case when not ben.email is null then ben.email else '' end as beneficiary_email,
                case when not ben.phone is null then ben.phone else '' end as beneficiary_phone
        from	app.lead lea 
                        inner join app.leadproduct lpr on lea.id = lpr.lead_id
                        inner join app.leadinsured lin on lea.id = lin.lead_id
                        left outer join app.leadbeneficiary lbe on lea.id = lbe.lead_id and lbe.insured_id = lin.insured_id
                        inner join app.subscription sus on lea.subscription_id = sus.subscription_id
                        inner join app.policy pol on lea.policy_id = pol.id
                        inner join app.product pro on lpr.product_id = pro.id
                        inner join app.insured ins on lin.insured_id = ins.id
                        left outer join app.beneficiary ben on lbe.beneficiary_id = ben.id
        where 	sus.subscription_id = $1
        order 	by
                ins.name,
                ins.paternallastname,
                ins.maternallastname,
                ben.name,
                ben.paternallastname,
                ben.maternallastname`;

export const _selectPayment = `
        select 	lea.subscription_id,
                max(pro.id::text) as product_id,
                max(pro.name) as product_name,
                max(to_char(pol.createdate, 'YYYY-MM-DD')) as createdate,
                max(fre.name) as frequency,
                max(pla.price) as price,
                count(1) as insured,
                max(DATE_PART('month', age(to_char(now(), 'YYYY-MM-DD')::date, pol.createdate)) + 1) as collected_dues,
                sum(pla.price * (DATE_PART('month', age(to_char(now(), 'YYYY-MM-DD')::date, pol.createdate)) + 1)) as collected_amount,
                max(pay.paid) as paid_dues, 
                sum(pay.amount) as paid_amount
        from 	app.lead lea
                        inner join app.leadproduct lpr on lea.id = lpr.lead_id
                        inner join app.policy pol on lea.policy_id = pol.id
                        inner join app.product pro on lpr.product_id = pro.id
                        inner join app.productplan pla on pro.id = pla.product_id and lea.agent_id = pla.agent_id and pla.type = case when lea.company_id is null then 'customer' else 'company' end
                        inner join app.frequency fre on pla.frequency = fre.code
                        inner join app.leadinsured lin on lea.id = lin.lead_id
                        inner join (
                                select	pay.subscription_id,
                                        count(1) as paid,
                                        sum(pay.amount) as amount
                                from	app.payment pay
                                                inner join app.lead lea on pay.subscription_id = lea.subscription_id
                                where 	(lea.customer_id = $1 or lea.company_id = $1)
                                group 	by
                                        pay.subscription_id) pay on lea.subscription_id = pay.subscription_id
        where 	(lea.customer_id = $1 or lea.company_id = $1)
        group 	by
                lea.subscription_id
        order 	by
                createdate,
                product_name`;
