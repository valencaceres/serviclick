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
  broker_id: string,
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  email: string,
  profileCode: string
) => {
  try {
    const arrayValues = [
      broker_id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      email,
      profileCode,
    ];

    const resultBroker = await pool.query(
      "SELECT 1 FROM app.userbroker WHERE broker_id = $1 and rut = $2",
      [broker_id, rut]
    );

    let query: string;
    if (resultBroker.rows.length > 0) {
      query = `
        UPDATE  app.userbroker
        SET     broker_id = $1,
                rut = $2,
                name = $3,
                paternallastname = $4,
                maternallastname = $5,
                email = $6,
                profilecode = $7,
                isactive = true
        WHERE   broker_id = $1 and rut = $2 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.userbroker(
                broker_id,
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
      broker_id: result.rows[0].broker_id,
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

const inactiveAllByBrokerId: any = async (broker_id: string) => {
  try {
    const query = `UPDATE app.userbroker SET isactive = false WHERE broker_id = $1`;
    const result = await pool.query(query, [broker_id]);

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    console.log(id, password, hash);
    await pool.query("UPDATE app.userbroker SET hash = $2 WHERE id = $1", [
      id,
      hash,
    ]);

    return { success: true, data: "Password updated", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (broker_rut: string, email: string) => {
  try {
    const result = await pool.query(
      `
          SELECT  bro.id as broker_id,
                  bro.name as broker_name,
                  usr.id,
                  usr.rut,
                  usr.name,
                  usr.paternallastname,
                  usr.maternallastname,
                  usr.email,
                  usr.profilecode,
                  usr.hash,
                  bro.logo
          FROM    app.userbroker usr inner join app.broker bro on usr.broker_id = bro.id
          WHERE   bro.rut = $1 and 
                  usr.email = $2`,
      [broker_rut, email]
    );

    const {
      broker_id,
      broker_name,
      id,
      rut,
      name,
      paternallastname,
      maternallastname,
      profilecode,
      hash,
      logo,
    } = result.rows[0] || [];

    const data = {
      broker: {
        id: broker_id,
        rut: broker_rut,
        name: broker_name,
        logo,
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

const getByBrokerId: any = async (broker_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  broker_id,
                rut,
                name,
                paternallastname,
                maternallastname,
                email,
                profileCode
        FROM    app.userbroker
        WHERE   broker_id = $1 and isactive is true
        ORDER   BY
                name`,
      [broker_id]
    );

    const data = result.rows.map((row) => {
      const {
        broker_id,
        rut,
        name,
        paternallastname,
        maternallastname,
        email,
        profilecode,
      } = row;
      return {
        broker_id: broker_id,
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
  inactiveAllByBrokerId,
  assignPassword,
  getByEmail,
  getByBrokerId,
};
