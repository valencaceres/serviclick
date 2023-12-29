import pool from "../util/database";

import {
  _selectAll,
  _selectById,
  _selectByRut,
  _selectSubscriptions,
  _selectSubscription,
  _selectInsured,
  _selectPayment,
  _selectBeneficiaryId,
  _getCustomerById,
} from "../queries/contractor";

interface IBeneficiary {
  id: string;
  rut: string;
  birthdate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  relationship: string;
}

interface IInsured {
  id: string;
  rut: string;
  birthdate: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
  incorporation: string;
  beneficiaries: IBeneficiary[];
}

const create: any = async (
  type: string,
  id: string,
  rut: string,
  name: string,
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
        : "SELECT 1 FROM app.retail WHERE rut = $1",
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
            UPDATE  app.retail
            SET     name = $4, 
                    legalrepresentative = $5,
                    line = $6,
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
            INSERT  INTO app.retail(
                    rut,
                    name, 
                    legalrepresentative,
                    line,
                    address,
                    district,
                    email,
                    phone) 
            VALUES( $3, $4, $5, $6, $11, $12, $13, $14) RETURNING *`;
    }

    const result = await pool.query(query, arrayValues);

    const data = {
      id: result.rows[0].id,
      rut: result.rows[0].rut,
      name: result.rows[0].name || "",
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

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async (
  contractorType: string,
  rut: string,
  active: boolean,
  nameLike: string
) => {
  try {
    const _where =
      contractorType !== "" || active || nameLike !== "" || rut !== ""
        ? ` ${contractorType && contractorType !== ""
          ? `and type = '${contractorType}'`
          : ""
        } ${active ? `and active_product > 0` : `and active_product > 0`} ${nameLike && nameLike !== ""
          ? `and lower(name) like '%${nameLike.toLowerCase()}%'`
          : ""
        } ${rut && rut !== "" ? `and rut = '${rut}'` : ""}`
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

const getSubscriptionsById: any = async (id: string) => {
  try {
    const result = await pool.query(_selectSubscriptions, [id]);

    const data = result.rows.map((item: any) => {
      return {
        subscription_id: item.subscription_id,
        product_id: item.product_id,
        product_name: item.product_name,
        createDate: item.createdate,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getSubscriptionById: any = async (id: string) => {
  try {
    const result = await pool.query(_selectSubscription, [id]);
    const data = result.rows.length
      ? {
        subscription_id: result.rows[0].subscription_id,
        name: result.rows[0].product_name,
        frequency: result.rows[0].product_frequency,
        price: result.rows[0].product_price,
        currency_code: result.rows[0].product_currency_code,
        createDate: result.rows[0].policy_createdate,
        startDate: result.rows[0].policy_startdate,
        assistances: result.rows.map((item: any) => {
          return {
            name: item.assistance_name,
            amount: item.assistance_amount,
            currency: item.assistance_currency,
            maximum: item.assistance_maximum,
            events: item.assistance_events,
            lack: item.assistance_lack,
          };
        }),
      }
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

const getInsuredBySubscriptionId: any = async (id: string) => {
  try {
    const result = await pool.query(_selectInsured, [id]);

    let previous: any;
    let newInsured: IInsured;
    let dataResult: IInsured[] = [];

    result.rows.forEach((item: any, idx: number) => {
      if (item.insured_rut !== previous?.insured_rut) {
        if (newInsured) {
          dataResult.push(newInsured);
        }
        newInsured = {
          id: item.insured_id,
          rut: item.insured_rut,
          birthdate: item.insured_birthdate,
          name: item.insured_name,
          paternalLastName: item.insured_paternallastname,
          maternalLastName: item.insured_maternallastname,
          address: item.insured_address,
          district: item.insured_district,
          email: item.insured_email,
          phone: item.insured_phone,
          incorporation: item.insured_incorporation,
          beneficiaries: [],
        };
      }
      if (item.beneficiary_id !== "") {
        newInsured.beneficiaries.push({
          id: item.beneficiary_id,
          rut: item.beneficiary_rut,
          birthdate: item.beneficiary_birthdate,
          name: item.beneficiary_name,
          paternalLastName: item.beneficiary_paternallastname,
          maternalLastName: item.beneficiary_maternallastname,
          address: item.beneficiary_address,
          district: item.beneficiary_district,
          email: item.beneficiary_email,
          phone: item.beneficiary_phone,
          relationship: item.beneficiary_relationship,
        });
      }
      previous = item;
      if (idx === result.rows.length - 1) {
        dataResult.push(newInsured);
      }
    });

    const data = result.rows.length > 0 ? dataResult : [];

    return {
      success: true,
      data,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getPaymentById: any = async (id: string) => {
  try {
    const result = await pool.query(_selectPayment, [id]);

    const data = result.rows.map((item: any) => {
      return {
        subscription_id: item.subscription_id,
        product_id: item.product_id,
        product_name: item.product_name,
        createDate: item.createdate,
        frequency: item.frequency,
        price: item.price,
        insured: item.insured,
        collected_dues: item.collected_dues,
        collected_amount: item.collected_amount,
        paid_dues: item.paid_dues,
        paid_amount: item.paid_amount,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductsByContractor = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT 
      id,
      lead_id,
      subscription_id,
      name,
      created_at,
      family_id,
      assistance_id,
      assistance_name,
      assistance_amount,
      assistance_currency,
      assistance_events,
      assistance_lack,
      assistance_maximum
  FROM (
      SELECT DISTINCT
          pro.id,
          lea.id as lead_id,
          lea.subscription_id,
          pro.name,
          to_char(pol.createdate, 'YYYY-MM-DD') as created_at,
          asi.family_id,
          asi.id as assistance_id,
          asi.name as assistance_name,
          pas.amount as assistance_amount,
          pas.currency as assistance_currency,
          pas.events as assistance_events,
          pas.lack as assistance_lack,
          pas.maximum as assistance_maximum
      FROM app.lead lea
      INNER JOIN app.leadproduct lpr ON lea.id = lpr.lead_id
      INNER JOIN app.policy pol ON lea.policy_id = pol.id
      INNER JOIN app.product pro ON lpr.product_id = pro.id
      INNER JOIN app.productassistance pas ON pro.id = pas.product_id
      INNER JOIN app.assistance asi ON asi.id = pas.assistance_id
      INNER JOIN app.retailproduct rp ON rp.product_id = pro.id
      INNER JOIN app.retail retail ON retail.id = rp.retail_id
      INNER JOIN app.productplan p ON p.agent_id = retail.id 
      WHERE (lea.agent_id =  $1 OR lea.customer_id = $1 )
  ) AS subquery
  ORDER BY
      created_at,
      name;`,
      [id]
    );

    if (result.rows.length === 0) {
      return { success: true, data: [], error: null };
    }

    const data = result.rows.map((item: any) => ({
      id: item.id,
      lead_id: item.lead_id,
      subscription_id: item.subscription_id,
      name: item.name,
      created_at: item.created_at,
      start_date: item.start_date,
      end_date: item.end_date,
      family_id: item.family_id,
      assistances: result.rows
        .filter((row: any) => row.id === item.id)
        .map((row: any) => ({
          id: row.assistance_id,
          name: row.assistance_name,
          amount: row.assistance_amount,
          currency: row.assistance_currency,
          events: row.assistance_events,
          lack: row.assistance_lack,
          maximum: row.assistance_maximum,
        })),
    }));

    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: (error as Error).message };
  }
};

const getByBeneficiaryId: any = async (id: string) => {
  try {
    const result = await pool.query(_selectBeneficiaryId(id));

    const data = {
      id: result.rows[0].id,
      name: result.rows[0].name,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getCustomerById: any = async (id: string) => {
  try {
    const result = await pool.query(_getCustomerById, [id]);
    return { success: true, data: result.rows[0].customer_get_by_id, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};


export {
  create,
  getAll,
  getById,
  getByRut,
  getSubscriptionsById,
  getSubscriptionById,
  getInsuredBySubscriptionId,
  getPaymentById,
  getProductsByContractor,
  getByBeneficiaryId,
  getCustomerById,
};
