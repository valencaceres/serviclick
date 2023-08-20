import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import { sendMail } from "../util/email";

import * as Retail from "../models/retail";
import * as Company from "../models/company";
import * as RetailLegalRepresentative from "../models/retailLegalRepresentative";
import * as RetailProduct from "../models/retailProduct";
import * as RetailCampaign from "../models/retailCampaign";
import * as UserRetail from "../models/userRetail";
import * as Product from "./product";

const create = async (req: any, res: any) => {
  try {
    const {
      rut,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
      products,
      users,
      legalRepresentatives,
    } = req.body;

    const retailResponse = await Retail.create(
      rut,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
      legalRepresentatives
    );

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/create",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error creating retail" });
      return;
    }

    const companyResponse = await Company.create(
      rut,
      name,
      "",
      line,
      address,
      district,
      email,
      phone
    );

    if (!companyResponse.success) {
      createLogger.error({
        model: "company/create",
        error: companyResponse.error,
      });
      res.status(500).json({ error: "Error creating company" });
      return;
    }

    const { id: retail_id, rut: retail_rut } = retailResponse.data;

    if (legalRepresentatives && legalRepresentatives.length > 0) {
      const deleteResponse = await RetailLegalRepresentative.deleteByRetailId(
        retail_id
      );

      if (!deleteResponse.success) {
        createLogger.error({
          model: "retailLegalRepresentative/deleteByRetailId",
          error: deleteResponse.error,
        });
        res.status(500).json({ error: "Error deleting retail legal representative" });
        return;
      }

      for (const legalRepresentative of legalRepresentatives) {
        const { rut, name } = legalRepresentative;

        if (rut && name) {
          const legalRepresentativeResponse =
            await RetailLegalRepresentative.create(retail_id, rut, name);

          if (!legalRepresentativeResponse.success) {
            createLogger.error({
              model: "legalRepresentative/create",
              error: legalRepresentativeResponse.error,
            });
            res.status(500).json({ error: "Error creating retail legal representative" });
            return;
          }
        }
      }
    }

    if (products.length > 0) {
      const retailProductDelete = await RetailProduct.deleteByRetailId(
        retail_id
      );

      if (!retailProductDelete.success) {
        createLogger.error({
          model: "retailProduct/deleteByRetailId",
          error: retailProductDelete.error,
        });
        res.status(500).json({ error: "Error deleting retail product" });
        return;
      }

      for (const product of products) {
        const { product_id, campaign, price, currency, discount } = product;

        let retailcampaign_id: string | null = null;

        if (campaign !== "") {
          const retailCampaign = await RetailCampaign.create(
            retail_id,
            campaign
          );

          if (!retailCampaign.success) {
            createLogger.error({
              model: "retailCampaign/create",
              error: retailCampaign.error,
            });
            res.status(500).json({ error: "Error creating retail campaign" });
            return;
          }

          retailcampaign_id = retailCampaign.data.id;
        }

        const responsePlans = await Product.createProductPlans(
          product_id,
          retail_id,
          null,
          price.base,
          price.company,
          discount
        );

        if (!responsePlans.success) {
          createLogger.error({
            controller: "product/createProductPlans",
            error: responsePlans.error,
          });
          res.status(500).json({ error: "Error creating product plans" });
          return;
        }

        const retailProductResponse = await RetailProduct.create(
          retail_id,
          product_id,
          responsePlans.data?.company.id | 0,
          retailcampaign_id,
          price,
          currency
        );

        if (!retailProductResponse.success) {
          createLogger.error({
            model: "retailProduct/create",
            error: retailProductResponse.error,
          });
          res.status(500).json({ error: "Error creating retail product" });
          return;
        }

        // productsRetailResponse.push(retailProductResponse.data);
      }
    }

    if (users.length > 0) {
      const retailProductInactive = await UserRetail.inactiveAllByRetailId(
        retail_id
      );

      if (!retailProductInactive.success) {
        createLogger.error({
          model: "userRetail/inactiveAllByRetailId",
          error: retailProductInactive.error,
        });
        res.status(500).json({ error: "Error deactivating users retail" });
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

          const userRetailResponse = await UserRetail.create(
            retail_id,
            rut,
            name,
            paternalLastName,
            maternalLastName,
            email,
            profileCode
          );

          if (!userRetailResponse.success) {
            createLogger.error({
              model: "userRetail/create",
              error: userRetailResponse.error,
            });
            res.status(500).json({ error: "Error creating user retail" });
            return;
          }

          const responseSendCredentials = await sendCredentials(
            retail_rut,
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

    const { success, model, data, error, status } = await getRetailDataById(
      retail_id
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
      controller: "retail/create",
      message: "OK",
    });

    res.status(status).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "retail/create",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error creating retail" });
    return;
  }
};

