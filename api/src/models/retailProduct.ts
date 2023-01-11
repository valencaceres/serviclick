import pool from "../util/database";

const create: any = async (
  retail_id: string,
  product_id: string,
  productPlan_id: number,
  retailCampaign_id: string,
  price: any,
  currency: string
) => {
  try {
    const arrayValues = [
      retail_id,
      product_id,
      productPlan_id,
      retailCampaign_id,
      price.normal,
      price.company,
      currency,
    ];

    const query: string = `
            INSERT  INTO app.retailProduct(
                    retail_id,
                    product_id,
                    productplan_id,
                    retailcampaign_id,
                    normalprice,
                    companyprice,
                    currency)
            VALUES( $1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const result = await pool.query(query, arrayValues);

    const data = {
      retail_id: result.rows[0].retail_id,
      product_id: result.rows[0].product_id,
      productPlan_id: result.rows[0].productplan_id,
      retailcampaign_id: result.rows[0].retailcampaign_id,
      price: {
        normal: result.rows[0].normalprice,
        company: result.rows[0].companyprice,
      },
      currency: result.rows[0].currency,
    };

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const deleteByRetailId: any = async (retail_id: string) => {
  try {
    const result = await pool.query(
      `DELETE FROM app.retailProduct WHERE retail_id = $1`,
      [retail_id]
    );

    return { success: true, data: "OK", error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

const getByRetailId: any = async (retail_id: string) => {
  try {
    const result = await pool.query(
      `
        SELECT  brp.product_id,
                pro.name as name,
                des.promotional,
                case when cam.name is null then '' else cam.name end as campaign,
                brp.normalprice,
                brp.companyprice,
                brp.currency
        FROM    app.retailProduct brp inner join app.product pro on brp.product_id = pro.id
                  left outer join app.retailcampaign cam on brp.retail_id = cam.retail_id and brp.retailcampaign_id = cam.id
                  left outer join app.productdescription des on pro.id = des.product_id
        WHERE   brp.retail_id = $1 and brp.isactive is true
        ORDER   BY
                cam.name,
                pro.name`,
      [retail_id]
    );

    const data = result.rows.map((row) => {
      const {
        product_id,
        name,
        promotional,
        campaign,
        normalprice,
        companyprice,
        currency,
      } = row;
      return {
        product_id,
        name,
        promotional,
        campaign,
        price: { normal: normalprice, company: companyprice },
        currency,
      };
    });

    return { success: true, data, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { create, deleteByRetailId, getByRetailId };
