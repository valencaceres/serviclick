import pool from "../util/database";

const create: any = async (
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

const getById: any = async (id: string) => {
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

const getByRut: any = async (rut: string) => {
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
    } = result.rows[0] || {
      id: "",
      companyname: "",
      legalrepresentative: "",
      line: "",
      address: "",
      district: "",
      email: "",
      phone: "",
    };

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

const getProductsAndInsuredById: any = async (id: string) => {
  try {
    const result = await pool.query(`
      select
        DISTINCT
        FAM.icon as family_icon,
        FAM.name as family_name,
        PRO.id as product_id,
        PRO.name as product_name,
        PRO.beneficiaries as product_beneficiaries,
        LPR.price as product_price,
        LPR.frequency_code as product_frequency_code,
        INS.id as insured_id,
        INS.rut as insured_rut,
        INS.name as insured_name,
        INS.paternallastname as insured_paternallastname,
        INS.maternallastname as insured_maternallastname,
        to_char(INS.birthdate, 'YYYY-MM-DD') as insured_birthdate,
        INS.address as insured_address,
        INS.district as insured_district,
        INS.email as insured_email,
        INS.phone as insured_phone
      from
        app.company COM
        inner join app.lead LEA on COM.id = LEA.company_id
        inner join app.subscription SUS on LEA.subscription_id = SUS.subscription_id
        inner join app.leadProduct LPR on LEA.id = LPR.lead_id
        inner join app.product PRO on LPR.product_id = PRO.id
        inner join app.family FAM on PRO.family_id = FAM.id
        inner join app.leadInsured LIN on LEA.id = LIN.lead_id
        inner join app.insured INS on LIN.insured_id = INS.id
      where 
        COM.id = '${id}'
      order by
        FAM.name,
        PRO.name,
        INS.name,
        INS.paternallastname,
        INS.maternallastname`);

    type InsuredT = {
      id: string;
      rut: string;
      name: string;
      paternalLastName: string;
      maternalLastName: string;
      birthDate: string;
      address: string;
      district: string;
      email: string;
      phone: string;
    };

    type ProductT = {
      family_icon: string;
      family_name: string;
      id: string;
      name: string;
      beneficiaries: string;
      price: string;
      frecuency_code: string;
      insured: InsuredT[];
    };

    let product: ProductT = {
      family_icon: "",
      family_name: "",
      id: "",
      name: "",
      beneficiaries: "",
      price: "",
      frecuency_code: "",
      insured: [],
    };
    let previousProduct_id: string = "";

    const data: ProductT[] = [];

    result.rows.map((row: any) => {
      const {
        family_icon,
        family_name,
        product_id,
        product_name,
        product_beneficiaries,
        product_price,
        product_frequency_code,
        insured_id,
        insured_rut,
        insured_name,
        insured_paternallastname,
        insured_maternallastname,
        insured_birthdate,
        insured_address,
        insured_district,
        insured_email,
        insured_phone,
      } = row;

      if (product_id !== previousProduct_id) {
        if (previousProduct_id !== "") {
          data.push(product);
        }
        product = {
          family_icon: family_icon,
          family_name: family_name,
          id: product_id,
          name: product_name,
          beneficiaries: product_beneficiaries,
          price: product_price,
          frecuency_code: product_frequency_code,
          insured: [],
        };
      }

      product.insured.push({
        id: insured_id,
        rut: insured_rut,
        name: insured_name,
        paternalLastName: insured_paternallastname,
        maternalLastName: insured_maternallastname,
        birthDate: insured_birthdate,
        address: insured_address,
        district: insured_district,
        email: insured_email,
        phone: insured_phone,
      });

      previousProduct_id = product_id;
    });
    data.push(product);

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM app.company ORDER BY companyname`
    );

    const data = result.rows.map((row: any) => {
      const {
        id,
        rut,
        companyname,
        legalrepresentative,
        line,
        address,
        district,
        email,
        phone,
      } = row;

      return {
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
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getLeadsByRut: any = async (rut: string) => {
  try {
    const result = await pool.query(
      `
      select 	com.id,
              com.rut,
              com.companyname,
              com.legalRepresentative,
              com.line,
              com.address,
              com.district,
              com.email,
              com.phone,
              lea.id as lead_id,
              lea.subscription_id,
              pro.id as product_id,
              pro.name as product_name
        from 	app.company com
                inner join app.lead lea on com.id = lea.company_id and not lea.policy_id is null
                inner join app.leadproduct lpr on lea.id = lpr.lead_id
                inner join app.product pro on lpr.product_id = pro.id
        where com.rut = $1`,
      [rut]
    );

    const {
      id,
      companyname,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
    } = result.rows[0];

    interface ILead {
      lead_id: string;
      subscription_id: string;
      product_id: string;
      product_name: string;
    }

    interface IData {
      id: string;
      companyname: string;
      legalRepresentative: string;
      line: string;
      address: string;
      district: string;
      email: string;
      phone: string;
      leads: ILead[];
    }

    const data = <IData>{
      id,
      companyname,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
      leads: [],
    };

    result.rows.map((row: any) => {
      const { lead_id, subscription_id, product_id, product_name } = row;

      data.leads.push({
        lead_id,
        subscription_id,
        product_id,
        product_name,
      });
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  create,
  getAll,
  getById,
  getByRut,
  getProductsAndInsuredById,
  getLeadsByRut,
};
