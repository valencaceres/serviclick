import pool from "../util/database";

const createModel: any = async (
  rut: string,
  companyName: string,
  legalRepresentative: string,
  line: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      companyName,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
    ];

    const resultCustomer = await pool.query(
      "SELECT 1 FROM app.company WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultCustomer.rows.length > 0) {
      query = `
        UPDATE  app.company
        SET     companyname = $2,
                legalrepresentative = $3,
                line = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8 
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.company(
                rut,
                companyname,
                legalrepresentative,
                line,
                address,
                district,
                email,
                phone) 
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    }
    const result = await pool.query(query, arrayValues);

    const { id } = result.rows[0];

    const data = {
      id,
      rut,
      companyName,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data: data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByIdModel: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  id,
              rut,
              companyname,
              legalrepresentative,
              line,
              address,
              district,
              email,
              phone
      FROM    app.company
      WHERE   id = $1`,
      [id]
    );

    const {
      rut,
      companyname,
      legalrepresentative,
      line,
      address,
      district,
      email,
      phone,
    } = result.rows[0];

    const data = {
      id,
      rut,
      companyName: companyname,
      legalRepresentative: legalrepresentative,
      line,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRutModel: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  id,
              rut,
              companyname,
              legalrepresentative,
              line,
              address,
              district,
              email,
              phone
      FROM    app.insured
      WHERE   rut = $1`,
      [rut]
    );

    const {
      id,
      companyname,
      legalrepresentative,
      line,
      address,
      district,
      email,
      phone,
    } = result.rows[0];

    const data = {
      id,
      rut,
      companyName: companyname,
      legalRepresentative: legalrepresentative,
      line,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { createModel, getByIdModel, getByRutModel };
