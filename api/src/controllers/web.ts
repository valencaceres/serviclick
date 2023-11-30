import createLogger from "../util/logger";

import * as Web from "../models/web";

const getItems = async (req: any, res: any) => {
  const { type } = req.query;
  const response = await Web.getAllItems(type);
  if (!response.success) {
    createLogger.error({
      model: "web/getItems",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving items" });
    return;
  }
  const responseData = {
    data: response.data,
  };
  createLogger.info({
    controller: "web",
    message: "OK",
  });
  return res.status(200).json(responseData);
};
const createItem = async (req: any, res: any) => {
  const { url, alt, text, link, category_id, family_id, button_text } = req.body;
  const { type } = req.query;

  const response = await Web.createItem(
    type,
    url,
    alt,
    text,
    link,
    category_id,
    family_id,
    button_text
  );

  if (!response.success) {
    createLogger.error({
      model: "web/createItem",
      error: response.error,
    });
    res.status(500).json({ error: "Error creating item" });
    return;
  }

  createLogger.info({
    controller: "web",
    message: "OK",
  });
  return res.status(200).json(response.data);
};
const updateItem = async (req: any, res: any) => {
  const { id, alt, text, link, category_id, family_id, button_text } = req.body;

  const { type } = req.query;
  const response = await Web.updateItem(
    id,
    alt,
    text,
    type,
    link,
    category_id,
    family_id,
    button_text
  );
  if (!response.success) {
    createLogger.error({
      model: "web/updateItem",
      error: response.error,
    });
    res.status(500).json({ error: "Error updating item" });
    return;
  }

  createLogger.info({
    controller: "web",
    message: "OK",
  });
  return res.status(200).json(response.data);
};

const orderItem = async (req: any, res: any) => {
  const { heroArray } = req.body;
  const { type } = req.query;
  const response = await Web.orderItem(heroArray, type);
  if (!response.success) {
    createLogger.error({
      model: "web/orderItem",
      error: response.error,
    });
    res.status(500).json({ error: "Error ordering item" });
    return;
  }

  createLogger.info({
    controller: "web",
    message: "OK",
  });
  return res.status(200).json(response.data);
};
const deleteItem = async (req: any, res: any) => {
  const { id } = req.params;
  const { type } = req.query;
  const response = await Web.deleteItemById(id, type);
  if (!response.success) {
    createLogger.error({
      model: "web/deleteItemById",
      error: response.error,
    });
    res.status(500).json({ error: "Error deleting item" });
    return;
  }

  createLogger.info({
    controller: "web/deleteItemById",
    message: "OK",
  });
  res.status(200).json(response.data);
};

export { getItems, createItem, deleteItem, orderItem, updateItem };
