import createLogger from "../util/logger";

const clerkController = async (req: any, res: any) => {
  try {
    const { data } = req.body;

    createLogger.info({
      controller: "clerk",
      data,
    });

    res.status(200).json(true);
  } catch (error) {
    createLogger.error({
      controller: "clerk",
      error: (error as Error).message,
    });
    res.status(500).json({ error });
    return;
  }
};

export { clerkController };
