import pool from "../util/database";

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

export { getAll, getById_BCI };
