import config from "../util/config";

const auth = (req: any, res: any, next: any) => {
  const { apiKey } = config;
  if (req.headers.id !== apiKey) {
    res.status(401).json({ message: "No autorizado" });
  } else {
    return next();
  }
};

export default auth;
