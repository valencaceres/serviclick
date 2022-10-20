import pool from "../util/database";

const getByProductId: any = async (lead_id: string, product_id: string) => {
  try {
    const result = await pool.query(
      `
        select	pro.name,
                des.title,
                des.sub_title,
                des.description,
                des.territorial_scope,
                des.hiring_conditions,
                asi.id as assistance_id,
                asi.name as assistance_name,
                asi.description as assistance_description,
                pas.amount as assistance_amount,
                pas.maximum as assistance_maximum,
                pas.events as assistance_events,
                pas.lack as assistance_lack,
                pas.currency as assistance_currency
        from 	app.product pro
                inner join app.productdescription des on pro.id = des.product_id
                inner join app.productassistance pas on pro.id = pas.product_id
                inner join app.assistance asi on pas.assistance_id = asi.id
        where   pro.id = $1
        order 	by
                pro.name,
                pas.number`,
      [product_id]
    );

    type AssistanceT = {
      id: string;
      name: string;
      description: string;
      amount: number;
      maximum: string;
      events: number;
      lack: number;
      currency: string;
    };

    type DataT = {
      lead_id: string;
      id: string;
      name: string;
      title: string;
      subTitle: string;
      description: string;
      territorialScope: string;
      hiringConditions: string;
      assistances: AssistanceT[];
    };

    let data: DataT = {
      lead_id,
      id: product_id,
      name: result.rows[0].name,
      title: result.rows[0].title,
      subTitle: result.rows[0].sub_title,
      description: result.rows[0].description,
      territorialScope: result.rows[0].territorial_scope,
      hiringConditions: result.rows[0].hiring_conditions,
      assistances: [],
    };

    result.rows.map((row) => {
      data.assistances.push({
        id: row.assistance_id,
        name: row.assistance_name,
        description: row.assistance_description,
        amount: row.assistance_amount,
        maximum: row.assistance_maximum,
        events: row.assistance_events,
        lack: row.assistance_lack,
        currency: row.assistance_currency,
      });
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { getByProductId };
