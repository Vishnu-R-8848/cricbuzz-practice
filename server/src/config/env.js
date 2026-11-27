import dotenv from "dotenv";
dotenv.config();
import { z } from "zod";
import appConstants from "../constant/app.constants.js";

const envSchema = z.object({
  PORT: z.coerce.number().default(appConstants.PORT),
  MONGO_URI: z.string().default(appConstants.MONGO_URI),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default(appConstants.NODE_ENV),
  LOGGER_LEVEL: z.string().default(appConstants.LOGGER_LEVEL),
  CORS_ORIGIN: z.string(),
  RATELIMIT_WINDOWMS: z.coerce
    .number()
    .default(appConstants.RATELIMIT_WINDOWMS),
  RATELIMIT: z.coerce.number().default(appConstants.RATELIMIT),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CALLBACK_URL: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REDIRECT_URL: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export default parsed.data;
