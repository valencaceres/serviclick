import pool from "../util/database";

const create: any = async (person_id: string) => {
  try {
    const specialistExists = await pool.query(
      `
      SELECT * FROM app.specialist WHERE person_id = $1`,
      [person_id]
    );

    if (specialistExists.rows.length > 0) {
      const result = await pool.query(
        `
        UPDATE app.specialist
        SET isactive = true
        WHERE person_id = $1
        RETURNING *`,
        [person_id]
      );

      return {
        success: true,
        data: result.rows[0],
        error: null,
      };
    }

    const result = await pool.query(
      `
      INSERT INTO app.specialist (person_id, isactive) VALUES ($1, $2) RETURNING *`,
      [person_id, true]
    );

    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteSpecialistById: any = async (id: string) => {
  try {
    const resultSpecialistExists = await pool.query(
      "UPDATE app.specialist SET isactive = false WHERE id = $1",
      [id]
    );
    return { success: true, data: { deleted: true }, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT SPE.id,
              PER.id as person_id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.address,
              PER.district,
              PER.email,
              PER.phone,
              to_char(PER.birthdate, 'YYYY-MM-DD') as birthdate
       FROM   app.specialist SPE
                INNER JOIN app.person PER ON SPE.person_id = PER.id
       WHERE  SPE.id = $1`,
      [id]
    );

    const {
      person_id,
      rut,
      email,
      name,
      paternallastname,
      maternallastname,
      phone,
      address,
      district,
      birthdate,
    } = result.rows[0];

    return {
      success: true,
      data: {
        id,
        person_id,
        rut,
        email,
        name,
        paternalLastName: paternallastname,
        maternalLastName: maternallastname,
        phone,
        address,
        district,
        birthDate: birthdate,
      },
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `SELECT SPE.id,
              PER.id as person_id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.address,
              PER.district,
              PER.email,
              PER.phone,
              to_char(PER.birthdate, 'YYYY-MM-DD') as birthdate
        FROM   app.specialist SPE INNER JOIN app.person PER ON SPE.person_id = PER.id
        WHERE  PER.rut = $1`,
      [rut]
    );

    if (result.rows.length > 0) {
      const data = {
        id: result.rows[0].id,
        person_id: result.rows[0].person_id,
        rut: result.rows[0].rut,
        email: result.rows[0].email,
        name: result.rows[0].name,
        paternalLastName: result.rows[0].paternallastname,
        maternalLastName: result.rows[0].maternallastname,
        phone: result.rows[0].phone,
        address: result.rows[0].address,
        district: result.rows[0].district,
        birthDate: result.rows[0].birthdate,
      };

      return { success: true, data, error: null };
    }

    return { success: true, data: null, error: "Person does not exist" };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT SPE.id,
              PER.id as person_id,
              PER.rut,
              PER.name,
              PER.paternalLastName,
              PER.maternalLastName,
              PER.address,
              PER.district,
              PER.email,
              PER.phone,
              to_char(PER.birthdate, 'YYYY-MM-DD') as birthdate
       FROM   app.specialist SPE INNER JOIN app.person PER ON SPE.person_id = PER.id
       WHERE  SPE.isactive is true`
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              person_id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              phone,
              birthdate,
            } = item;
            return {
              id,
              person_id,
              rut,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              address,
              district,
              email,
              phone,
              birthDate: birthdate,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamilies = async () => {
  try {
    const result = await pool.query(
      `
        SELECT  DISTINCT
                FAM.id,
                FAM.icon,
                FAM.name,
                SPE.id,
                SPE.name
        FROM    app.family FAM
        INNER JOIN app.specialty SPE ON SPE.family_id = FAM.id
        WHERE   FAM.isactive is true
        ORDER BY FAM.id`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAssistances = async (family_id: string) => {
  try {
    const result = await pool.query(
      `
        select  DISTINCT
                asi.id,
                asi.name
        from    app.specialist spe
                  inner join app.specialistspecialty ssp on spe.id = ssp.specialist_id
                  inner join app.person per ON spe.person_id = per.id
                  inner join app.assistancespecialty asp on ssp.specialty_id = asp.specialty_id
                  inner join app.assistance asi on asp.assistance_id = asi.id
                  inner join app.family fam on asi.family_id = fam.id
        where   asi.name != ''
                ${family_id !== "" ? `and fam.id = '${family_id}'` : ""}
        order   by
                asi.name`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByFamilyAssistance = async (
  family_id: string,
  assistance_id: string
) => {
  try {
    const result = await pool.query(
      `
      select	spe.id,
              per.id as person_id,
              per.rut,
              per.name,
              per.paternalLastName,
              per.maternalLastName,
              per.address,
              per.district,
              per.email,
              per.phone,
              to_char(per.birthdate, 'YYYY-MM-DD') as birthdate
        from  app.specialist spe
                inner join app.specialistspecialty ssp on spe.id = ssp.specialist_id
                inner join app.person per ON spe.person_id = per.id
                inner join app.assistancespecialty asp on ssp.specialty_id = asp.specialty_id
                inner join app.assistance asi on asp.assistance_id = asi.id
                inner join app.family fam on asi.family_id = fam.id
        where per.rut != ''
              ${family_id !== "" ? `and fam.id = '${family_id}'` : ""}
              ${assistance_id !== "" ? `and asi.id = '${assistance_id}'` : ""}
        order by
              per.name,
              per.paternallastname,
              per.maternallastname`
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              person_id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              phone,
              birthdate,
            } = item;
            return {
              id,
              person_id,
              rut,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              address,
              district,
              email,
              phone,
              birthDate: birthdate,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getBySpecialtyId: any = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT *
      FROM app.person
      INNER JOIN app.specialist ON app.person.id = app.specialist.person_id
      INNER JOIN app.specialistspecialty ON app.specialist.id = app.specialistspecialty.specialist_id
      WHERE app.specialistspecialty.specialty_id = $1;`,
      [id]
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              person_id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              phone,
              birthdate,
            } = item;
            return {
              id,
              person_id,
              rut,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              address,
              district,
              email,
              phone,
              birthDate: birthdate,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByName: any = async (name: string) => {
  try {
    const result = await pool.query(
      `SELECT *
      FROM app.person
      INNER JOIN app.specialist ON app.person.id = app.specialist.person_id
      WHERE app.person.name LIKE '%' || $1 || '%';`,
      [name]
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              person_id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              phone,
              birthdate,
            } = item;
            return {
              id,
              person_id,
              rut,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              address,
              district,
              email,
              phone,
              birthDate: birthdate,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByDistrict: any = async (district: string, assistance_id: string) => {
  try {
    const result = await pool.query(
      `SELECT DISTINCT ON
        (app.person.id)
        app.person.id,
        app.person.rut,
        app.person.name,
        app.person.paternallastname,
        app.person.maternallastname,
        app.person.address,
        app.person.district,
        app.person.email,
        app.person.phone,
        app.person.birthdate
      FROM app.person
      INNER JOIN app.specialist ON app.person.id = app.specialist.person_id
      INNER JOIN app.specialistspecialty ON app.specialist.id = app.specialistspecialty.specialist_id
      INNER JOIN app.specialistdistrict ON app.specialist.id = app.specialistdistrict.specialist_id
      INNER JOIN app.assistancespecialty ON app.specialistspecialty.specialty_id = app.assistancespecialty.specialty_id
      INNER JOIN app.assistance ON app.assistancespecialty.assistance_id = app.assistance.id
      WHERE app.specialistdistrict.district_id = $1 AND app.assistance.id = $2;`,
      [district, assistance_id]
    );

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              rut,
              email,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              phone,
              birthdate,
            } = item;
            return {
              id,
              rut,
              email,
              name,
              paternalLastName: paternallastname,
              maternalLastName: maternallastname,
              address,
              district,
              phone,
              birthDate: birthdate,
            };
          })
        : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  deleteSpecialistById,
  getById,
  getByRut,
  getAll,
  getFamilies,
  getAssistances,
  getByFamilyAssistance,
  getBySpecialtyId,
  getByName,
  getByDistrict,
};
