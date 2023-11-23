import createLogger from "../util/logger";

import * as Web from "../models/web";

const getHero = async (req: any, res: any) => {
  const response = await Web.getAllHero();

  if (!response.success) {
    createLogger.error({
      model: "web/getHero",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving hero" });
    return;
  }

  createLogger.info({
    controller: "hero",
    message: "OK",
  });
  return res.status(200).json(response.data);
};

const getNews = async (req: any, res: any) => {
  const response = await Web.getAllNews();

  if (!response.success) {
    createLogger.error({
      model: "web/getNews",
      error: response.error,
    });
    res.status(500).json({ error: "Error retrieving news" });
    return;
  }

  createLogger.info({
    controller: "news",
    message: "OK",
  });
  return res.status(200).json(response.data);
};

export { getHero, getNews };
