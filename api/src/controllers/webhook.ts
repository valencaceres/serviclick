import axios from "axios";

import * as UserInsuredModel from "../models/userInsured";
import * as UserCompanyModel from "../models/userCompany";
import * as LeadModel from "../models/lead";
import * as CompanyModel from "../models/company";
import * as ProductDescriptionModel from "../models/productDescription";
import * as InsuredModel from "../models/insured";
import * as Policy from "../models/policy"
import * as Payment from "../models/payment"
import * as Cron from "../models/cron"
import * as Subscription from "../models/subscription"
import createLogger from "../util/logger";
import { generateGenericPassword } from "../util/user";
import config from "../util/config";
import moment from "moment";
import { apiReveniu } from "../util/reveniu";


interface IPayment {
  payment_id: number;
  date: string | null;
  amount: number;
  buy_order: number;
  credit_card_type: string;
  is_recurrent: boolean;
  gateway_response: string;
}

interface ISubscriptionResume {
  subscription_id: number;
  payments: IPayment[];
}

/* const subscriptionActivated = async (req: any, res: any) => {
  const { subscription_id } = req.body;

  try {
    const leadResponse = await LeadModel.getBySubscriptionId(subscription_id);
    
    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getBySubscriptionId",
        error: leadResponse.error,
      });
      res.status(500).json({ error: "Error retrieving lead" });
      return;
    }

    const {
      id: lead_id,
      company_id,
      policy_id,
      policy_number,
      policy_createdate,
      policy_startdate,
    } = leadResponse.data;

    const leadProductResponse = await LeadModel.getProductsById(
      lead_id //leadResponse.data.id
    );

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "lead/getProductsById",
        error: leadProductResponse.error,
      });
      res.status(500).json({ error: "Error retrieving products " });
      return;
    }

    const { product_id, price } = leadProductResponse.data;

    const productDescriptionResponse =
      await ProductDescriptionModel.getByProductId(
        lead_id,
        product_id //leadResponse.data.id
      );

    if (!productDescriptionResponse.success) {
      createLogger.error({
        model: "productDescription/getByProductId",
        error: productDescriptionResponse.error,
      });
      res.status(500).json({ error: "Error retrieving product description" });
      return;
    }

    const leadInsuredResponse = await LeadModel.getInsuredById(
      lead_id //leadResponse.data.id
    );

    if (!leadInsuredResponse.success) {
      createLogger.error({
        model: "lead/getInsuredById",
        error: leadInsuredResponse.error,
      });
      res.status(500).json({ erorr: "Error retrieving insured" });
      return;
    }

    if (company_id) {
      const companyResponse = await CompanyModel.getById(company_id);

      if (!companyResponse.success) {
        createLogger.error({
          model: "company/getByIdModel",
          error: companyResponse.error,
        });
        res.status(500).json({ error: "Error retrieving company" });
        return;
      }

      const responseDocuments = await generateDocuments(
        lead_id,
        null,
        companyResponse.data,
        productDescriptionResponse.data,
        price * leadInsuredResponse.data.length,
        policy_number,
        policy_createdate,
        policy_startdate
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        res.status(500).json({ error: "Error creating documents" });
        return;
      }

      const userCompanyResponse = await UserCompanyModel.create(
        company_id,
        companyResponse.data.email
      );

      if (!userCompanyResponse.success) {
        createLogger.error({
          model: "userCompany/create",
          error: userCompanyResponse.error,
        });
        res.status(500).json({ error: "Error creating user company" });
        return;
      }

      const generatedPassword = generateGenericPassword();
      const userCopmpanyResponse = await UserCompanyModel.assignPassword(
        userCompanyResponse.data.id,
        generatedPassword
      );

      if (!userCopmpanyResponse.success) {
        createLogger.error({
          model: "userCompany/assignPassword",
          error: userCopmpanyResponse.error,
        });
        res.status(500).json({ error: "Error assigning password to user company" });
        return;
      }

      const attachmentCompany = [
        `contrato_${lead_id}.pdf`,
        `anexo_${lead_id}.pdf`,
      ];

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
        },
        {
          headers: config.email.apiKey,
        }
      );

      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        res.status(500).json({ error: "Error creating email response" });
        return;
      }
    }

    const attachmentInsured = [`anexo_${lead_id}.pdf`];

    if (!company_id) {
      const insuredResponse = await InsuredModel.getById(
        leadInsuredResponse.data[0].id
      );

      if (!insuredResponse.success) {
        createLogger.error({
          model: "insured/getByIdModel",
          error: insuredResponse.error,
        });
        res.status(500).json({ error: "Error retrieving insured" });
        return;
      }

      const responseDocuments = await generateDocuments(
        lead_id,
        insuredResponse.data,
        null,
        productDescriptionResponse.data,
        price,
        policy_number,
        policy_createdate,
        policy_startdate
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        res.status(500).json({ error: "Error creating  document" });
        return;
      }

      attachmentInsured.push(`contrato_${lead_id}.pdf`);
    }

    type DetailT = {
      insured_id: string;
      error: string;
    };

    const responses: DetailT[] = [];

    leadInsuredResponse.data.map(async (insured: any) => {
      const userInsuredResponse = await UserInsuredModel.create(
        insured.id,
        insured.email
      );

      if (!userInsuredResponse.success) {
        createLogger.error({
          model: "userInsured/create",
          error: userInsuredResponse.error,
        });

        responses.push({
          insured_id: insured.id,
          error: "User error: " + userInsuredResponse.error,
        });
      }

      const generatedPassword = generateGenericPassword();
      const userPasswordResponse = await UserInsuredModel.assignPassword(
        userInsuredResponse.data.id,
        generatedPassword
      );

      if (!userPasswordResponse.success) {
        createLogger.error({
          model: "userInsured/assignPassword",
          error: userPasswordResponse.error,
        });
        responses.push({
          insured_id: insured.id,
          error: "Password error: " + userPasswordResponse.error,
        });
      }

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
        },
        {
          headers: config.email.apiKey,
        }
      );

      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        res.status(500).json({ error: "Error creating email" });
        return;
      }
    });

    if (responses.length > 0) {
      return responses;
    }

    createLogger.info({
      controller: "webhook/subscriptionActivated",
      message: "OK",
    });
    res.status(200).json("OK");
  } catch (e) {
    createLogger.error({
      controller: "webhook/subscriptionActivated",
      error: (e as Error).message,
    });
    res.status(500).json({ error: "Error updating subscription" });
    return;
  }
}; */

