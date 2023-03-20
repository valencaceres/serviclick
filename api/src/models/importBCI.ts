import pool from "../util/database";

const create = async (import_summary_id: string, row: any) => {
  try {
    const result = await pool.query(
      `INSERT INTO integration.import_bci (
        import_summary_id,
        convenio,
        rut,
        dv,
        asegurado,
        sucursal,
        tipo_dcto,
        n_documento,
        direccion,
        comuna,
        telefono,
        fvigia_vig,
        fvigim_vig,
        fvigid_vig,
        fvigfa_vig,
        fvigfm_vig,
        fvigfd_vig,
        ramo,
        cobertura)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *`,
      [
        import_summary_id,
        row[0],
        row[1],
        row[2],
        row[3],
        row[4],
        row[5],
        row[6],
        row[7],
        row[8],
        row[9],
        row[10],
        row[11],
        row[12],
        row[13],
        row[14],
        row[15],
        row[16],
        row[17],
      ]
    );

    return {
      success: true,
      data: result.rows[0],
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById = async (id: string) => {
  try {
    const result = await pool.query(
      `SELECT * FROM integration.import_bci WHERE import_summary_id = $1`,
      [id]
    );

    const data = result.rows.map((row: any) => {
      return {
        id: row.id,
        import_summary_id: row.import_summary_id,
        convenio: row.convenio,
        rut: row.rut,
        dv: row.dv,
        asegurado: row.asegurado,
        sucursal: row.sucursal,
        tipo_dcto: row.tipo_dcto,
        n_documento: row.n_documento,
        direccion: row.direccion.toUpperCase(),
        comuna: row.comuna,
        telefono: row.telefono,
        fvigia_vigencia: row.fvigia_vig,
        fvigim_vigencia: row.fvigim_vig,
        fvigid_vigencia: row.fvigid_vig,
        fvigfa_vigencia: row.fvigfa_vig,
        fvigfm_vigencia: row.fvigfm_vig,
        fvigfd_vigencia: row.fvigfd_vig,
        npolre_doc: row.npolre_doc,
        ramo: row.ramo,
        cobertura: row.cobertura,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, getById };