const getAll = async (req: any, res: any) => {
  try {
    const retailResponse = await Retail.getAll();

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/getAll",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error retrieving retails" });
      return;
    }

    createLogger.info({
      controller: "retail/getAll",
      message: "OK",
    });
    res.status(200).json(retailResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "retail/getAll",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving retails" });
    return;
  }
};

const getById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { success, model, data, error, status } = await getRetailDataById(id);

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
      controller: "retail/getById",
      error: (error as Error).message,
    });
    res.status(500).json((error as Error).message);
    return;
  }
};

const getByRut = async (req: any, res: any) => {
  try {
    const { rut } = req.params;
    const { success, model, data, error, status } = await getRetailDataByRut(
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
      controller: "retail/getById",
      error: (error as Error).message,
    });
    res.status(500).json((error as Error).message);
    return;
  }
};

const deleteById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const retailResponse = await Retail.deleteById(id);

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/deleteById",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error deleting retail" });
      return;
    }

    createLogger.info({
      controller: "retail/deleteById",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (error) {
    createLogger.error({
      controller: "retail/deleteById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error deleting retail" });
    return;
  }
};

const updateLogo = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { image } = req.body;

    const retailResponse = await Retail.updateLogo(id, image);

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/updateLogo",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error updating retail" });
      return;
    }

    createLogger.info({
      controller: "retail/updateLogo",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (error) {
    createLogger.error({
      controller: "retail/updateLogo",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error updating retail" });
    return;
  }
};

const getFamiliesByRetailId = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const retailResponse = await Retail.getFamiliesByRetailId(id);

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/getFamiliesByRetailId",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error retrieving families" });
      return;
    }

    createLogger.info({
      controller: "retail/getFamiliesByRetailId",
      message: "OK",
    });
    res.status(200).json(retailResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "retail/getFamiliesByRetailId",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving families" });
    return;
  }
};

const getProductsByRetailIdAndFamilyId = async (req: any, res: any) => {
  try {
    const { id, family_id } = req.params;

    const retailResponse = await Retail.getProductsByRetailIdAndFamilyId(
      id,
      family_id
    );

    if (!retailResponse.success) {
      createLogger.error({
        model: "retail/getProductsByRetailIdAndFamilyId",
        error: retailResponse.error,
      });
      res.status(500).json({ error: "Error retrieving products" });
      return;
    }

    createLogger.info({
      controller: "retail/getProductsByRetailIdAndFamilyId",
      message: "OK",
    });
    res.status(200).json(retailResponse.data);
  } catch (error) {
    createLogger.error({
      controller: "retail/getProductsByRetailIdAndFamilyId",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "Error retrieving products" });
    return;
  }
};

const getRetailDataById = async (id: string) => {
  try {
    const retailResponse = await Retail.getById(id);

    if (!retailResponse.success) {
      return {
        success: false,
        model: "retail/getById",
        data: null,
        error: retailResponse.error,
        status: 500,
      };
    }

    if (!retailResponse.data) {
      return {
        success: true,
        model: "retail/getById",
        data: {},
        error: retailResponse.error,
        status: 404,
      };
    }

    const retailProductResponse = await RetailProduct.getByRetailId(id);

    if (!retailProductResponse.success) {
      return {
        success: false,
        model: "retailProduct/getByRetailId",
        data: null,
        error: retailProductResponse.error,
        status: 500,
      };
    }

    const userRetailResponse = await UserRetail.getByRetailId(id);

    if (!userRetailResponse.success) {
      return {
        success: false,
        model: "userRetail/getByRetailId",
        data: null,
        error: userRetailResponse.error,
        status: 500,
      };
    }

    const {
      rut,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
      legalRepresentatives,
    } = retailResponse.data;

    const data = {
      id,
      rut,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
      legalRepresentatives,
      products: retailProductResponse.data,
      users: userRetailResponse.data,
    };

    return {
      success: true,
      controller: "retail/getById",
      data,
      error: null,
      status: 200,
    };
  } catch (e) {
    return {
      success: false,
      model: "retail/getById",
      data: null,
      error: (e as Error).message,
      status: 500,
    };
  }
};

