import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import { sendMail } from "../util/email";

import * as Broker from "../models/broker";
import * as BrokerProduct from "../models/brokerProduct";
import * as UserBroker from "../models/userBroker";
import * as Product from "../controllers/product";

const create = async (req: any, res: any) => {
  try {
    const {
      rut,
      name,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
      logo,
      products,
      users,
    } = req.body;

    const brokerResponse = await Broker.create(
      rut,
      name,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
      logo
    );

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/create",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    const { id: broker_id, rut: broker_rut } = brokerResponse.data;

    if (products.length > 0) {
      const brokerProductDelete = await BrokerProduct.deleteByBrokerId(
        broker_id
      );

      if (!brokerProductDelete.success) {
        createLogger.error({
          model: "brokerProduct/deleteByBrokerId",
          error: brokerProductDelete.error,
        });
        res.status(500).json({ error: brokerProductDelete.error });
        return;
      }

      for (const product of products) {
        const { product_id, price, commisionTypeCode, value, currency } =
          product;

        const brokerProductResponse = await BrokerProduct.create(
          broker_id,
          product_id,
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
          res.status(500).json({ error: brokerProductResponse.error });
          return;
        }

        const responsePlans = await Product.createProductPlans(
          product_id,
          broker_id,
          price.customer,
          price.company
        );

        if (!responsePlans.success) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: responsePlans.error,
          });
          res.status(500).json({ error: responsePlans.error });
          return;
        }
      }
    }

    if (users.length > 0) {
      const brokerProductInactive = await UserBroker.inactiveAllByBrokerId(
        broker_id
      );

      if (!brokerProductInactive.success) {
        createLogger.error({
          model: "userBroker/inactiveAllByBrokerId",
          error: brokerProductInactive.error,
        });
        res.status(500).json({ error: brokerProductInactive.error });
        return;
      }

      await Promise.all(
        users.map(async (user: any) => {
          const {
            rut,
            name,
            paternalLastName,
            maternalLastName,
            email,
            profileCode,
          } = user;

          const userBrokerResponse = await UserBroker.create(
            broker_id,
            rut,
            name,
            paternalLastName,
            maternalLastName,
            email,
            profileCode
          );

          if (!userBrokerResponse.success) {
            createLogger.error({
              model: "userBroker/create",
              error: userBrokerResponse.error,
            });
            res.status(500).json({ error: userBrokerResponse.error });
            return;
          }

          const responseSendCredentials = await sendCredentials(
            broker_rut,
            email,
            false
          );

          if (!responseSendCredentials.success) {
            createLogger.error({
              model: responseSendCredentials.model,
              error: responseSendCredentials.error,
            });
            res
              .status(responseSendCredentials.status)
              .json({ error: responseSendCredentials.error });
            return;
          }
        })
      );
    }

    const { success, model, data, error, status } = await getBrokerDataById(
      broker_id
    );

    if (!success) {
      createLogger.error({
        model,
        error,
      });
      res.status(status).json({ error });
      return;
    }

    createLogger.info({
      controller: "broker/create",
      message: "OK",
    });

    res.status(status).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/create",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getAll = async (req: any, res: any) => {
  try {
    const brokerResponse = await Broker.getAll();

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/getAll",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    createLogger.info({
      controller: "broker/getAll",
      message: "OK",
    });
    res.status(200).json(brokerResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "broker/getAll",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { success, model, data, error, status } = await getBrokerDataById(id);

    if (!success) {
      createLogger.error({
        model,
        error,
      });
      res.status(status).json({ error });
      return;
    }

    res.status(status).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/getById",
      error: (error as Error).message,
    });
    res.status(500).json((error as Error).message);
    return;
  }
};

const getByRut = async (req: any, res: any) => {
  try {
    const { rut } = req.params;
    const { success, model, data, error, status } = await getBrokerDataByRut(
      rut
    );

    if (!success) {
      createLogger.error({
        model,
        error,
      });
      res.status(status).json({ error });
      return;
    }

    res.status(status).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/getById",
      error: (error as Error).message,
    });
    res.status(500).json((error as Error).message);
    return;
  }
};

