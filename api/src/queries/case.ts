export const _getBeneficiaryData = `
      select case when ins.rut = $1 then 'I' else 'B' end as type,
          case when ins.rut = $1 then ins.id else ben.id end as id,
          case when ins.rut = $1 then ins.rut else ben.rut end as rut,
          case when ins.rut = $1 then ins.name else ben.name end as name,
          case when ins.rut = $1 then ins.paternallastname else ben.paternallastname end as paternallastname,
          case when ins.rut = $1 then ins.maternallastname  else ben.maternallastname  end as maternallastname,
          case when ins.rut = $1 then ins.address  else ben.address end as address,
          case when ins.rut = $1 then ins.district  else ben.district end as district,
          case when ins.rut = $1 then ins.email else ben.email end as email,
          case when ins.rut = $1 then ins.phone  else ben.phone  end as phone,
          case when ins.rut = $1 then ins.birthdate  else ben.birthdate  end as birthdate,
          pro.id as product_id,
          pro.name as product_name,
          asi.name as assistance_name,
          asi.id as assistance_id,
          fam.id as family_id,
          pra.number as assistance_number,
          pra.amount as assistance_amount,
          pra.currency as assistance_currency,
          pra.maximum as assistance_maximum,
          pra.events as assistance_events,
          pra.lack as assistance_lack,
          lea.id as lead_id,
          coalesce(lea.customer_id, lea.company_id) as contractor_id
      from app.lead lea
      inner join app.leadinsured lin on lea.id = lin.lead_id 
      inner join app.insured ins on lin.insured_id = ins.id
      inner join app.leadproduct lpr on lea.id = lpr.lead_id
      inner join app.product pro on lpr.product_id = pro.id
      inner join app.productassistance pra on pro.id = pra.product_id
      inner join app.assistance asi on pra.assistance_id = asi.id
      inner join app.family fam on asi.family_id = fam.id
      left outer join app.leadbeneficiary lbe on lea.id = lbe.lead_id and lbe.insured_id = lin.insured_id 
      left outer join app.beneficiary ben on lbe.beneficiary_id = ben.id
      where lea.policy_id is not null and (ins.rut = $1 or ben.rut = $1)
      order by  pro.name,
                pra.number`;