const getRetailDataByRut = async (rut: string) => {
  try {
    const retailResponse = await Retail.getByRut(rut);

    if (!retailResponse.success) {
      return {
        success: false,
        model: "retail/getById",
        data: null,
        error: retailResponse.error,
        status: 500,
      };
    }

    if (!retailResponse.data) {
      return {
        success: true,
        model: "retail/getById",
        data: {},
        error: retailResponse.error,
        status: 404,
      };
    }

    const {
      id,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
    } = retailResponse.data;

    const retailProductResponse = await RetailProduct.getByRetailId(id);

    if (!retailProductResponse.success) {
      return {
        success: false,
        model: "retailProduct/getByRetailId",
        data: null,
        error: retailProductResponse.error,
        status: 500,
      };
    }

    const userRetailResponse = await UserRetail.getByRetailId(id);

    if (!userRetailResponse.success) {
      return {
        success: false,
        model: "userRetail/getByRetailId",
        data: null,
        error: userRetailResponse.error,
        status: 500,
      };
    }

    const data = {
      id,
      rut,
      name,
      line,
      fantasyName,
      address,
      district,
      email,
      phone,
      logo,
      products: retailProductResponse.data,
      users: userRetailResponse.data,
    };

    return {
      success: true,
      controller: "retail/getById",
      data,
      error: null,
      status: 200,
    };
  } catch (e) {
    return {
      success: false,
      model: "retail/getById",
      data: null,
      error: (e as Error).message,
      status: 500,
    };
  }
};

export const sendCredentials = async (
  retail_rut: string,
  email: string,
  force: boolean
) => {
  try {
    const userRetailResponse = await UserRetail.getByEmail(retail_rut, email);

    if (!userRetailResponse.success) {
      return {
        success: false,
        model: "userRetail/getByEmail",
        data: null,
        error: userRetailResponse.error,
        status: 500,
      };
    }

    const { id, name, hash } = userRetailResponse.data.user;

    if (!hash || force) {
      const generatedPassword = generateGenericPassword();

      const userRetailPasswordResponse = await UserRetail.assignPassword(
        id,
        generatedPassword
      );

      if (!userRetailPasswordResponse.success) {
        return {
          success: false,
          model: "userRetail/assignPassword",
          data: null,
          error: userRetailPasswordResponse.error,
          status: 500,
        };
      }

      await sendMail(
        { name: "Bienvenido a ServiClick" },
        email,
        `Tus credenciales de acceso a nuestra plataforma`,
        `<b>Hola&nbsp;${name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas realizar tus labores:<br/><br/><b>https://retail.serviclick.cl</b><br/><br/><b>Rut:</b>&nbsp;${retail_rut}<br/><b>Login:</b>&nbsp;${email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        []
      );
      return {
        success: true,
        controller: "retail/sendCredentials",
        data: "e-mail sended",
        error: null,
        status: 200,
      };
    }

    return {
      success: true,
      controller: "retail/sendCredentials",
      data: "e-mail not sended (but OK)",
      error: null,
      status: 200,
    };
  } catch (e) {
    return {
      success: false,
      model: "retail/sendCredentials",
      data: null,
      error: (e as Error).message,
      status: 500,
    };
  }
};

export {
  create,
  getById,
  getByRut,
  getAll,
  updateLogo,
  deleteById,
  getFamiliesByRetailId,
  getProductsByRetailIdAndFamilyId,
  getRetailDataById,
};
