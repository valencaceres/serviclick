/* Codigo para produccion */

import * as BrokerProduct from '../../models/v2/brokerProduct'
import * as Product from '../../models/v2/product'

/* Controllers y models no modificados, los añadi para que no de error el codigo unicamente. Añadi una letra adicional al final para que tampoco genere error con el codigo
que SI debe ser añadido en produccion */
import * as Productt from '../product'
import * as Brokerr from '../../models/broker'
import * as UserBrokerr from '../../models/userBroker'

import createLogger from '../../util/logger'

const getByIdGateway = async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const { success, model, data, error, status } = await getBrokerDataByIdGateway(id);
  
      if (!success) {
        createLogger.error({
          model,
          error,
        });
        res.status(status).json({ error: "error retrieving broker" });
        return;
      }
  
      res.status(status).json(data);
      return;
    } catch (error) {
      createLogger.error({
        controller: "broker/getById",
        error: (error as Error).message,
      });
      res.status(500).json({ error: "error retrieving broker" });
      return;
    }
  };

  const addProductGateway = async (req: any, res: any) => {
    const {
      broker_id,
      product_id,
      price,
      commisionTypeCode,
      value,
      currency,
      discount,
      beneficiary_price,
      pdfbase64,
    } = req.body;
  
    const responsePlans = await Product.createProductPlanGateway(
      product_id,
      broker_id,
      price.base || null,
      price.customer,
      price.company,
      price.yearly,
      discount,
      beneficiary_price
    );
    if (!responsePlans?.success) {
      createLogger.error({
        controller: "product/createProductPlans",
        error: responsePlans?.error,
      });
      res.status(500).json({ error: "Error creating product plans" });
      return;
    }
  
    createLogger.info({
      controller: "product/createProductPlans",
      data: responsePlans.data,
    });
  
    const brokerProductResponse = await BrokerProduct.createGateway(
      broker_id,
      product_id,
      responsePlans?.data?.customer?.product_plan_id || null,
      responsePlans?.data?.company?.product_plan_id || null,
      responsePlans?.data?.yearly?.product_plan_id || null,
      price,
      commisionTypeCode,
      value,
      currency
    );
  
    if (!brokerProductResponse.success) {
      createLogger.error({
        model: "brokerProduct/create",
        error: brokerProductResponse.error,
      });
      res.status(500).json({ error: "Error creating broker product" });
      return;
    }
    if (pdfbase64 && pdfbase64 != "") {
      let response;
      if (
        responsePlans.data?.customer?.product_plan_id &&
        responsePlans.data?.yearly?.product_plan_id
      ) {
        response = await Productt.insertPdf(
          responsePlans.data.customer.product_plan_id,
          pdfbase64
        );
      } else if (responsePlans.data?.customer?.product_plan_id) {
        response = await Productt.insertPdf(
          responsePlans.data.customer.product_plan_id,
          pdfbase64
        );
      } else if (responsePlans.data?.yearly?.product_plan_id) {
        response = await Productt.insertPdf(
          responsePlans.data.yearly.product_plan_id,
          pdfbase64
        );
      }
  
      if (!response || !response.success) {
        createLogger.error({
          model: "brokerProduct/InsertPdf",
          error: response ? response.error : "No response received",
        });
        res.status(500).json({ error: "Error inserting pdf" });
        return;
      }
    }
    const brokerProducts = await BrokerProduct.getByBrokerIdGateway(broker_id);
    if (!brokerProducts.success) {
      createLogger.error({
        model: "brokerProduct/getByBrokerId",
        error: brokerProducts.error,
      });
      res.status(500).json({ error: "Error retrieving broker product" });
      return;
    }
  
    res.status(200).json(brokerProducts.data);
  };


  const getBrokerDataByIdGateway = async (id: string) => {
    try {
      const brokerResponse = await Brokerr.getById(id);
  
      if (!brokerResponse.success) {
        return {
          success: false,
          model: "broker/getById",
          data: null,
          error: "error retrieving broker",
          status: 500,
        };
      }
  
      if (!brokerResponse.data) {
        return {
          success: true,
          model: "broker/getById",
          data: {},
          error: "error retrieving broker",
          status: 404,
        };
      }
      const brokerProductResponse = await BrokerProduct.getByBrokerIdGateway(id);
      if (!brokerProductResponse.success) {
        return {
          success: false,
          model: "brokerProduct/getByBrokerId",
          data: null,
          error: "error retrieving broker",
          status: 500,
        };
      }
      const userBrokerResponse = await UserBrokerr.getByBrokerId(id);
  
      if (!userBrokerResponse.success) {
        return {
          success: false,
          model: "userBroker/getByBrokerId",
          data: null,
          error: "error retrieving broker",
          status: 500,
        };
      }
  
      const {
        rut,
        name,
        legalRepresentative,
        line,
        fantasyName,
        address,
        district,
        email,
        phone,
        logo,
      } = brokerResponse.data;
  
      const data = {
        id,
        rut,
        name,
        legalRepresentative,
        line,
        fantasyName,
        address,
        district,
        email,
        phone,
        logo,
        products: brokerProductResponse.data,
        users: userBrokerResponse.data,
      };
  
      return {
        success: true,
        controller: "broker/getById",
        data,
        error: null,
        status: 200,
      };
    } catch (e) {
      return {
        success: false,
        model: "broker/getById",
        data: null,
        error: "error retrieving broker",
        status: 500,
      };
    }
  };