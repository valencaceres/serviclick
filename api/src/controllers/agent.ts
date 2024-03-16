import createLogger from "../util/logger";
import * as Agent from "../models/agent";
import * as Product from "./product";

const createAgent = async (req: any, res: any) => {
  const { channel_id, name } = req.body;
  const agentResponse = await Agent.createAgent(channel_id, name);

  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/createAgent",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error creating agent" });
    return;
  }

  createLogger.info({
    controller: "agent",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

const updateAgent = async (req: any, res: any) => {
  const { id } = req.params;
  const { channel_id, name } = req.body;
  const agentResponse = await Agent.updateAgent(id, channel_id, name);

  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/updateAgent",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error updating agent" });
    return;
  }

  createLogger.info({
    controller: "agent",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

const deleteAgent = async (req: any, res: any) => {
  const { id } = req.params;
  const agentResponse = await Agent.deleteAgent(id);

  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/deleteAgent",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error deleting agent" });
    return;
  }

  createLogger.info({
    controller: "agent",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

const listAgents = async (req: any, res: any) => {
  const { channel_id } = req.params;
  const agentResponse = await Agent.listAgents(channel_id);

  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/listAgents",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error listing agents" });
    return;
  }

  createLogger.info({
    controller: "agent",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

const getProcessById = async (req: any, res: any) => {
  const { id } = req.params;
  const agentResponse = await Agent.getProcessById(id);
  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/getProcessById",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error getting process" });
    return;
  }

  createLogger.info({
    controller: "agent/getProcessById",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const agentResponse = await Agent.getById(id);

  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/getById",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error getting agent" });
    return;
  }

  createLogger.info({
    controller: "agent/getById",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
};


const getDataById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { success, model, data, error, status } = await getAgentDataById(id);

    if (!success) {
      createLogger.error({
        model,
        error,
      });
      res.status(status).json({ error: "error retrieving agent" });
      return;
    }

    res.status(status).json(data);
    return;
  } catch (error) {
    createLogger.error({
      controller: "agent/getDataById",
      error: (error as Error).message,
    });
    res.status(500).json({ error: "error retrieving agent" });
    return;
  }
};


const postAgentProductPlan = async (req: any, res: any) => {
  const { id} = req.params;
  const agentResponse = await Agent.postAgentProductPlan(id);
  console.log("id:", id)
 console.log(agentResponse, "data")
  if (!agentResponse.success) {
    createLogger.error({
      model: "agent/postAgentProductPlan",
      error: agentResponse.error,
    });
    res.status(500).json({ error: "Error creating agent product plan" });
    return;
  }

  createLogger.info({
    controller: "agent",
    message: "OK",
  });
  res.status(200).json(agentResponse.data);
}


const addProduct = async (req: any, res: any) => {
  const {
    id: agent_id,
   product:{
    product_id,
    price,
    discount,
    beneficiary_price,
    pdfbase64
   } 
  } = req.body;
const responsePlans = await Product.createProductPlans(product_id,
  agent_id,
  price.base,
  price.customer,
  price.company,
  price.yearlyprice,
  discount,
  beneficiary_price)
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
  
  const agentProductResponse = await Agent.addProduct(
    agent_id,
    product_id,
    responsePlans?.data?.customer?.id || null,
    responsePlans?.data?.company?.id || null,
    responsePlans?.data?.yearly?.id || null,
    price
  )
    
    if (!agentProductResponse.success) {
      createLogger.error({
        model: "agentProduct/create",
        error: agentProductResponse.error,
      });
      res.status(500).json({ error: "Error creating agent product" });
      return;
    }
        if (pdfbase64 && pdfbase64 != "") {
          let response;
          if (responsePlans.data?.customer?.product_plan_id && responsePlans.data?.yearly?.product_plan_id) {
            response = await Product.insertPdf(responsePlans.data.customer.product_plan_id, pdfbase64);
          } else if (responsePlans.data?.customer?.product_plan_id) {
            response = await Product.insertPdf(responsePlans.data.customer.product_plan_id, pdfbase64);
          } else if (responsePlans.data?.yearly?.product_plan_id) {
            response = await Product.insertPdf( responsePlans.data.yearly.product_plan_id, pdfbase64);
          } 
        
          if (!response || !response.success) {
            createLogger.error({
              model: "agentProduct/InsertPdf",
              error: response ? response.error : "No response received",
            });
            res.status(500).json({ error: "Error inserting pdf" });
            return;
          }
        }
    const agentProducts = await Agent.getProductsByAgentId(agent_id);
  if (!agentProducts.success) {
    createLogger.error({
      model: "agentProduct/getByAgentId",
      error: agentProducts.error,
    }); 
    res.status(500).json({ error: "Error retrieving agent product" });
    return;
  }
  

  res.status(200).json(agentProducts.data);
}; 


export { createAgent, updateAgent, deleteAgent, listAgents, getProcessById, getById , getDataById, postAgentProductPlan, addProduct};




export const getAgentDataById = async (id: string) => {
  try {
    const agentResponse = await Agent.getById(id);
    if (!agentResponse.success) {
      return {
        success: false,
        model: "agent/getById",
        data: null,
        error: "error retrieving agent",
        status: 500,
      };
    }

    if (!agentResponse.data) {
      return {
        success: true,
        model: "agent/getById",
        data: {},
        error: "error retrieving agent",
        status: 404,
      };
    }

    const agentProductResponse = await Agent.getProductsByAgentId(id);
    if (!agentProductResponse.success) {
      return {
        success: false,
        model: "agent/getProductsByAgentId",
        data: null,
        error: "error retrieving agent products",
        status: 500,
      };
    }



    const {

      name,
      fantasyname,
      channel_id,
    } = agentResponse.data;

    const data = {
      agent:{
        id,
        channel_id,
        name,
        fantasyname,
      }
     ,
      products: agentProductResponse.data,
    };

    return {
      success: true,
      controller: "agent/getById",
      data,
      error: null,
      status: 200,
    };
  } catch (e) {
    return {
      success: false,
      model: "agent/getById",
      data: null,
      error: "error retrieving agent",
      status: 500,
    };
  }
};