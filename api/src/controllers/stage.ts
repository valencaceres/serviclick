import createLogger from "../util/logger";

import * as Stage from "../models/stage";

const createStage = async (req: any, res: any) => {
  const { name } = req.body;

  const stageResponse = await Stage.createStage(name);

  if (!stageResponse.success) {
    createLogger.error({
      model: "stage/createStage",
      error: stageResponse.error,
    });
    res.status(500).json({ error: stageResponse.error });
    return;
  }

  createLogger.info({
    controller: "stage",
    message: "OK",
  });
  res.status(200).json(stageResponse.data);
};

const updateStage = async (req: any, res: any) => {
  const { id } = req.params;
  const { name } = req.body;

  const stageResponse = await Stage.updateStage(id, name);
  if (!stageResponse.success) {
    createLogger.error({
      model: "stage/updateStage",
      error: stageResponse.error,
    });
    res.status(500).json({ error: stageResponse.error });
    return;
  }

  createLogger.info({
    controller: "stage",
    message: "OK",
  });
  res.status(200).json(stageResponse.data);
};

const deleteStage = async (req: any, res: any) => {
  const { id } = req.params;
  const stageResponse = await Stage.deleteStage(id);

  if (!stageResponse.success) {
    createLogger.error({
      model: "stage/deleteStage",
      error: stageResponse.error,
    });
    res.status(500).json({ error: stageResponse.error });
    return;
  }

  createLogger.info({
    controller: "stage",
    message: "OK",
  });
  res.status(200).json(stageResponse.data);
};

const getAllStages = async (req: any, res: any) => {
  const stageResponse = await Stage.getAllStages();

  if (!stageResponse.success) {
    createLogger.error({
      model: "stage/getAllStages",
      error: stageResponse.error,
    });
    res.status(500).json({ error: stageResponse.error });
    return;
  }

  createLogger.info({
    controller: "stage/getAllStages",
    message: "OK",
  });
  res.status(200).json(stageResponse.data);
};

const getStage = async (req: any, res: any) => {
  const { id } = req.params;
  const stageResponse = await Stage.getStage(id);

  if (!stageResponse.success) {
    createLogger.error({
      model: "stage/getStage",
      error: stageResponse.error,
    });
    res.status(500).json({ error: stageResponse.error });
    return;
  }

  createLogger.info({
    controller: "stage",
    message: "OK",
  });
  res.status(200).json(stageResponse.data);
};

export { createStage, updateStage, deleteStage, getStage, getAllStages };
