import "dotenv/config";
import express from "express";
import { createUploadthingExpressHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import cors from "cors";

const app = express();
app.use("*", cors());

app.use((req, res, next) => {
  next();
});

app.use(
  "/api/uploadthing",
  createUploadthingExpressHandler({
    router: uploadRouter,
  })
);
const PORT = process.env.API_PORT || 3019;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
