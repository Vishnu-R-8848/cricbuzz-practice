import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import appConstants from "../constant/app.constants";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstants.PORT),
  MONGO_URI: z.string().default(appConstants.MONGO_URI),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default(appConstants.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstants.LOGGER_LEVEL),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export default parsed.data;
