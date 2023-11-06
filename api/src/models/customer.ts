import pool from "../util/database";

const createModel: any = async (
  rut: string,
  name: string,
  paternalLastName: string,
  maternalLastName: string,
  address: string,
  district: string,
  email: string,
  phone: string
) => {
  try {
    const arrayValues = [
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    ];

    const resultCustomer = await pool.query(
      "SELECT 1 FROM app.customer WHERE rut = $1",
      [rut]
    );

    let query: string;
    let isCustomerNew: boolean = false;
    if (resultCustomer.rows.length > 0) {
      query = `
        UPDATE  app.customer
        SET     name = $2,
                paternallastname = $3,
                maternallastname = $4,
                address = $5,
                district = $6,
                email = $7,
                phone = $8
        WHERE   rut = $1 RETURNING *`;
    } else {
      query = `
        INSERT  INTO app.customer(
                rut,
                name,
                paternallastname,
                maternallastname,
                address,
                district,
                email,
                phone) 
        VALUES( $1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

      isCustomerNew = true;
    }
    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name,
      paternalLastName: result.rows[0].paternallastname,
      maternalLastName: result.rows[0].maternallastname,
      address: result.rows[0].address,
      district: result.rows[0].district,
      email: result.rows[0].email,
      phone: result.rows[0].phone,
    };
    if (isCustomerNew) {
      await pool.query(
        `
        INSERT INTO app.customeraccount (customer_id)
        VALUES ($1)
        RETURNING *
      `,
        [data.id]
      );
    }
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
              to_char(birthdate, 'YYYY-MM-DD') AS birthdate,
              name,
              paternallastname,
              maternallastname,
              address,
              district,
              email,
              phone
      FROM    app.customer
      WHERE   rut = $1`,
      [rut]
    );

    const {
      id,
      birthdate,
      name,
      paternallastname,
      maternallastname,
      address,
      district,
      email,
      phone,
    } = result.rows[0] || {
      id: "",
      birthdate: "",
      name: "",
      paternallastname: "",
      maternallastname: "",
      address: "",
      district: "",
      email: "",
      phone: "",
    };

    const data = {
      id,
      rut,
      birthDate: birthdate,
      name,
      paternalLastName: paternallastname,
      maternalLastName: maternallastname,
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

const getCustomerAccountByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `
      SELECT
      c.id AS customer_id,
      c.rut as customer_rut,
      ca.bank as bank,
      ca.accountnumber as account_number
    FROM
      app.customer c
    JOIN
      app.customeraccount ca ON c.id = ca.customer_id
    WHERE
      c.rut = $1;`,
      [rut]
    );

    const { customer_id, customer_rut, bank, account_number } = result
      .rows[0] || {
      customer_id: "",
      customer_rut: "",
      bank: "",
      account_number: "",
    };

    const data = {
      customer_id,
      customer_rut,
      bank,
      account_number,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateCustomerAccount = async (
  rut: string,
  bank: string,
  account_number: string
) => {
  try {
    const selectResult = await pool.query(
      `
      SELECT
        c.id AS customer_id,
        c.rut as customer_rut,
        ca.bank as bank,
        ca.accountnumber as account_number
      FROM
        app.customer c
      JOIN
        app.customeraccount ca ON c.id = ca.customer_id
      WHERE
        c.rut = $1;
      `,
      [rut]
    );
    if (selectResult.rows.length > 0) {
      const customer_id = selectResult.rows[0].customer_id;

      const updateResult = await pool.query(
        `
        UPDATE app.customeraccount
        SET
          bank = $2,
          accountnumber = $3
        WHERE
          customer_id = $1
        RETURNING *; 
        `,
        [customer_id, bank, account_number]
      );
      if (updateResult.rows.length > 0) {
        return { success: true, data: updateResult.rows[0], error: null };
      } else {
        return {
          success: false,
          data: null,
          error: "No records found for update",
        };
      }
    }
  } catch (e: any) {
    return { success: false, data: null, error: e.message };
  }
};

const getByRutOrName: any = async (
  rut: string,
  name: string,
  records: number,
  page: number
) => {
  try {
    const result = await pool.query(
      `select app.report_customer_get_all($1, $2, $3, $4)`,
      [rut, name, records, page]
    );

    return {
      success: true,
      data:
        result.rows.length > 0 ? result.rows[0].report_customer_get_all : [],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createModel,
  getByRutModel,
  getCustomerAccountByRut,
  updateCustomerAccount,
  getByRutOrName,
};