const generatePDF = async (req: any, res: any) => {
  const { lead_id } = req.body;

  const leadResponse = await LeadModel.getById(lead_id);

  if (!leadResponse.success) {
    createLogger.error({
      model: "lead/getBySubscriptionId",
      error: leadResponse.error,
    });
    res.status(500).json({ error: "Error retrieving lead" });
    return;
  }

  const { policy_number, policy_createdate, policy_startdate } =
    leadResponse.data;

  const leadProductResponse = await LeadModel.getProductsById(
    lead_id //leadResponse.data.id
  );

  if (!leadProductResponse.success) {
    createLogger.error({
      model: "lead/getProductsById",
      error: leadProductResponse.error,
    });
    res.status(500).json({ error: "Error retrieving products" });
    return;
  }

  const { product_id, price } = leadProductResponse.data;

  const leadInsuredResponse = await LeadModel.getInsuredById(lead_id);

  if (!leadInsuredResponse.success) {
    createLogger.error({
      model: "lead/getInsuredById",
      error: leadInsuredResponse.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  const insuredResponse = await InsuredModel.getById(
    leadInsuredResponse.data[0].id
  );

  if (!insuredResponse.success) {
    createLogger.error({
      model: "insured/getByIdModel",
      error: insuredResponse.error,
    });
    res.status(500).json({ error: "Error retrieving insured" });
    return;
  }

  const productDescriptionResponse =
    await ProductDescriptionModel.getByProductId(
      lead_id,
      product_id //leadResponse.data.id
    );

  if (!productDescriptionResponse.success) {
    createLogger.error({
      model: "productDescription/getByProductId",
      error: productDescriptionResponse.error,
    });
    res.status(500).json({ error: "Error retrieving product description" });
    return;
  }

  const responseDocuments = await generateDocuments(
    lead_id,
    insuredResponse.data,
    null,
    productDescriptionResponse.data,
    price,
    policy_number,
    policy_createdate,
    policy_startdate
  );

  if (!responseDocuments.success) {
    createLogger.error({
      model: responseDocuments.model,
      error: responseDocuments.error,
    });
    res.status(500).json({ error: "Error creating response document" });
    return;
  }

  createLogger.info({
    controller: "webhook/subscriptionActivated",
    message: "OK",
  });
  res.status(200).json("OK");
};

const generateDocuments = async (
  lead_id: string,
  customer: any,
  company: any,
  productDescription: any,
  price: number,
  policy_number: number,
  policy_createdate: string,
  policy_startdate: string
) => {
  try {
    const correlative = `${new Date().getFullYear()}-${lead_id.split("-")[lead_id.split("-").length - 1]
      }`;

    createLogger.info({
      url: config.pdf.URL.contract,
      method: "POST",
      body: {
        lead_id,
        correlative,
        contact: {
          phone: "600 0860 580",
          email: "info@serviclick.cl",
        },
        customer,
        company,
        plan: {
          name: productDescription.name,
          coverages: productDescription.assistances
            .map((assistance: any) => assistance.name)
            .join(", "),
          price,
        },
      },
      params: "",
      query: "",
    });

    const contractResponse: any = await axios.post(
      config.pdf.URL.contract,
      {
        lead_id,
        correlative,
        contact: {
          phone: "600 0860 580",
          email: "info@serviclick.cl",
        },
        customer,
        company,
        plan: {
          name: productDescription.name,
          coverages: productDescription.assistances
            .map((assistance: any) => assistance.name)
            .join(", "),
          price,
        },
        policy: {
          number: policy_number,
          createdate: policy_createdate,
          startdate: policy_startdate,
        },
      },
      {
        headers: config.pdf.apiKey,
      }
    );

    createLogger.info({
      url: config.pdf.URL.annex,
      method: "POST",
      body: { ...productDescription, lead_id },
      params: "",
      query: "",
    });

    const annexResponse: any = await axios.post(
      config.pdf.URL.annex,
      { ...productDescription, lead_id },
      {
        headers: config.pdf.apiKey,
      }
    );

    return {
      success: true,
      model: "api-pdf",
      error: null,
    };
  } catch (e) {
    return {
      success: false,
      model: "api-pdf",
      error: (e as Error).message,
    };
  }
};



const reveniuWebHook = async (req: any, res: any) => {
  try {
    const { id: cron_id, createddate, subscription_id, event } = req.body;
    if (event === "subscription_activated") {
        const leadResponse = await LeadModel.getDiscountBySubscriptionId(
          createddate,
          subscription_id
        );
  
        if (!leadResponse.success) {
          createLogger.error({
            model: `lead/getDiscountBySubscriptionId`,
            error: leadResponse.error,
          });
          return;
        }
        console.log(leadResponse, "testttleadreponsePolicy verificate")
        const {
          id: lead_id,
          policy_id,
          policy_createdate,
          policy_startdate,
          lack,
          discount_type,
          discount_cicles,
        } = leadResponse.data;
  
        if (!policy_id && discount_type === "t" && discount_cicles > 0) {
          console.log("verificate policy")
          const policyResponse = await Policy.createCron(
            lead_id,
            policy_createdate,
            policy_startdate,
            lack
          );
  
          if (!policyResponse.success) {
            createLogger.error({
              model: `policy/create (1)`,
              error: policyResponse.error,
            });
            return;
          }
  
        }
        
        const paymentReveniuResponse =   await subscriptionActivatedFunction(subscription_id);


        if (!paymentReveniuResponse) {
          createLogger.error({
            model: "subscriptionActivatedFunction(1)",
            error: paymentReveniuResponse,
          });
          return;
        }
        
  
          const cronResponse = await Cron.process(cron_id);
  
          if (!cronResponse.success) {
            createLogger.error({
              model: "cron/process",
              error: cronResponse.error,
            });
            return;
          }
  
          createLogger.info({
            model: "cron/process",
            message: {
              subscription_id,
              date: cronResponse.data.processingdate,
              success: true,
            },
          });
    
    } else if (event === "subscription_payment_succeeded") {
      if (event === "subscription_payment_succeeded") {
        const subscriptionReveniuResponse = await apiReveniu.get(
          `/subscriptions/${subscription_id}`
        );

        if (subscriptionReveniuResponse.status !== 200) {
          createLogger.error({
            model: `reveniu/get/subscription_payment_succeded`,
            error: subscriptionReveniuResponse.statusText,
          });
          return;
        }

        const {
          status: status_id,
          interval: interval_id,
          plan_id,
          plan_amount,
          last_payment,
        } = subscriptionReveniuResponse.data;
        const { date: last_payment_date, status } = last_payment;

        const paymentReveniuResponse = await apiReveniu.get(
          `/subscriptions/${subscription_id}/payments`
        );

        if (!paymentReveniuResponse) {
          createLogger.error({
            url: `${config.reveniu.URL.base}/subscriptions/${subscription_id}/payments`,
            error: paymentReveniuResponse,
          });
          return;
        }

        const { payments } = paymentReveniuResponse.data;
        console.log("payumnts", payments)
        const subscriptionData = {
          subscription_id,
          status_id,
          interval_id,
          plan: {
            id: plan_id,
            amount: plan_amount,
          },
          last_payment: {
            date: moment(last_payment_date).isValid()
              ? moment(last_payment_date).local().format()
              : null,
            success: status === "0",
          },
          payments: payments
            .filter((payment: any) => payment.gateway_response === "Approved")
            .map((payment: any) => {
              return {
                payment_id: payment.id,
                date: moment(payment.issued_on).isValid()
                  ? moment(payment.issued_on).local().format()
                  : null,
                amount: payment.amount,
                buy_order: payment.buy_order,
                credit_card_type: payment.credit_card_type,
                is_recurrent: payment.is_recurrent,
                gateway_response: payment.gateway_response,
              };
            }),
        };

        for (const payment of subscriptionData.payments) {
          if (payment.date) {
            const paymentResponse = await Payment.createPaymentModel(
              payment.payment_id,
              payment.date,
              subscription_id,
              payment.amount,
              payment.buy_order,
              payment.credit_card_type,
              payment.is_recurrent,
              payment.gateway_response
            );

            if (!paymentResponse.success) {
              createLogger.error({
                model: "reveniu/createPaymentModel",
                error: paymentResponse.error,
              });
              return;
            }

            if (paymentResponse.data) {
              const subscriptionResponse = await Subscription.updateLastPaymentCron(
                subscription_id
              );

              if (!subscriptionResponse.success) {
                createLogger.error({
                  model: "subscription/updateLastPayment",
                  error: subscriptionResponse.error,
                });
                return;
              }

              const cronResponse = await Cron.process(cron_id);

              if (!cronResponse.success) {
                createLogger.error({
                  model: "cron/process",
                  error: cronResponse.error,
                });
                return;
              }

              createLogger.info({
                model: "cron/process",
                message: {
                  subscription_id,
                  date: payment.date,
                  success: true,
                },
              });
            }
          }
        }

        const leadResponse = await LeadModel.getPolicyBySubscriptionId(
          subscription_id
        );

        if (!leadResponse.success) {
          createLogger.error({
            model: `lead/getPolicyBySubscriptionId`,
            error: leadResponse.error,
          });
          return;
        }

        const {
          id: lead_id,
          policy_id,
          policy_createdate,
          policy_startdate,
          lack,
        } = leadResponse.data;
        console.log(leadResponse, "2LEAD")
        if (!policy_id) {
          console.log("polres")
          const policyResponse = await Policy.createCron(
            lead_id,
            policy_createdate,
            policy_startdate,
            lack
          );
          console.log("porldasd", policyResponse)
          if (!policyResponse.success) {
            createLogger.error({
              model: `policy/create (2)`,
              error: policyResponse.error,
            });
            return;
          }
          const paymentReveniuResponse = await subscriptionActivatedFunction(subscription_id);

          if (!paymentReveniuResponse) {
            createLogger.error({
              model: "SubscriptionActivatedFunction(2)",
              error: paymentReveniuResponse,
            });
            return;
          }
        }

      }    }

      else if (event === "subscription_deactivated"){
        const leadResponse = await LeadModel.getPolicyBySubscriptionId(
          subscription_id
        );

        if (!leadResponse.success) {
          createLogger.error({
            model: `lead/getPolicyBySubscriptionId`,
            error: leadResponse.error,
          });
          return;
        }

        const {
          id: lead_id,
           } = leadResponse.data;
          const leadUpdatePaymentDeactive = await LeadModel.updatePaymentDeactive(lead_id);
          if (!leadUpdatePaymentDeactive.success) {
            createLogger.error({
              model: "lead/updatePaymentDeactive",
              error: leadUpdatePaymentDeactive.error,
            });
            return;
          }
          const leadInsuredResponse = await LeadModel.getInsuredById(
            lead_id
          );
         
          
          const insuredResponse = await InsuredModel.getById(
            leadInsuredResponse.data[0].id
          );
          if (!insuredResponse.success) {
            createLogger.error({
              model: "insured/getByIdModel",
              error: insuredResponse.error,
            });
            return { success: false, error: "Error retrieving insured" };
          }
          if (!leadInsuredResponse.success) {
            createLogger.error({
              model: "lead/getInsuredById",
              error: leadInsuredResponse.error,
            });
            return { success: false, error: "Error retrieving insured" };
          }
      
    

    createLogger.info({
      url: config.email.URL.send,
      method: "POST",
      body: {
        from: { name: "Bienvenido a ServiClick" },
        to: insuredResponse.data.email,
        subject: "Tus credenciales de acceso a nuestra plataforma",
        message: `<b>Hola&nbsp;${insuredResponse.data.name}</b><br/><br/>Bienvenido a ServiClick,  te detallamos que tu subscripcion a sido desactivada debido al cancelamiento de tu renovación<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        attachments: "",
      },
      params: "",
      query: "",
    });

    const emailResponse: any = await axios.post(
      config.email.URL.send,
      {
        from: { name: "Bienvenido a ServiClick" },
        to: insuredResponse.data.email,
        subject: "Tus credenciales de acceso a nuestra plataforma",
        message: `<b>Hola&nbsp;${insuredResponse.data.name}</b><br/><br/>Bienvenido a ServiClick,  te detallamos que tu subscripcion a sido desactivada debido al cancelamiento de tu renovación<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
        attachments: "",
      },
      {
        headers: config.email.apiKey,
      }
    );
    return
      }
        else if (event === "subscription_renewal_cancelled"){
          const leadResponse = await LeadModel.getPolicyBySubscriptionId(
            subscription_id
          );
  
          if (!leadResponse.success) {
            createLogger.error({
              model: `lead/getPolicyBySubscriptionId`,
              error: leadResponse.error,
            });
            return;
          }
  
          const {
            id: lead_id,
             } = leadResponse.data;
            const leadUpdatePaymentDeactive = await LeadModel.updatePaymentDeactive(lead_id);
            if (!leadUpdatePaymentDeactive.success) {
              createLogger.error({
                model: "lead/updatePaymentDeactive",
                error: leadUpdatePaymentDeactive.error,
              });
              return;
            }
            const leadInsuredResponse = await LeadModel.getInsuredById(
              lead_id
            );
           
            
            const insuredResponse = await InsuredModel.getById(
              leadInsuredResponse.data[0].id
            );
            if (!insuredResponse.success) {
              createLogger.error({
                model: "insured/getByIdModel",
                error: insuredResponse.error,
              });
              return { success: false, error: "Error retrieving insured" };
            }
            if (!leadInsuredResponse.success) {
              createLogger.error({
                model: "lead/getInsuredById",
                error: leadInsuredResponse.error,
              });
              return { success: false, error: "Error retrieving insured" };
            }
        
      

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: insuredResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insuredResponse.data.name}</b><br/><br/>Bienvenido a ServiClick,  te detallamos que tu subscripcion a sido desactivada debido al cancelamiento de tu renovación<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: "",
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: insuredResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insuredResponse.data.name}</b><br/><br/>Bienvenido a ServiClick,  te detallamos que tu subscripcion a sido desactivada debido al cancelamiento de tu renovación<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: "",
        },
        {
          headers: config.email.apiKey,
        }
      );
      return

        }
     

    createLogger.info({
      controller: "reveniu",
      message: "OK",
    });
  } catch (error) {
    createLogger.error({
      controller: "reveniu",
      error: (error as Error).message,
    });
  }
};



