import pool from "../../util/database";

const getByBrokerIdGateway: any = async (broker_id: string) => {
    try {
      const result = await pool.query(
        `
        SELECT  brp.product_id,
                pro.name,
                pro.beneficiaries,
                des.promotional,
                plp.baseprice,
                plp.price as customerprice,
                plc.price as companyprice,
                ply.price as yearlyprice,
                plp.beneficiary_price as beneficiary_price,
                brp.commisiontype_code,
                brp.value,
                brp.currency,
                plp.id as productplan_customer_id,
                plc.id as productplan_company_id,
                ply.id as productplan_yearly_id,
                plp.discount_type,
                plp.discount_percent,
                plp.discount_cicles
          FROM  app.brokerProduct brp
                  inner join app.product pro on brp.product_id = pro.id
                  left outer join app.productdescription des on pro.id = des.product_id
                  LEFT OUTER JOIN app.productplan plp ON plp.product_id = pro.id AND plp.id::text = brp.gateway_customer_plan_id
                          LEFT OUTER JOIN app.productplan plc ON plc.product_id = pro.id AND plc.id::text = brp.gateway_company_plan_id
                          LEFT OUTER JOIN app.productplan ply ON ply.product_id = pro.id AND ply.id::text = brp.gateway_yearly_plan_id
                  WHERE brp.broker_id = $1
                  and brp.isactive = true
          ORDER BY
                brp.number,
                pro.name`,
        [broker_id]
      );
      const data = result.rows.map((row) => {
        const {
          product_id,
          name,
          beneficiaries,
          promotional,
          baseprice,
          customerprice,
          companyprice,
          yearlyprice,
          commisiontype_code,
          value,
          currency,
          productplan_customer_id,
          productplan_company_id,
          productplan_yearly_id,
          discount_type,
          discount_percent,
          discount_cicles,
          beneficiary_price,
        } = row;
        return {
          product_id,
          name,
          beneficiaries,
          promotional,
          beneficiary_price,
          productPlan_id: {
            customer: productplan_customer_id,
            company: productplan_company_id,
            yearly:  productplan_yearly_id
          },
          price: {
            base: baseprice,
            customer: customerprice,
            company: companyprice,
            yearly: yearlyprice
          },
          commisionTypeCode: commisiontype_code,
          value,
          currency,
          discount: {
            type: discount_type,
            percent: discount_percent,
            cicles: discount_cicles,
          },
        };
      });
      return { success: true, data, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };
  
  const createGateway: any = async (
    broker_id: string,
    product_id: string,
    customer_plan_id: number,
    company_plan_id: number,
    yearly_plan_id: number,
    price: any,
    commisionTypeCode: string,
    value: number,
    currency: string
  ) => {
    try {
      const arrayValues = [
        broker_id,
        product_id,
        customer_plan_id,
        company_plan_id,
        yearly_plan_id,
        price.base || 0,
        price.customer || 0,
        price.company || 0 ,
        price.yearly || 0,
        commisionTypeCode,
        value,
        currency,
      ];
  
  
      const resultBrokerProduct = await pool.query(
        "SELECT 1 FROM app.brokerProduct WHERE broker_id = $1 AND product_id = $2",
        [broker_id, product_id]
      );
  
      let query: string;
  
      if (resultBrokerProduct.rows.length > 0) {
        query = `
          UPDATE  app.brokerProduct
          SET     gateway_customer_plan_id = $3,
                  gateway_company_plan_id = $4,
                  gateway_yearly_plan_id = $5,
                  baseprice = $6,
                  customerprice = $7,
                  companyprice = $8,
                  yearlyprice = $9,
                  commisiontype_code = $10,
                  value = $11,
                  currency = $12
          WHERE   broker_id = $1 AND
                  product_id = $2 RETURNING *`;
      } else {
        query = `
          INSERT  INTO app.brokerProduct(
                  broker_id,
                  product_id,
                  gateway_customer_plan_id,
                  gateway_company_plan_id,
                  gateway_yearly_plan_id,
                  baseprice,
                  customerprice,
                  companyprice,
                  yearlyprice,
                  commisiontype_code,
                  value,
                  currency)
          VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
      }
  
      const result = await pool.query(query, arrayValues);
  
      const data = {
        broker_id: result.rows[0].broker_id,
        product_id: result.rows[0].product_id,
        price: {
          customer: {
            base: result.rows[0].baseprice,
            price: result.rows[0].customerprice,
            plan_id: result.rows[0].gateway_customer_plan_id,
          },
          company: {
            price: result.rows[0].companyprice,
            plan_id: result.rows[0].gateway_company_plan_id,
          },
          yearly:{
            price: result.rows[0].yearlyprice,
            plan_id: result.rows[0].gateway_yearly_plan_id
          }
        },
        commisionTypeCode: result.rows[0].commisiontype_code,
        value: result.rows[0].value,
        currency: result.rows[0].currency,
      };
  
      return { success: true, data, error: null };
    } catch (e) {
      return { success: false, data: null, error: (e as Error).message };
    }
  };

export {createGateway, getByBrokerIdGateway}