import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "../../../api-uploadthing/src/uploadthing";
import { config } from "./config";
export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: `${config.uploadthing}`,
});
