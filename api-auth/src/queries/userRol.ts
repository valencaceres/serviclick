export const _assignRol = `WITH updated_user_rol AS (
          INSERT INTO app.user_rol (user_id, rol_id) 
          VALUES ($1, $2) 
          ON CONFLICT (user_id, rol_id) DO UPDATE SET deletedat = null
          RETURNING *
          )
          SELECT 
            usr.id, 
            person_id,
            per.rut as rut, 
            per."name" as name ,
            per.paternallastname as paternalLastName,
            per.maternallastname as maternalLastName,
            per.address as address,
            COALESCE(dtc.district_name, per.district) as district_name,
            email,
            per.phone as phone,
            array(
            select 
                jsonb_build_object(
                    'id', rol.id,
                    'code', rol.code,
                    'name', rol.name
                )
            from app.user_rol url
            	inner join app.rol rol on url.rol_id = rol.id
                where 
                user_id = usr.id
            ) as roles,
             usr.createdat,
             usr.updatedat
        FROM 
            app."user"  usr
        CROSS JOIN updated_user_rol uro
        INNER JOIN 
            app.person per ON per.id = usr.person_id
        LEFT JOIN 
            app.district dtc ON per.district_id = dtc.id
        WHERE usr.id = uro.user_id and 
            usr.deletedat IS null`;

export const _removeRol = `WITH updated_user_rol AS (
          UPDATE app.user_rol
          SET deletedat = now()
          WHERE user_id = $1
          AND rol_id = $2
          RETURNING *
      )
        SELECT 
            usr.id, 
            person_id,
            per.rut as rut, 
            per."name" as name ,
            per.paternallastname as paternalLastName,
            per.maternallastname as maternalLastName,
            per.address as address,
            COALESCE(dtc.district_name, per.district) as district_name,
            email,
            per.phone as phone,
            array(
            select 
                jsonb_build_object(
                    'id', rol.id,
                    'code', rol.code,
                    'name', rol.name
                )
            from app.user_rol url
            	inner join app.rol rol on url.rol_id = rol.id
                where 
                user_id = usr.id
            ) as roles,
             usr.createdat,
             usr.updatedat
        FROM 
            app."user"  usr
        CROSS JOIN updated_user_rol uro
        INNER JOIN 
            app.person per ON per.id = usr.person_id
        LEFT JOIN 
            app.district dtc ON per.district_id = dtc.id
         WHERE usr.id = uro.user_id and 
            usr.deletedat IS null`;
