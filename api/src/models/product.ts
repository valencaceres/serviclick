import { isConstructorDeclaration } from "typescript";
import pool from "../util/database";

const createProduct: any = async (
  family_id: string,
  name: string,
  cost: number,
  customerprice: number,
  companyprice: number,
  issubject: boolean,
  frequency: string,
  term: string,
  beneficiaries: number,
  currency: string
) => {
  try {
    const result = await pool.query(
      `
        INSERT  INTO app.product(
                  family_id,
                  name,
                  cost,
                  customerprice,
                  companyprice,
                  issubject,
                  frequency,
                  term,
                  beneficiaries,
                  currency) 
        VALUES (  $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
        RETURNING *`,
      [
        family_id,
        name,
        cost,
        customerprice,
        companyprice,
        issubject,
        frequency,
        term,
        beneficiaries,
        currency,
      ]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateProduct: any = async (
  id: string,
  family_id: string,
  name: string,
  cost: number,
  customerprice: number,
  companyprice: number,
  isSubject: boolean,
  frequency: string,
  term: string,
  beneficiaries: number,
  currency: string
) => {
  try {
    const result = await pool.query(
      `
        UPDATE    app.product 
        SET       family_id = $1, 
                  name = $2,
                  cost = $3,
                  customerprice = $4,
                  companyprice = $5,
                  issubject = $6,
                  frequency = $7,
                  term = $8,
                  beneficiaries = $9,
                  currency = $10
        WHERE     id = $11
        RETURNING *`,
      [
        family_id,
        name,
        cost,
        customerprice,
        companyprice,
        isSubject,
        frequency,
        term,
        beneficiaries,
        currency,
        id,
      ]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteProduct: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.product SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deletePlans: any = async (id: string) => {
  try {
    const result = await pool.query(
      "DELETE FROM app.productplan WHERE product_id = $1",
      [id]
    );
    return { success: true, data: "Plans deleted", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProduct: any = async (id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT    pro.id,
                pro.family_id, 
                fam.name as family_name,
                pro.name, 
                pro.cost, 
                pro.customerprice, 
                pro.companyprice, 
                pro.issubject, 
                pro.frequency, 
                pro.term,
                pro.beneficiaries,
                pro.currency
        FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
        WHERE   pro.id = $1`,
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const listProducts: any = async (values: any) => {
  try {
    const result = await pool.query(`
        SELECT  pro.id,
                pro.family_id, 
                fam.name as family_name,
                pro.name, 
                pro.cost, 
                pro.customerprice, 
                pro.companyprice, 
                pro.issubject, 
                pro.frequency, 
                pro.term,
                pro.beneficiaries,
                pro.currency
        FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
        WHERE   pro.isActive IS true 
        ORDER   BY 
                pro.name`);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getProductByFamilyId: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  pro.id,
                pro.family_id, 
                fam.name as family_name,
                pro.name, 
                pro.cost, 
                pro.customerprice, 
                pro.companyprice, 
                pro.issubject, 
                pro.frequency, 
                pro.term,
                pro.beneficiaries,
                pro.currency
        FROM    app.product pro inner join app.family fam on pro.family_id = fam.id
        WHERE   pro.isActive IS true AND
                pro.family_id = $1
        ORDER   BY 
                pro.name`,
      [family_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  deletePlans,
  getProduct,
  listProducts,
  getProductByFamilyId,
};
