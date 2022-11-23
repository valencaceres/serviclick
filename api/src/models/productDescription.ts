import pool from "../util/database";

import * as Assistance from "../models/assistance";

const create: any = async (
  product_id: string,
  title: string,
  subTitle: string,
  description: string,
  territorialScope: string,
  hiringConditions: string
) => {
  try {
    const arrayValues = [
      product_id,
      title,
      subTitle,
      description,
      territorialScope,
      hiringConditions,
    ];

    const resultProductDescription = await pool.query(
      "SELECT id FROM app.productdescription WHERE product_id = $1",
      [product_id]
    );

    let query: string;
    if (resultProductDescription.rows.length > 0) {
      query =
        "UPDATE app.productdescription SET title = $2, sub_title = $3, description = $4, territorial_scope = $5, hiring_conditions = $6 WHERE product_id = $1 RETURNING *";
    } else {
      query =
        "INSERT INTO app.productdescription(product_id, title, sub_title, description, territorial_scope, hiring_conditions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    }

    const result = await pool.query(query, arrayValues);
    return { success: true, data: result.rows[0], error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByProductId: any = async (lead_id: string, product_id: string) => {
  try {
    const productResponse = await getDescription(lead_id, product_id);
    const assistanceResponse = await Assistance.getAllBenefits();

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
      id: string;
      name: string;
      title: string;
      subTitle: string;
      description: string;
      territorialScope: string;
      hiringConditions: string;
      assistances: AssistanceT[];
    };

    const dataAssistances: AssistanceT[] = productResponse.assistances.map(
      (item: AssistanceT) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          amount: item.amount,
          maximum: item.maximum,
          events: item.events,
          lack: item.lack,
          currency: item.currency,
          benefits: assistanceResponse.data.benefits
            .filter((benefit: any) => benefit.assistance_id === item.id)
            .map((ex: any) => ex.description),
          exclusions: assistanceResponse.data.exclusions
            .filter((exclusion: any) => exclusion.assistance_id === item.id)
            .map((ex: any) => ex.description),
        };
      }
    );

    let data = {
      lead_id,
      id: product_id,
      name: productResponse.name,
      title: productResponse.title,
      subTitle: productResponse.subTitle,
      description: productResponse.description,
      territorialScope: productResponse.territorialScope,
      hiringConditions: productResponse.hiringConditions,
      assistances: dataAssistances,
    };

    return { success: true, data, error: null };
  } catch (e) {
    console.log(e);
    throw new Error((e as Error).message);
  }
};

const getDescription = async (lead_id: string, product_id: string) => {
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

    return data;
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export { create, getByProductId };
