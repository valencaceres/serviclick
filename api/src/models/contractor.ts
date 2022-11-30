import pool from "../util/database";

import { _selectAll, _selectById, _selectByRut } from "../queries/contractor";

const create: any = async (
  type: string,
  id: string,
  rut: string,
  name: string,
  companyName: string,
  legalRepresentative: string,
  line: string,
  paternalLastName: string,
  maternalLastName: string,
  birthDate: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      type,
      id,
      rut,
      name,
      companyName,
      legalRepresentative,
      line,
      paternalLastName,
      maternalLastName,
      birthDate,
      address,
      district,
      email,
      phone,
    ];

    const resultCustomer = await pool.query(
      type === "P"
        ? "SELECT 1 FROM app.customer WHERE rut = $1"
        : "SELECT 1 FROM app.company WHERE rut = $1",
      [rut]
    );

    let query: string;
    if (resultCustomer.rows.length > 0) {
      query =
        type === "P"
          ? `
            UPDATE  app.customer
            SET     name = $4,
                    paternallastname = $8,
                    maternallastname = $9,
                    birthdate = $10,
                    address = $11,
                    district = $12,
                    email = $13,
                    phone = $14
            WHERE   rut = $3 RETURNING *`
          : `
            UPDATE  app.company
            SET     companyname = $5
                    legalrepresentative = $6,
                    line = $7,
                    address = $11,
                    district = $12,
                    email = $13,
                    phone = $14
            WHERE   rut = $3 RETURNING *`;
    } else {
      query =
        type === "P"
          ? `
            INSERT  INTO app.customer(
                    rut,
                    name,
                    paternallastname,
                    maternallastname,
                    birthdate,
                    address,
                    district,
                    email,
                    phone) 
            VALUES( $3, $4, $8, $9, $10, $11, $12, $13, $14) RETURNING *`
          : `
            INSERT  INTO app.company(
                    rut,
                    companyname,
                    legalrepresentative,
                    line,
                    address,
                    district,
                    email,
                    phone) 
            VALUES( $3, $5, $6, $7, $11, $12, $13, $14) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name || result.rows[0].companyname || "",
      legalrepresentative: result.rows[0].legalrepresentative || "",
      paternalLastName: result.rows[0].paternalLastName || "",
      maternalLastName: result.rows[0].maternalLastName || "",
      line: result.rows[0].line || "",
      birthDate: result.rows[0].birthDate || "",
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
    };

    // const data = {
    //   type,
    //   id: "123",
    //   rut: "11.222.333-4",
    //   name: "Carlos",
    //   companyName: "Prodalam S.A.",
    //   legalRepresentative: "Alfredo Castro Jimenez",
    //   line: "Alambres",
    //   paternalLastName: "Paredes",
    //   maternalLastName: "Bonilla",
    //   birthDate: "1982-02-08",
    //   address: "Alameda 723, depto 702",
    //   district: "Santiago",
    //   email: "cma.ing@gmail.com+carlos",
    //   phone: "+568 1112 2223",
    //   quantity: 12,
    // };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async (
  contractorType: string,
  active: boolean,
  nameLike: string
) => {
  try {
    const _where =
      contractorType !== "" || active || nameLike !== ""
        ? ` ${
            contractorType && contractorType !== ""
              ? `and type = '${contractorType}'`
              : ""
          } ${active ? `and active_product > 0` : ""} ${
            nameLike && nameLike !== ""
              ? `and lower(name) like '%${nameLike.toLowerCase()}%'`
              : ""
          }`
        : ``;

    const result = await pool.query(_selectAll(_where));

    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById: any = async (id: string) => {
  try {
    const result = await pool.query(_selectById(id));

    const data = {
      id: result.rows[0].id,
      type: result.rows[0].type,
      rut: result.rows[0].rut,
      companyName: result.rows[0].companyname,
      name: result.rows[0].name,
      paternalLastName: result.rows[0].paternallastname,
      maternalLastName: result.rows[0].maternallastname,
      legalRepresentative: result.rows[0].legalrepresentative,
      line: result.rows[0].line,
      birthDate: result.rows[0].birthdate,
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRut: any = async (rut: string, type: string) => {
  try {
    const result = await pool.query(_selectByRut(rut, type));

    const data =
      result.rows.length > 0
        ? {
            id: result.rows[0].id,
            type,
            rut: result.rows[0].rut,
            companyName: result.rows[0].companyname,
            name: result.rows[0].name,
            paternalLastName: result.rows[0].paternallastname,
            maternalLastName: result.rows[0].maternallastname,
            legalRepresentative: result.rows[0].legalrepresentative,
            line: result.rows[0].line,
            birthDate: result.rows[0].birthdate,
            address: result.rows[0].address,
            district: result.rows[0].district,
            email: result.rows[0].email,
            phone: result.rows[0].phone,
          }
        : {
            id: "",
            type,
            rut,
            companyName: "",
            name: "",
            paternalLastName: "",
            maternalLastName: "",
            legalRepresentative: "",
            line: "",
            birthDate: "",
            address: "",
            district: "",
            email: "",
            phone: "",
          };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getAll, getById, getByRut };
