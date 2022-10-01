import bcrypt from "bcrypt";

import pool from "../util/database";

const create: any = async (id: string, email: string) => {
  try {
    const resultUserInsuredExists = await pool.query(
      "SELECT id, insured_id, login FROM app.userinsured WHERE login = $1",
      [email]
    );

    if (resultUserInsuredExists.rows.length > 0) {
      return {
        success: true,
        data: resultUserInsuredExists.rows[0],
        error: null,
      };
    }

    const result = await pool.query(
      "INSERT INTO app.userinsured(insured_id, login) VALUES ($1, $2) RETURNING *",
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

    await pool.query("UPDATE app.userinsured SET hash = $2 WHERE id = $1", [
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
        INS.id,
        INS.rut,
        INS.name,
        INS.paternallastname,
        INS.maternallastname,
        INS.birthdate,
        INS.address,
        INS.district,
        INS.email,
        INS.phone,
        USR.hash,
        LEA.id as lead_id,
        LEA.customer_id,
        LEA.company_id,
        LEA.subscription_id,
        FAM.icon as family_icon,
        FAM.name as family_name,
        PRO.id as product_id,
        PRO.name as product_name,
        PRO.beneficiaries as product_beneficiaries,
        LPR.price as product_price,
        LPR.frequency_code as product_frequency_code,
        BEN.id as beneficiary_id,
        BEN.rut as beneficiary_rut,
        BEN.name as beneficiary_name,
        BEN.paternallastname as beneficiary_paternallastname,
        BEN.maternallastname as beneficiary_maternallastname,
        BEN.birthdate as beneficiary_birthdate,
        BEN.address as beneficiary_address,
        BEN.district as beneficiary_district,
        BEN.email as beneficiary_email,
        BEN.phone as beneficiary_phone
      from
        app.userinsured USR
        inner join app.insured INS on USR.insured_id = INS.id
        inner join app.leadInsured LIN on INS.id = LIN.insured_id
        inner join app.lead LEA on LIN.lead_id = LEA.id
        inner join app.subscription SUS on LEA.subscription_id = SUS.subscription_id
        inner join app.leadProduct LPR on LEA.id = LPR.lead_id
        inner join app.product PRO on LPR.product_id = PRO.id
        inner join app.family FAM on PRO.family_id = FAM.id
        left outer join app.leadBeneficiary LBE on LEA.id = LBE.lead_id and INS.id = LBE.insured_id
        left outer join app.beneficiary BEN on LBE.beneficiary_id = BEN.id
      where 
        USR.login = $1
        and SUS.event = 'subscription_activated'
      order by
        PRO.id,
        LEA.id`,
      [email]
    );

    return {
      success: true,
      data: await formatDataInsured(result.rows),
      error: null,
    };
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

const formatDataInsured = async (data: any) => {
  const {
    id,
    rut,
    name,
    paternallastname,
    maternallastname,
    birthdate,
    address,
    district,
    email,
    phone,
    hash,
  } = data[0];

  type BeneficiaryT = {
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
    id: string;
    family_icon: string;
    family_name: string;
    name: string;
    price: number;
    frequency_code: string;
    numberBeneficiaries: number;
    beneficiaries: BeneficiaryT[];
  };

  type LeadT = {
    lead_id: string;
    customer_id: string;
    company_id: string;
    subscription_id: string;
    products: ProductT[];
  };

  type UserInsuredT = {
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
    hash: string;
    leads: LeadT[];
  };

  const userInsured: UserInsuredT = {
    id,
    rut,
    name,
    paternalLastName: paternallastname,
    maternalLastName: maternallastname,
    birthDate: birthdate,
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
    customer_id: "",
    company_id: "",
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
    beneficiaries: [],
  };

  data.map((row: any) => {
    const {
      lead_id,
      customer_id,
      company_id,
      subscription_id,
      family_icon,
      family_name,
      product_id,
      product_name,
      product_price,
      product_frequency_code,
      product_beneficiaries,
      beneficiary_id,
      beneficiary_rut,
      beneficiary_name,
      beneficiary_paternallastname,
      beneficiary_maternallastname,
      beneficiary_birthdate,
      beneficiary_address,
      beneficiary_district,
      beneficiary_email,
      beneficiary_phone,
    } = row;

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
        beneficiaries: [],
      };
    }

    if (lead_id !== previousLeadId) {
      if (previousLeadId !== "") {
        userInsured.leads.push(newLead);
      }
      newLead = {
        lead_id,
        customer_id,
        company_id,
        subscription_id,
        products: [],
      };
    }

    if (beneficiary_id) {
      newProduct.beneficiaries.push({
        id: beneficiary_id,
        rut: beneficiary_rut,
        name: beneficiary_name,
        paternalLastName: beneficiary_paternallastname,
        maternalLastName: beneficiary_maternallastname,
        birthDate: beneficiary_birthdate,
        address: beneficiary_address,
        district: beneficiary_district,
        email: beneficiary_email,
        phone: beneficiary_phone,
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
