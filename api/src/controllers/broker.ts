import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import { sendMail } from "../util/email";

import * as Broker from "../models/broker";
import * as BrokerProduct from "../models/brokerProduct";
import * as UserBroker from "../models/userBroker";
import * as BrokerUser from "../models/brokerUser";
import * as Product from "./product";
import {
  updateClerkUser,
  createClerkUser,
  fetchClerkUserByEmail,
} from "../util/clerkUserData";

const createFull = async (req: any, res: any) => {
  try {
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
      products,
      users,
    } = req.body;

    const brokerResponse = await Broker.create(
      rut,
      name,
      legalRepresentative,
      line,
      fantasyName,
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
      res.status(500).json({ error: "Error creating broker" });
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
        res.status(500).json({ error: "Error deleting broker" });
        return;
      }

      for (const product of products) {
        const {
          product_id,
          price,
          commisionTypeCode,
          value,
          currency,
          discount,
          beneficiary_price,
        } = product;

        const responsePlans = await Product.createProductPlans(
          product_id,
          broker_id,
          price.base || null,
          price.customer,
          price.company,
          price.yearly,
          discount,
          beneficiary_price
        );

        if (!responsePlans.success) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: responsePlans.error,
          });
          res.status(500).json({ error: "Error creating product plans" });
          return;
        }

        const brokerProductResponse = await BrokerProduct.create(
          broker_id,
          product_id,
          responsePlans.data?.customer.id | 0,
          responsePlans.data?.company.id | 0,
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
        res.status(500).json({ error: "Error deactivating broker product" });
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
            res.status(500).json({ error: "Error creating user broker" });
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
              .json({ error: "Error sending credentials" });
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
      res.status(status).json({ error: "error retrieving broker" });
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
    res.status(500).json({ error: "Error creating broker" });
    return;
  }
};

const create = async (req: any, res: any) => {
  try {
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
    } = req.body;

    const brokerResponse = await Broker.create(
      rut,
      name,
      legalRepresentative,
      line,
      fantasyName,
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
      res.status(500).json({ error: "Error creating broker" });
      return;
    }

    const { id } = brokerResponse.data;

    const { success, model, data, error, status } = await getBrokerDataById(id);

    if (!success) {
      createLogger.error({
        model,
        error,
      });
      res.status(status).json({ error: "error retrieving broker" });
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
    res.status(500).json({ error: "Error creating broker" });
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
      res.status(500).json({ error: "Error retrieving brokers" });
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
    res.status(500).json({ error: "Error retrieving brokers" });
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

const deleteById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const brokerResponse = await Broker.deleteById(id);

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/deleteById",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: "Error deleting broker" });
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
    res.status(500).json({ error: "Error deleting broker" });
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
      res.status(500).json({ error: "Error updating broker" });
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
    res.status(500).json({ error: "Error updating broker" });
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
      res.status(500).json({ error: "Error retrieving families" });
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
    res.status(500).json({ error: "Error retrieving families" });
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
      res.status(500).json({ error: "Error retrieving products" });
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
    res.status(500).json({ error: "Error retrieving products" });
    return;
  }
};

const getCollectById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const brokerResponse = await Broker.getCollectById(id);

    if (!brokerResponse.success) {
      createLogger.error({
        model: "broker/getCollectById",
        error: brokerResponse.error,
      });
      res.status(500).json({ error: "Error retrieving collect" });
      return;
    }

    createLogger.info({
      controller: "broker/getCollectById",
      message: "OK",
    });
    res.status(200).json(brokerResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "broker/getCollectById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving collect" });
    return;
  }
};