const deleteById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const brokerResponse = await Broker.deleteById(id);

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/deleteById",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    createLogger.info({
      controller: "broker/deleteById",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (error) {
    createLogger.error({
      controller: "broker/deleteById",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const updateLogo = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const brokerResponse = await Broker.updateLogo(id, image);

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/updateLogo",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    createLogger.info({
      controller: "broker/updateLogo",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (error) {
    createLogger.error({
      controller: "broker/updateLogo",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getFamiliesByBrokerId = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const brokerResponse = await Broker.getFamiliesByBrokerId(id);

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/getFamiliesByBrokerId",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    createLogger.info({
      controller: "broker/getFamiliesByBrokerId",
      message: "OK",
    });
    res.status(200).json(brokerResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "broker/getFamiliesByBrokerId",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

const getProductsByBrokerIdAndFamilyId = async (req: any, res: any) => {
  try {
    const { id, family_id } = req.params;

    const brokerResponse = await Broker.getProductsByBrokerIdAndFamilyId(
      id,
      family_id
    );

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/getProductsByBrokerIdAndFamilyId",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: brokerResponse.error });
      return;
    }

    createLogger.info({
      controller: "broker/getProductsByBrokerIdAndFamilyId",
      message: "OK",
    });
    res.status(200).json(brokerResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "broker/getProductsByBrokerIdAndFamilyId",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

export {
  create,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
};

const getBrokerDataById = async (id: string) => {
  try {
    const brokerResponse = await Broker.getById(id);

    if (!brokerResponse.success) {
      return {
        success: false,
        model: "broker/getById",
        data: null,
        error: brokerResponse.error,
        status: 500,
      };
    }

    if (!brokerResponse.data) {
      return {
        success: true,
        model: "broker/getById",
        data: {},
        error: brokerResponse.error,
        status: 404,
      };
    }

    const brokerProductResponse = await BrokerProduct.getByBrokerId(id);

    if (!brokerProductResponse.success) {
      return {
        success: false,
        model: "brokerProduct/getByBrokerId",
        data: null,
        error: brokerProductResponse.error,
        status: 500,
      };
    }

    const userBrokerResponse = await UserBroker.getByBrokerId(id);

    if (!userBrokerResponse.success) {
      return {
        success: false,
        model: "userBroker/getByBrokerId",
        data: null,
        error: userBrokerResponse.error,
        status: 500,
      };
    }

    const {
      rut,
      name,
      legalRepresentative,
      line,
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
      error: (e as Error).message,
      status: 500,
    };
  }
};

const getBrokerDataByRut = async (rut: string) => {
  try {
    const brokerResponse = await Broker.getByRut(rut);

    if (!brokerResponse.success) {
      return {
        success: false,
        model: "broker/getById",
        data: null,
        error: brokerResponse.error,
        status: 500,
      };
    }

    if (!brokerResponse.data) {
      return {
        success: true,
        model: "broker/getById",
        data: {},
        error: brokerResponse.error,
        status: 404,
      };
    }

    const {
      id,
      name,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
      logo,
    } = brokerResponse.data;

    const brokerProductResponse = await BrokerProduct.getByBrokerId(id);

    if (!brokerProductResponse.success) {
      return {
        success: false,
        model: "brokerProduct/getByBrokerId",
        data: null,
        error: brokerProductResponse.error,
        status: 500,
      };
    }

    const userBrokerResponse = await UserBroker.getByBrokerId(id);

    if (!userBrokerResponse.success) {
      return {
        success: false,
        model: "userBroker/getByBrokerId",
        data: null,
        error: userBrokerResponse.error,
        status: 500,
      };
    }

    const data = {
      id,
      rut,
      name,
      legalRepresentative,
      line,
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
      error: (e as Error).message,
      status: 500,
    };
  }
};

export const sendCredentials = async (
  broker_rut: string,
  email: string,
  force: boolean
) => {
  try {
    const userBrokerResponse = await UserBroker.getByEmail(broker_rut, email);

    if (!userBrokerResponse.success) {
      return {
        success: false,
        model: "userBroker/getByEmail",
        data: null,
        error: userBrokerResponse.error,
        status: 500,
      };
    }

    const { id, name, hash } = userBrokerResponse.data.user;

    if (!hash || force) {
      const generatedPassword = generateGenericPassword();

      const userBrokerPasswordResponse = await UserBroker.assignPassword(
        id,
        generatedPassword
      );

      if (!userBrokerPasswordResponse.success) {
        return {
          success: false,
          model: "userBroker/assignPassword",
          data: null,
          error: userBrokerPasswordResponse.error,
          status: 500,
        };
      }

      await sendMail(
        { name: "Bienvenido a ServiClick" },
        email,
        `Tus credenciales de acceso a nuestra plataforma`,
        `<b>Hola&nbsp;${name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas realizar tus labores:<br/><br/><b>https://broker.serviclick.cl</b><br/><br/><b>Rut:</b>&nbsp;${broker_rut}<br/><b>Login:</b>&nbsp;${email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        []
      );
      return {
        success: true,
        controller: "broker/sendCredentials",
        data: "e-mail sended",
        error: null,
        status: 200,
      };
    }

    return {
      success: true,
      controller: "broker/sendCredentials",
      data: "e-mail not sended (but OK)",
      error: null,
      status: 200,
    };
  } catch (e) {
    return {
      success: false,
      model: "broker/sendCredentials",
      data: null,
      error: (e as Error).message,
      status: 500,
    };
  }
};
