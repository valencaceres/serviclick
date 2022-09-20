import bcrypt from "bcrypt";

import pool from "../util/database";

const create: any = async (id: string, email: string) => {
  try {
    const resultUserCompanyExists = await pool.query(
      "SELECT id, company_id, login FROM app.usercompany WHERE login = $1",
      [email]
    );

    if (resultUserCompanyExists.rows.length > 0) {
      return {
        success: true,
        data: resultUserCompanyExists.rows[0],
        error: null,
      };
    }

    const result = await pool.query(
      "INSERT INTO app.usercompany(company_id, login) VALUES ($1, $2) RETURNING *",
      [id, email]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const assignPassword: any = async (id: string, password: string) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    await pool.query("UPDATE app.usercompany SET hash = $2 WHERE id = $1", [
      id,
      hash,
    ]);

    return { success: true, data: "Password updated", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByEmail: any = async (email: string) => {
  try {
    const result = await pool.query(
      `select
        COM.id,
        COM.rut,
        COM.companyname,
        COM.legalrepresentative,
        COM.line,
        COM.address,
        COM.district,
        COM.email,
        COM.phone,
        USR.hash,
        LEA.id as lead_id,
        LEA.subscription_id,
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
        INS.address as insured_address,
        INS.district as insured_district,
        INS.email as insured_email,
        INS.phone as insured_phone
      from
        app.usercompany USR
        inner join app.company COM on USR.company_id = COM.id
        inner join app.lead LEA on COM.id = LEA.company_id
        inner join app.subscription SUS on LEA.subscription_id = SUS.subscription_id
        inner join app.leadProduct LPR on LEA.id = LPR.lead_id
        inner join app.product PRO on LPR.product_id = PRO.id
        inner join app.family FAM on PRO.family_id = FAM.id
        inner join app.leadInsured LIN on LEA.id = LIN.lead_id
        inner join app.insured INS on LIN.insured_id = INS.id
      where 
        USR.login = $1
        and SUS.event = 'subscription_activated'
      order by
        LEA.id,
        PRO.id,
        INS.name,
        INS.paternallastname,
        INS.maternallastname`,
      [email]
    );

    return {
      success: true,
      data: await formatDataCompany(result.rows),
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const formatDataCompany = async (data: any) => {
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
    hash,
  } = data[0];

  type InsuredT = {
    id: string;
    rut: string;
    name: string;
    paternalLastName: string;
    maternalLastName: string;
    address: string;
    district: string;
    email: string;
    phone: string;
  };

  type ProductT = {
    id: string;
    family_icon: string;
    family_name: string;
    name: string;
    price: number;
    frequency_code: string;
    numberBeneficiaries: number;
    insured: InsuredT[];
  };

  type LeadT = {
    lead_id: string;
    subscription_id: string;
    products: ProductT[];
  };

  type UserCompanyT = {
    id: string;
    rut: string;
    companyName: string;
    legalRepresentative: string;
    line: string;
    address: string;
    district: string;
    email: string;
    phone: string;
    hash: string;
    leads: LeadT[];
  };

  const userInsured: UserCompanyT = {
    id,
    rut,
    companyName: companyname,
    legalRepresentative: legalrepresentative,
    line,
    address,
    district,
    email,
    phone,
    hash,
    leads: [],
  };

  let previousLeadId = "";
  let previousProductId = "";

  let newLead: LeadT = {
    lead_id: "",
    subscription_id: "",
    products: [],
  };

  let newProduct: ProductT = {
    id: "",
    family_icon: "",
    family_name: "",
    name: "",
    price: 0,
    frequency_code: "",
    numberBeneficiaries: 0,
    insured: [],
  };

  data.map((row: any) => {
    const {
      lead_id,
      subscription_id,
      family_icon,
      family_name,
      product_id,
      product_name,
      product_price,
      product_frequency_code,
      product_beneficiaries,
      insured_id,
      insured_rut,
      insured_name,
      insured_paternallastname,
      insured_maternallastname,
      insured_address,
      insured_district,
      insured_email,
      insured_phone,
    } = row;

    if (lead_id !== previousLeadId) {
      if (previousLeadId !== "") {
        newLead.products.push(newProduct);
        userInsured.leads.push(newLead);
      }
      newLead = {
        lead_id,
        subscription_id,
        products: [],
      };
      previousProductId = "";
    }

    if (product_id !== previousProductId) {
      if (previousProductId !== "") {
        newLead.products.push(newProduct);
      }
      newProduct = {
        id: product_id,
        family_icon,
        family_name,
        name: product_name,
        price: product_price,
        frequency_code: product_frequency_code,
        numberBeneficiaries: product_beneficiaries,
        insured: [],
      };
    }

    if (insured_id) {
      newProduct.insured.push({
        id: insured_id,
        rut: insured_rut,
        name: insured_name,
        paternalLastName: insured_paternallastname,
        maternalLastName: insured_maternallastname,
        address: insured_address,
        district: insured_district,
        email: insured_email,
        phone: insured_phone,
      });
    }

    previousLeadId = lead_id;
    previousProductId = product_id;
  });
  newLead.products.push(newProduct);
  userInsured.leads.push(newLead);

  return userInsured;
};

export { create, assignPassword, getByEmail };
