import pool from "../util/database";

const create: any = async (person_id: string) => {
  try {
    const resultSpecialistExists = await pool.query(
      "SELECT id, person_id, isactive FROM app.specialist WHERE person_id = $1",
      [person_id]
    );

    if (resultSpecialistExists.rows.length === 0) {
      const result = await pool.query(
        "INSERT INTO app.specialist(person_id) VALUES ($1) RETURNING *",
        [person_id]
      );

      const { id, isactive, type } = result.rows[0];

      const data = {
        id,
        person_id,
        isActive: isactive,
      };

      return { success: true, data, error: null };
    } else {
      const { id, person_id, isactive } = resultSpecialistExists.rows[0];

      const data = {
        id,
        person_id,
        isActive: isactive,
      };

      return { success: true, data, error: null };
    }
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
       FROM   app.specialist SPE INNER JOIN app.person PER ON SPE.person_id = PER.id
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

    const {
      id,
      person_id,
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
        select  DISTINCT
                fam.id,
                fam.icon,
                fam.name
        from    app.family fam
                  inner join app.assistance asi on fam.id = asi.family_id
                  inner join app.assistancespecialty asp on asi.id = asp.assistance_id
                  inner join app.specialistspecialty ssp on asp.specialty_id = ssp.specialty_id
        order 	by
                fam.name`
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

export {
  create,
  deleteSpecialistById,
  getById,
  getByRut,
  getAll,
  getFamilies,
  getAssistances,
  getByFamilyAssistance,
};