const addProduct = async (req: any, res: any) => {
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

  const responsePlans = await Product.createProductPlans(
    product_id,
    broker_id,
    price.base || null,
    price.customer,
    price.company,
    price.yearly,
    discount,
    beneficiary_price
  );

  if (!responsePlans.success) {
    createLogger.error({
      controller: "product/createProductPlans",
      error: responsePlans.error,
    });
    res.status(500).json({ error: "Error creating product plans" });
    return;
  }

  createLogger.info({
    controller: "product/createProductPlans",
    data: responsePlans.data,
  });

  const brokerProductResponse = await BrokerProduct.create(
    broker_id,
    product_id,
    responsePlans?.data?.customer?.id || null,
    responsePlans?.data?.company?.id || null,
    responsePlans?.data?.yearly?.id || null,
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
      response = await Product.insertPdf(
        responsePlans.data.customer.product_plan_id,
        pdfbase64
      );
    } else if (responsePlans.data?.customer?.product_plan_id) {
      response = await Product.insertPdf(
        responsePlans.data.customer.product_plan_id,
        pdfbase64
      );
    } else if (responsePlans.data?.yearly?.product_plan_id) {
      response = await Product.insertPdf(
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
  const brokerProducts = await BrokerProduct.getByBrokerId(broker_id);
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

const removeProduct = async (req: any, res: any) => {
  const { broker_id, product_id } = req.body;

  const responseBrokerProduct = await BrokerProduct.removeByProductId(
    broker_id,
    product_id
  );

  if (!responseBrokerProduct.success) {
    createLogger.error({
      controller: "broker/removeProduct",
      error: responseBrokerProduct.error,
    });
    res.status(500).json({ error: "Error removing product" });
    return;
  }

  const brokerProducts = await BrokerProduct.getByBrokerId(broker_id);

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

const getAgents = async (req: any, res: any) => {
  const { id } = req.params;

  const response = await BrokerUser.getByBrokerId(id);

  if (!response.success) {
    createLogger.error({
      model: "brokerUser/getByBrokerId",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving broker user" });
    return;
  }

  createLogger.info({
    controller: "broker/getAgents",
    message: "OK",
  });

  res.status(200).json(response.data);
};

const updateAgent = async (req: any, res: any) => {
  const { brokerId } = req.params;
  const {
    rut,
    name,
    paternallastname,
    maternallastname,
    password,
    profileCode,
    email,
    district,
    rol_web_broker,
  } = req.body;
  const resultUserByEmail = await fetchClerkUserByEmail(email);

  let userId;
  if (resultUserByEmail.data && resultUserByEmail.data?.length > 0) {
    userId = resultUserByEmail.data[0].id;
    const response = await updateClerkUser({
      user_id: resultUserByEmail.data[0].id,
      first_name: name,
      last_name: paternallastname,
      public_metadata: {
        roles: {
          broker: rol_web_broker,
          serviclick: (resultUserByEmail.data[0] as any).publicMetadata.roles
            .serviclick,
          operations: (resultUserByEmail.data[0] as any).publicMetadata.roles
            .operations,
          retail: (resultUserByEmail.data[0] as any).publicMetadata.roles
            .retail,
          admin: (resultUserByEmail.data[0] as any).publicMetadata.roles.admin,
          web_admin: (resultUserByEmail.data[0] as any).publicMetadata.roles
            .web_admin,
        },
      },
    });
  } else {
    const response = await createClerkUser({
      first_name: name,
      last_name: paternallastname,
      email_address: [email],
      public_metadata: {
        roles: {
          broker: rol_web_broker,
          serviclick: "user",
          operations: "user",
          retail: "user",
          admin: "user",
          web_admin: "user",
        },
      },
      password: password,
    });
    userId = response.data.id;
  }
  const responseUpdateProfileCode = await BrokerUser.updateProfileCode(
    userId,
    brokerId,
    profileCode,
    email,
    rut,
    maternallastname,
    paternallastname,
    district,
    name
  );

  if (!responseUpdateProfileCode.success) {
    createLogger.error({
      model: "broker/updateAgent",
      error: responseUpdateProfileCode.error,
    });
    res.status(500).json({ error: "Error updating broker user" });
    return;
  }

  createLogger.info({
    controller: "broker/updateAgent",
    message: "OK",
  });
  return res.status(200).json(responseUpdateProfileCode);
};

const removeAgent = async (req: any, res: any) => {
  const { agentId, brokerId } = req.body;
  const response = await BrokerUser.removeByUserId(agentId, brokerId);

  if (!response.success) {
    createLogger.error({
      model: "brokerUser/removeByUserId",
      error: response.error,
    });
    res.status(500).json({ error: "Error removing broker user" });
    return;
  }

  createLogger.info({
    controller: "broker/removeAgent",
    message: "OK",
  });

  res.status(200).json(response.data);
};

const getByUserId = async (req: any, res: any) => {
  try {
    const { user_id } = req.params;
    const { success, data, error } = await Broker.getByUserId(user_id);

    if (!success) {
      createLogger.error({
        model: "broker/getByUserId",
        error,
      });
      res.status(500).json({ error: "error retrieving broker" });
      return;
    }

    res.status(200).json(data);
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

const getProductsById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { success, data, error } = await Broker.getProductsById(id);
    if (!success) {
      createLogger.error({
        model: "broker/getProductsById",
        error,
      });
      res.status(500).json({ error: "error retrieving broker" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/getProductsById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "error retrieving broker" });
    return;
  }
};

const getCollectionById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { success, data, error } = await Broker.getCollectionById(id);

    if (!success) {
      createLogger.error({
        model: "broker/getCollectionById",
        error,
      });
      res.status(500).json({ error: "error retrieving broker" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/getCollectionById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "error retrieving broker" });
    return;
  }
};

export {
  create,
  addProduct,
  removeProduct,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByBrokerId,
  getProductsByBrokerIdAndFamilyId,
  getCollectById,
  getAgents,
  updateAgent,
  getByUserId,
  getProductsById,
  getCollectionById,
  removeAgent,
};

export const getBrokerDataById = async (id: string) => {
  try {
    const brokerResponse = await Broker.getById(id);

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

    const brokerProductResponse = await BrokerProduct.getByBrokerId(id);
    if (!brokerProductResponse.success) {
      return {
        success: false,
        model: "brokerProduct/getByBrokerId",
        data: null,
        error: "error retrieving broker",
        status: 500,
      };
    }

    const userBrokerResponse = await UserBroker.getByBrokerId(id);

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

const getBrokerDataByRut = async (rut: string) => {
  try {
    const brokerResponse = await Broker.getByRut(rut);

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

    const {
      id,
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

    const brokerProductResponse = await BrokerProduct.getByBrokerId(id);

    if (!brokerProductResponse.success) {
      return {
        success: false,
        model: "brokerProduct/getByBrokerId",
        data: null,
        error: "error retrieving product broker",
        status: 500,
      };
    }

    const userBrokerResponse = await UserBroker.getByBrokerId(id);

    if (!userBrokerResponse.success) {
      return {
        success: false,
        model: "userBroker/getByBrokerId",
        data: null,
        error: "error retrieving  user broker",
        status: 500,
      };
    }

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
      error: "error retrieving   broker",
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
        error: "error retrieving user  broker",
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
          error: "error retrieving assigning password",
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
      error: "error sending credentials",
      status: 500,
    };
  }
};

export const getAssistancesByBrokerIdAndProductId = async (
  req: any,
  res: any
) => {
  try {
    const { broker_id, product_id } = req.query;
    const { success, data, error } =
      await Broker.getAssistancesByBrokerIdAndProductId(broker_id, product_id);

    if (!success) {
      createLogger.error({
        error,
      });
      res.status(status).json({ error: "error retrieving assistances" });
      return;
    }

    res.status(200).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "broker/getAssistancesByBrokerIdAndProductId",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "error retrieving broker" });
    return;
  }
};

export const getProductsAndAssistancesByBrokerId = async (req: any, res: any) => {
  try {
    const {id} = req.params
    const response = await Broker.getProductAndAssistancesByBrokerId(id)
    if(!response.success){
      res.status(500).json('Error getting products and assistances')
    }

    return res.status(200).json(response.data)
  } catch (e: any) {
    createLogger.error({
      controller: "broker/getProductAndAssistancesByBrokerId",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "error retrieving broker" });
    return;
  }
}

