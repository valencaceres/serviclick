import createLogger from "../util/logger";
import * as Agent from "../models/agent";

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


export { createAgent, updateAgent, deleteAgent, listAgents, getProcessById, getById };
