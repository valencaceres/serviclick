import pool from "../util/database";

const getByAssistanceId: any = async (assistance_id: string) => {
  try {
    const result = await pool.query(
      `
      select	'benefit' as type,
                ben.description
      from 	    app.product pro
                  inner join app.productassistance pas on pro.id = pas.product_id
                  inner join app.assistancebenefit ben on pas.assistance_id = ben.assistance_id
      where	    pas.assistance_id = $1
      union     all
      select	'exclusion' as type,
                exc.description
      from 	    app.product pro
                  inner join app.productassistance pas on pro.id = pas.product_id
                  inner join app.assistanceexclusion exc on pas.assistance_id = exc.assistance_id
      where	    pas.assistance_id = $1`,
      [assistance_id]
    );

    type RowT = {
      type: string;
      description: string;
    };

    type DataT = {
      benefits: string[];
      exclusions: string[];
    };

    const data: DataT = {
      benefits: [],
      exclusions: [],
    };

    result.rows.map((row: RowT) => {
      if (row.type === "benefit") {
        data.benefits.push(row.description);
      } else {
        data.exclusions.push(row.description);
      }
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getAll: any = async () => {
  try {
    const result = await pool.query(
      `
      select	  DISTINCT
                pas.assistance_id,
                'benefit' as type,
                ben.description
      from 	    app.productassistance pas
                  inner join app.assistancebenefit ben on pas.assistance_id = ben.assistance_id
      union     all
      select	  DISTINCT
                pas.assistance_id,
                'exclusion' as type,
                exc.description
      from 	    app.productassistance pas
                  inner join app.assistanceexclusion exc on pas.assistance_id = exc.assistance_id`
    );

    type RowT = {
      assistance_id: string;
      type: string;
      description: string;
    };

    type RowDataT = {
      assistance_id: string;
      description: string;
    };

    type DataT = {
      benefits: RowDataT[];
      exclusions: RowDataT[];
    };

    const data: DataT = {
      benefits: [],
      exclusions: [],
    };

    result.rows.map((row: RowT) => {
      if (row.type === "benefit") {
        data.benefits.push({
          assistance_id: row.assistance_id,
          description: row.description,
        });
      } else {
        data.exclusions.push({
          assistance_id: row.assistance_id,
          description: row.description,
        });
      }
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByAssistanceId, getAll };
