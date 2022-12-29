import pool from "../util/database";

const createDocument: any = async (family_id: string, name: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO app.document(name, family_id) VALUES ($1, $2) RETURNING *",
      [name, family_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const updateDocument: any = async (
  id: string,
  family_id: string,
  name: string
) => {
  try {
    const result = await pool.query(
      "UPDATE app.document SET name = $1, family_id = $2 WHERE id = $3 RETURNING *",
      [name, family_id, id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteDocument: any = async (id: string) => {
  try {
    const result = await pool.query(
      "UPDATE app.document SET isActive = false WHERE id = $1 RETURNING *",
      [id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getDocument: any = async (document_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  spe.id,
                spe.name,
                fam.id as family_id,
                fam.name as family_name
        FROM    app.document spe 
                    inner join app.family fam on spe.family_id = fam.id
        WHERE   spe.id = $1`,
      [document_id]
    );
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAllDocuments: any = async () => {
  try {
    const result = await pool.query(`
    SELECT  spe.id,
            spe.name,
            fam.id as family_id,
            fam.name as family_name
    FROM    app.document spe 
                inner join app.family fam on spe.family_id = fam.id
    WHERE   spe.isactive is true
    ORDER   BY
            fam.name,
            spe.name`);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getDocumentsByFamilyId: any = async (family_id: string) => {
  try {
    const result = await pool.query(
      `
      SELECT  spe.id,
              spe.name,
              fam.id as family_id,
              fam.name as family_name
      FROM    app.document spe 
                  inner join app.family fam on spe.family_id = fam.id
      WHERE   spe.isactive is true AND
              spe.family_id = $1
      ORDER   BY
              fam.name,
              spe.name`,
      [family_id]
    );
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getFamilies: any = async (values: any) => {
  try {
    const result = await pool.query(`
      SELECT  distinct
              fam.id as family_id,
              fam.name as family_name
      FROM    app.document spe 
                  inner join app.family fam on spe.family_id = fam.id
      WHERE   spe.isactive is true
      ORDER   BY
              fam.name`);
    return { success: true, data: result.rows, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export {
  createDocument,
  updateDocument,
  deleteDocument,
  getDocument,
  getAllDocuments,
  getDocumentsByFamilyId,
  getFamilies,
};
