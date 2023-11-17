import pool from "../util/database";

const getAll = async (
  isImed: boolean,
  applicant_rut: string,
  applicant_name: string,
  page: number,
  records: number
) => {
  try {
    let totalQuery = `
      SELECT COUNT(*) AS total
      FROM app.casereimbursment reim
      JOIN app.case cas ON cas.id = reim.case_id
      JOIN app.insured ins ON ins.id = cas.insured_id
      LEFT JOIN app.beneficiary ben ON ben.id = cas.beneficiary_id
      WHERE 1=1
    `;

    if (isImed) {
      totalQuery += `
        AND (reim.register_imedamount IS DISTINCT FROM 0 AND reim.register_imedamount IS NOT NULL) OR
        ben.name ILIKE $1 OR
        ben.rut ILIKE $2 OR
        ins.name ILIKE $3 OR
        ins.rut ILIKE $4
      `;
    } else {
      totalQuery += `
        AND (reim.register_amount IS DISTINCT FROM 0 AND reim.register_amount IS NOT NULL) OR
        ben.name ILIKE $1 OR
        ben.rut ILIKE $2 OR
        ins.name ILIKE $3 OR
        ins.rut ILIKE $4
      `;
    }

    const totalResult = await pool.query(totalQuery, [
      `%${applicant_name}%`,
      `%${applicant_rut}%`,
      `%${applicant_name}%`,
      `%${applicant_rut}%`,
    ]);

    const total = totalResult.rows[0]?.total || 0;

    const offset = (page - 1) * records;
    let paginatedQuery = `
      SELECT
        reim.*,
        cas.number AS case_number,
        ins.name AS insured_name,
        ins.rut AS insured_rut,
        ben.name AS beneficiary_name,
        ben.rut AS beneficiary_rut
      FROM app.casereimbursment reim
      JOIN app.case cas ON cas.id = reim.case_id
      JOIN app.insured ins ON ins.id = cas.insured_id
      LEFT JOIN app.beneficiary ben ON ben.id = cas.beneficiary_id
      WHERE 1=1
    `;

    if (isImed) {
      paginatedQuery += `
        AND (reim.register_imedamount IS DISTINCT FROM 0 AND reim.register_imedamount IS NOT NULL) OR
        ben.name ILIKE $1 OR
        ben.rut ILIKE $2 OR
        ins.name ILIKE $3 OR
        ins.rut ILIKE $4
      `;
    } else {
      paginatedQuery += `
        AND (reim.register_amount IS DISTINCT FROM 0 AND reim.register_amount IS NOT NULL) OR
        ben.name ILIKE $1 OR
        ben.rut ILIKE $2 OR
        ins.name ILIKE $3 OR
        ins.rut ILIKE $4
      `;
    }

    paginatedQuery += `
      ORDER BY cas.number ASC
      OFFSET $5
      LIMIT $6`;

    const result = await pool.query(paginatedQuery, [
      `%${applicant_name}%`,
      `%${applicant_rut}%`,
      `%${applicant_name}%`,
      `%${applicant_rut}%`,
      offset,
      records,
    ]);

    return {
      success: true,
      data: result.rows,
      total: total,
      totalPages: Math.ceil(total / records),
      currentPage: page,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const update = async (
  id: string,
  status: string,
  user_id: string,
  imed_amount: number | null,
  amount: number | null,
  comment: string | null
) => {
  try {
    const query = `
      UPDATE app.casereimbursment
      SET
        status = $2,
        user_id = $3,
        imed_amount = $4,
        amount = $5,
        comment = $6
      WHERE
        id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [
      id,
      status,
      user_id,
      imed_amount,
      amount,
      comment,
    ]);

    return {
      success: true,
      data: result.rows,
      error: null,
    };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getAll, update };
