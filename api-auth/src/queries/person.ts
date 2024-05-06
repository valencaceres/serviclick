export const _getAll = `SELECT 
                                id, 
                                rut, 	
                                name, 	
                                paternallastname, 
                                maternallastname,
                                address,
                                COALESCE(district, '') as districtName,
                                email,
                                phone
                        FROM 
                                app.person 
                                WHERE 
                                deletedat IS NULL;
`;

export const _getById = `SELECT 
                                id, 
                                rut, 	
                                name, 	
                                paternallastname, 
                                maternallastname,
                                address,
                                COALESCE(district, '') as districtName,
                                email,
                                phone,
                                createdat ,
                                updatedat 
                        FROM 
                                app.person 
                        WHERE 
                                deletedat IS NULL AND id = ($1);
`;

export const _getByRut = ` SELECT 
                                per.id, 
                                rut, 	
                                name, 	
                                paternallastname, 
                                maternallastname,
                                address,
                                COALESCE(dtc.district_name, per.district) as districtName,
                                email,
                                phone,
                                createdat ,
                                updatedat 
                        FROM 
                                app.person per
                        LEFT JOIN 
                                app.district dtc ON dtc.id = per.district_id
                        WHERE 
                                per.deletedat IS NULL AND rut = ($1);`;

export const _upsert = `INSERT INTO app.person (rut, "name", paternallastname, maternallastname, email, phone, address, district_id, birthdate, createdat, updatedat)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NULL)
                        ON CONFLICT (rut) DO UPDATE
                        SET
                        "name" = EXCLUDED."name",
                        paternallastname = EXCLUDED.paternallastname,
                        maternallastname = EXCLUDED.maternallastname,
                        email = EXCLUDED.email,
                        phone = EXCLUDED.phone,
                        address = EXCLUDED.address,
                        district_id = EXCLUDED.district_id,
                        birthdate = EXCLUDED.birthdate,
                        createdat = CASE WHEN excluded.rut IS DISTINCT FROM app.person.rut THEN NOW() ELSE app.person.createdat END,
                        updatedat = CASE WHEN (EXCLUDED."name", EXCLUDED.paternallastname, EXCLUDED.maternallastname, EXCLUDED.email, EXCLUDED.phone, EXCLUDED.address, EXCLUDED.district_id, EXCLUDED.birthdate) IS DISTINCT FROM (app.person."name", app.person.paternallastname, app.person.maternallastname, app.person.email, app.person.phone, app.person.address, app.person.district_id, app.person.birthdate) THEN NOW() ELSE app.person.updatedat END
                        RETURNING
                        app.person.id,
                        app.person.rut,
                        app.person."name",
                        app.person.paternallastname,
                        app.person.maternallastname,
                        app.person.address,
                        app.district.districtname AS districtname,
                        app.person.email,
                        app.person.phone,
                        app.person.createdat,
                        app.person.updatedat;
`;

export const _deleteById = `UPDATE app.person 
                            SET deletedAt = NOW()
                            WHERE id = ($1)
                            RETURNING id, deletedat`;
