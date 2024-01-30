import createLogger from "../util/logger";
import * as User from "../models/user";

const createUser = async (req: any, res: any) => {
  const { name, email, retail_id, password } = req.body;
  const userResponse = await User.create(name, email, retail_id, password);

  if (!userResponse.success) {
    createLogger.error({
      model: "user/create",
      error: userResponse.error,
    });
    res.status(500).json({ error: "Error creating user" });
    return;
  }

  createLogger.info({
    controller: "user/create",
    message: "OK",
  });
  res.status(200).json(userResponse.data);
};

export { createUser };
