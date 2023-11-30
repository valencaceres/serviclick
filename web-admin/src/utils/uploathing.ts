import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { OurFileRouter } from "../uploadthing";
import { config } from "./config";
export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: `${config.uploadthing}`,
});
