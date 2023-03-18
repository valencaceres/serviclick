import pool from "../util/database";

const uploadFile_BCI = async (
  company_id: string,
  year: number,
  month: number,
  file: any
) => {
  try {
    const summaryResult = await pool.query(
      `INSERT INTO integration.import_summary (company_id, year, month, file) VALUES ($1, $2, $3, $4) RETURNING id`,
      [company_id, year, month, 1]
    );

    const bciResult = await pool.query(
      `INSERT INTO integration.import_bci (import_summary_id, convenio, rut, dv, asegurado, sucursal, tipo_dcto, n_documento, direccion, comuna, telefono, fvigia_vig, fvigim_vig, fvigid_vig, fvigfa_vig, fvigfm_vig, fvigfd_vig, npolre_doc, ramo, cobertura) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`,
      [
        summaryResult.rows[0].id,
        file.CONVENIO,
        file.RUT,
        file.DV,
        file.ASEGURADO,
        file.SUCURSAL,
        file.TIPO_DCTO,
        file.N_DOCUMENTO,
        file.DIRECCION,
        file.COMUNA,
        file.TELEFONO,
        file.FVIGIA_VIG,
        file.FVIGIM_VIG,
        file.FVIGID_VIG,
        file.FVIGFA_VIG,
        file.FVIGFM_VIG,
        file.FVIGFD_VIG,
        file.NPOLRE_DOC,
        file.RAMO,
        file.COBERTURA,
      ]
    );

    console.log(bciResult);
    return {
      success: true,
      data: "Row inserted to database successfully",
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(`
    SELECT  integration.import_summary.*, 
            app.company.companyname
    FROM    integration.import_summary
    INNER JOIN app.company ON integration.import_summary.company_id = app.company.id
    ORDER BY  integration.import_summary.year DESC, 
              integration.import_summary.month DESC, 
              app.company.companyname ASC`);

    const data = result.rows.map((row: any) => {
      const date = new Date(Date.UTC(row.year, row.month - 1, 1));
      const monthName = new Intl.DateTimeFormat("es-CL", {
        month: "long",
      }).format(date);
      return {
        id: row.id,
        company_id: row.company_id,
        companyname: row.companyname,
        year: row.year,
        month: monthName,
        rows: row.rows,
        createddate: row.createddate.toLocaleString("es-CL", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getById_BCI = async (id: string) => {
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

export { uploadFile_BCI, getAll, getById_BCI };
