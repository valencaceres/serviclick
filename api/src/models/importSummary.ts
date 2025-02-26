import pool from "../util/database";

const create = async (
  company_id: string,
  year: number,
  month: number,
  rows: number
) => {
  try {
    const result = await pool.query(
      `INSERT INTO integration.import_summary (company_id, year, month, rows) VALUES ($1, $2, $3, $4) RETURNING *`,
      [company_id, year, month, rows]
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

const getAll = async () => {
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

export { create, getAll };