const process = async () => {
  try {
    const cronResponse = await Cron.getAll();

    if (!cronResponse.success) {
      createLogger.error({
        model: `cron/getAll`,
        error: cronResponse.error,
      });
      return;
    }

    let subscriptions: ISubscriptionResume[] = [];

    for (const process of cronResponse.data) {
      const { id: cron_id, createddate, subscription_id, event } = process;

      if (event === "subscription_activated") {
        const leadResponse = await LeadModel.getDiscountBySubscriptionId(
          createddate,
          subscription_id
        );

        if (!leadResponse.success) {
          createLogger.error({
            model: `lead/getDiscountBySubscriptionId`,
            error: leadResponse.error,
          });
          return;
        }

        const {
          id: lead_id,
          policy_id,
          policy_createdate,
          policy_startdate,
          lack,
          discount_type,
          discount_cicles,
        } = leadResponse.data;

        if (!policy_id && discount_type === "t" && discount_cicles > 0) {
          const policyResponse = await Policy.create(
            lead_id,
            policy_createdate,
            policy_startdate,
            lack
          );

          if (!policyResponse.success) {
            createLogger.error({
              model: `policy/create (1)`,
              error: policyResponse.error,
            });
            return;
          }

          const paymentReveniuResponse =   await subscriptionActivatedFunction(subscription_id);


          if (!paymentReveniuResponse) {
            createLogger.error({
              url: `https://api.serviclick.cl/api/webHook/subscriptionActivated`,
              error: "error",
            });
            return;
          }
        }

        const cronResponse = await Cron.process(cron_id);

        if (!cronResponse.success) {
          createLogger.error({
            model: "cron/process",
            error: cronResponse.error,
          });
          return;
        }

        createLogger.info({
          model: "cron/process",
          message: {
            subscription_id,
            date: cronResponse.data.processingdate,
            success: true,
          },
        });
      }

      if (event === "subscription_payment_succeeded") {
        const subscriptionReveniuResponse = await apiReveniu.get(
          `/subscriptions/${subscription_id}`
        );

        if (subscriptionReveniuResponse.status !== 200) {
          createLogger.error({
            url: `${config.reveniu.URL.base}/subscriptions/${subscription_id}`,
            error: subscriptionReveniuResponse.statusText,
          });
          return;
        }

        const {
          status: status_id,
          interval: interval_id,
          plan_id,
          plan_amount,
          last_payment,
        } = subscriptionReveniuResponse.data;
        const { date: last_payment_date, status } = last_payment;

        const paymentReveniuResponse = await apiReveniu.get(
          `/subscriptions/${subscription_id}/payments`
        );

        if (paymentReveniuResponse.status !== 200) {
          createLogger.error({
            url: `${config.reveniu.URL.base}/subscriptions/${subscription_id}/payments`,
            error: paymentReveniuResponse.statusText,
          });
          return;
        }

        const { payments } = paymentReveniuResponse.data;

        const subscriptionData = {
          subscription_id,
          status_id,
          interval_id,
          plan: {
            id: plan_id,
            amount: plan_amount,
          },
          last_payment: {
            date: moment(last_payment_date).isValid()
              ? moment(last_payment_date).local().format()
              : null,
            success: status === "0",
          },
          payments: payments
            .filter((payment: any) => payment.gateway_response === "Approved")
            .map((payment: any) => {
              return {
                payment_id: payment.id,
                date: moment(payment.issued_on).isValid()
                  ? moment(payment.issued_on).local().format()
                  : null,
                amount: payment.amount,
                buy_order: payment.buy_order,
                credit_card_type: payment.credit_card_type,
                is_recurrent: payment.is_recurrent,
                gateway_response: payment.gateway_response,
              };
            }),
        };

        for (const payment of subscriptionData.payments) {
          if (payment.date) {
            const paymentResponse = await Payment.createPaymentModel(
              payment.payment_id,
              payment.date,
              subscription_id,
              payment.amount,
              payment.buy_order,
              payment.credit_card_type,
              payment.is_recurrent,
              payment.gateway_response
            );

            if (!paymentResponse.success) {
              createLogger.error({
                model: "reveniu/createPaymentModel",
                error: paymentResponse.error,
              });
              return;
            }

            if (paymentResponse.data) {
              const subscriptionResponse = await Subscription.updateLastPaymentCron(
                subscription_id
              );

              if (!subscriptionResponse.success) {
                createLogger.error({
                  model: "subscription/updateLastPayment",
                  error: subscriptionResponse.error,
                });
                return;
              }

              const cronResponse = await Cron.process(cron_id);

              if (!cronResponse.success) {
                createLogger.error({
                  model: "cron/process",
                  error: cronResponse.error,
                });
                return;
              }

              createLogger.info({
                model: "cron/process",
                message: {
                  subscription_id,
                  date: payment.date,
                  success: true,
                },
              });
            }
          }
        }

        const leadResponse = await LeadModel.getPolicyBySubscriptionId(
          subscription_id
        );

        if (!leadResponse.success) {
          createLogger.error({
            model: `lead/getPolicyBySubscriptionId`,
            error: leadResponse.error,
          });
          return;
        }

        const {
          id: lead_id,
          policy_id,
          policy_createdate,
          policy_startdate,
          lack,
        } = leadResponse.data;

        if (!policy_id) {
          const policyResponse = await Policy.create(
            lead_id,
            policy_createdate,
            policy_startdate,
            lack
          );

          if (!policyResponse.success) {
            createLogger.error({
              model: `policy/create (2)`,
              error: policyResponse.error,
            });
            return;
          }

          const paymentReveniuResponse =   await subscriptionActivatedFunction(subscription_id);


          if (!paymentReveniuResponse ) {
            createLogger.error({
              url: `https://api.serviclick.cl/api/webHook/subscriptionActivated`,
              error: "error 2 subscription activated",
            });
            return;
          }
        }

        subscriptions.push({ subscription_id: subscription_id, payments });
      }
    }

    createLogger.info({
      controller: "reveniu",
      message: "OK",
    });
    return;
  } catch (error) {
    createLogger.error({
      controller: "reveniu",
      error: (error as Error).message,
    });
    return;
  }
};



