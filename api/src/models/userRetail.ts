import bcrypt from "bcrypt";

import pool from "../util/database";

type ProfileT = {
  S: string;
  A: string;
};

const profileData: ProfileT = {
  S: "Vendedor",
  A: "Administrador",
};

const create: any = async (
  retail_id: string,
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  email: string,
  profileCode: string
) => {
  try {
    const arrayValues = [
      retail_id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      profileCode,
    ];

    const resultRetail = await pool.query(
      "SELECT 1 FROM app.userretail WHERE retail_id = $1 and rut = $2",
      [retail_id, rut]
    );

    let query: string;
    if (resultRetail.rows.length > 0) {
      query = `
        UPDATE  app.userretail
        SET     retail_id = $1,
                rut = $2,
                name = $3,
                paternallastname = $4,
                maternallastname = $5,
                email = $6,
                profilecode = $7,
                isactive = true
        WHERE   retail_id = $1 and rut = $2 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.userretail(
                retail_id,
                rut,
                name,
                paternallastname,
                maternallastname,
                email,
                profilecode) 
        VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      retail_id: result.rows[0].retail_id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      paternalLastName: result.rows[0].paternallastname,
      maternalLastName: result.rows[0].maternallastname,
      email: result.rows[0].email,
      profileCode: result.rows[0].profileCode,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const inactiveAllByRetailId: any = async (retail_id: string) => {
  try {
    const query = `UPDATE app.userretail SET isactive = false WHERE retail_id = $1`;
    const result = await pool.query(query, [retail_id]);

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query("UPDATE app.userretail SET hash = $2 WHERE id = $1", [
      id,
      hash,
    ]);

    return { success: true, data: "Password updated", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (retail_rut: string, email: string) => {
  try {
    const result = await pool.query(
      `
          SELECT  ret.id as retail_id,
                  ret.name as retail_name,
                  ret.legalrepresentative as retail_legalrepresentative,
                  ret.line as retail_line,
                  ret.address as retail_address,
                  ret.district as retail_district,
                  ret.email as retail_email,
                  ret.phone as retail_phone,
                  ret.logo as retail_logo,
                  usr.id,
                  usr.rut,
                  usr.name,
                  usr.paternallastname,
                  usr.maternallastname,
                  usr.email,
                  usr.profilecode,
                  usr.hash
          FROM    app.userretail usr inner join app.retail ret on usr.retail_id = ret.id
          WHERE   ret.rut = $1 and 
                  usr.email = $2`,
      [retail_rut, email]
    );

    const {
      retail_id,
      retail_name,
      retail_legalrepresentative,
      retail_line,
      retail_address,
      retail_district,
      retail_email,
      retail_phone,
      retail_logo,
      id,
      rut,
      name,
      paternallastname,
      maternallastname,
      profilecode,
      hash,
    } = result.rows[0] || [];

    const data = {
      retail: {
        id: retail_id,
        rut: retail_rut,
        name: retail_name,
        legalRepresentative: retail_legalrepresentative,
        line: retail_line,
        address: retail_address,
        district: retail_district,
        email: retail_email,
        phone: retail_phone,
        logo: retail_logo,
      },
      user: {
        id,
        rut,
        name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        email,
        profileCode: profilecode,
        profileName: profilecode === "S" ? profileData.S : profileData.A,
        hash,
      },
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRetailId: any = async (retail_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  retail_id,
                rut,
                name,
                paternallastname,
                maternallastname,
                email,
                profileCode
        FROM    app.userretail
        WHERE   retail_id = $1 and isactive is true
        ORDER   BY
                name`,
      [retail_id]
    );

    const data = result.rows.map((row) => {
      const {
        retail_id,
        rut,
        name,
        paternallastname,
        maternallastname,
        email,
        profilecode,
      } = row;
      return {
        retail_id: retail_id,
        rut: rut,
        name: name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        email: email,
        profileCode: profilecode,
        profileName: profilecode === "S" ? profileData.S : profileData.A,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  inactiveAllByRetailId,
  assignPassword,
  getByEmail,
  getByRetailId,
};
