import pool from "../util/database";
import { _selectById } from "../queries/partner";

const create: any = async (
  rut: string,
  name: string,
  legalrepresentative: string,
  line: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      legalrepresentative,
      line,
      address,
      district,
      email,
      phone,
    ];

    const resultPartner = await pool.query(
      "SELECT 1 FROM app.partner WHERE rut = $1",
      [rut]
    );

    let query: string;

    if (resultPartner.rows.length > 0) {
      query = `
        UPDATE  app.partner
        SET     name = $2,
                legalrepresentative = $3,
                line = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.partner(
                rut,
                name,
                legalrepresentative,
                line,
                address,
                district,
                email,
                phone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const { id } = result.rows[0];

    const data = {
      id,
      rut,
      name,
      legalrepresentative,
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

const getAll: any = async () => {
  try {
    const result = await pool.query("SELECT * FROM app.partner");

    const data =
      result.rows.length > 0
        ? result.rows.map((item: any) => {
            const {
              id,
              rut,
              name,
              legalrepresentative,
              line,
              address,
              district,
              email,
              phone,
            } = item;
            return {
              id,
              rut,
              name,
              legalrepresentative,
              line,
              address,
              district,
              email,
              phone,
            };
          })
        : [];

    return { success: true, data: data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_selectById(id));

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      legalrepresentative: result.rows[0].legalrepresentative,
      line: result.rows[0].line,
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
      specialties: result.rows[0].specialties,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamilies = async () => {
  try {
    const result = await pool.query(
      `SELECT  DISTINCT
              FAM.id,
              FAM.name,
              SPE.id,
              SPE.name
      FROM app.family FAM
      INNER JOIN app.specialty SPE ON SPE.family_id = FAM.id
      ORDER BY FAM.id`
    );

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, getById, getFamilies };
