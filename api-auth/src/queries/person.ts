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
                        VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), NOW(), NULL)
                        ON CONFLICT (rut) DO UPDATE
                        SET
                            "name" = EXCLUDED."name",
                            paternallastname = EXCLUDED.paternallastname,
                            maternallastname = EXCLUDED.maternallastname,
                            email = EXCLUDED.email,
                            phone = EXCLUDED.phone,
                            address = EXCLUDED.address,
                            district_id = EXCLUDED.district_id,,
                            birthdate = EXCLUDED.birthdate,
                            createdat = CASE WHEN app.person.rut IS DISTINCT FROM EXCLUDED.rut THEN NOW() ELSE app.person.createdat END,
                            updatedat = CASE WHEN app.person."name" IS DISTINCT FROM EXCLUDED."name" OR
                                                app.person.paternallastname IS DISTINCT FROM EXCLUDED.paternallastname OR
                                                app.person.maternallastname IS DISTINCT FROM EXCLUDED.maternallastname OR
                                                app.person.email IS DISTINCT FROM EXCLUDED.email OR
                                                app.person.phone IS DISTINCT FROM EXCLUDED.phone OR
                                                app.person.address IS DISTINCT FROM EXCLUDED.address OR
                                                app.person.district_id IS DISTINCT FROM EXCLUDED.district_id OR
                                                app.person.birthdate IS DISTINCT FROM EXCLUDED.birthdate
                                            THEN NOW() ELSE app.person.updatedat END;`;

export const _deleteById = `UPDATE app.person 
                            SET deletedAt = NOW()
                            WHERE id = ($1)`;