export { generatePDF, /* subscriptionActivated */ reveniuWebHook, process};



const subscriptionActivatedFunction = async (subscription_id: string,) => {
  try {
    const leadResponse = await LeadModel.getBySubscriptionId(subscription_id);
    if (!leadResponse.success) {
      createLogger.error({
        model: "lead/getBySubscriptionId",
        error: leadResponse.error,
      });
      return  { success: false, error: "Error retrieving lead" }; 
    }

    const {
      id: lead_id,
      company_id,
      policy_id,
      policy_number,
      policy_createdate,
      policy_startdate,
    } = leadResponse.data;

    const leadProductResponse = await LeadModel.getProductsById(
      lead_id //leadResponse.data.id
    );

    if (!leadProductResponse.success) {
      createLogger.error({
        model: "lead/getProductsById",
        error: leadProductResponse.error,
      });
      return { success: false, error: "Error retrieving products " };
    }

    const { product_id, price } = leadProductResponse.data;

    const productDescriptionResponse =
      await ProductDescriptionModel.getByProductId(
        lead_id,
        product_id //leadResponse.data.id
      );

    if (!productDescriptionResponse.success) {
      createLogger.error({
        model: "productDescription/getByProductId",
        error: productDescriptionResponse.error,
      });
      return { success: false, error: "Error retrieving product description" };
    }

    const leadInsuredResponse = await LeadModel.getInsuredById(
      lead_id //leadResponse.data.id
    );

    if (!leadInsuredResponse.success) {
      createLogger.error({
        model: "lead/getInsuredById",
        error: leadInsuredResponse.error,
      });
      return { success: false, error: "Error retrieving insured" };
    }

    if (company_id) {
      const companyResponse = await CompanyModel.getById(company_id);

      if (!companyResponse.success) {
        createLogger.error({
          model: "company/getByIdModel",
          error: companyResponse.error,
        });
        return { success: false, error: "Error retrieving company" };
      }

      const responseDocuments = await generateDocuments(
        lead_id,
        null,
        companyResponse.data,
        productDescriptionResponse.data,
        price * leadInsuredResponse.data.length,
        policy_number,
        policy_createdate,
        policy_startdate
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        return { success: false, error: "Error creating documents" };
      }

      const userCompanyResponse = await UserCompanyModel.create(
        company_id,
        companyResponse.data.email
      );

      if (!userCompanyResponse.success) {
        createLogger.error({
          model: "userCompany/create",
          error: userCompanyResponse.error,
        });
        return { success: false, error: "Error creating user company" };
      }

      const generatedPassword = generateGenericPassword();
      const userCopmpanyResponse = await UserCompanyModel.assignPassword(
        userCompanyResponse.data.id,
        generatedPassword
      );

      if (!userCopmpanyResponse.success) {
        createLogger.error({
          model: "userCompany/assignPassword",
          error: userCopmpanyResponse.error,
        });
        return { success: false, error: "Error assigning password to user company" };
      }

      const attachmentCompany = [
        `contrato_${lead_id}.pdf`,
        `anexo_${lead_id}.pdf`,
      ];

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: companyResponse.data.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${companyResponse.data.companyName}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://empresa.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${companyResponse.data.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentCompany,
        },
        {
          headers: config.email.apiKey,
        }
      );

      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        return { success: false, error: "Error creating email response" };
      }
    }

    const attachmentInsured = [`anexo_${lead_id}.pdf`];

    if (!company_id) {
      const insuredResponse = await InsuredModel.getById(
        leadInsuredResponse.data[0].id
      );

      if (!insuredResponse.success) {
        createLogger.error({
          model: "insured/getByIdModel",
          error: insuredResponse.error,
        });
        return { success: false, error: "Error retrieving insured" };
      }

      const responseDocuments = await generateDocuments(
        lead_id,
        insuredResponse.data,
        null,
        productDescriptionResponse.data,
        price,
        policy_number,
        policy_createdate,
        policy_startdate
      );

      if (!responseDocuments.success) {
        createLogger.error({
          model: responseDocuments.model,
          error: responseDocuments.error,
        });
        return { success: false, error: "Error creating  document" };
      }

      attachmentInsured.push(`contrato_${lead_id}.pdf`);
    }

    type DetailT = {
      insured_id: string;
      error: string;
    };

    const responses: DetailT[] = [];
    leadInsuredResponse.data.map(async (insured: any) => {
      const userInsuredResponse = await UserInsuredModel.create(
        insured.id,
        insured.email
      );

      if (!userInsuredResponse.success) {
        createLogger.error({
          model: "userInsured/create",
          error: userInsuredResponse.error,
        });

        responses.push({
          insured_id: insured.id,
          error: "User error: " + userInsuredResponse.error,
        });
      }

      const generatedPassword = generateGenericPassword();
      const userPasswordResponse = await UserInsuredModel.assignPassword(
        userInsuredResponse.data.id,
        generatedPassword
      );

      if (!userPasswordResponse.success) {
        createLogger.error({
          model: "userInsured/assignPassword",
          error: userPasswordResponse.error,
        });
        responses.push({
          insured_id: insured.id,
          error: "Password error: " + userPasswordResponse.error,
        });
      }

      createLogger.info({
        url: config.email.URL.send,
        method: "POST",
        body: {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
        },
        params: "",
        query: "",
      });

      const emailResponse: any = await axios.post(
        config.email.URL.send,
        {
          from: { name: "Bienvenido a ServiClick" },
          to: insured.email,
          subject: "Tus credenciales de acceso a nuestra plataforma",
          message: `<b>Hola&nbsp;${insured.name}</b><br/><br/>Bienvenido a ServiClick, a continuación te detallamos los datos de acceso a nuestra plataforma para que puedas completar o modificar la información que requieras:<br/><br/><b>https://asegurado.serviclick.cl</b><br/><br/><b>Login:</b>&nbsp;${insured.email}<br/><b>Password</b>:&nbsp;${generatedPassword}<br/><br/><b>Saludos cordiales,</b><br/><br/><b>Equipo ServiClick</b>`,
          attachments: attachmentInsured,
        },
        {
          headers: config.email.apiKey,
        }
      );
      if (!emailResponse.data.success) {
        createLogger.error({
          model: "email",
          error: emailResponse.error,
        });
        return { success: false, error: "Error creating email" };
      }
    });

    if (responses.length > 0) {
      return responses;
      
    }

    createLogger.info({
      controller: "webhook/subscriptionActivated",
      message: "OK",
    });
    return { success: true, error: null };
  } catch (e) {
    createLogger.error({
      controller: "webhook/subscriptionActivated",
      error: (e as Error).message,
    });
    return { success: false, error: "Error updating subscription" };
  }

}