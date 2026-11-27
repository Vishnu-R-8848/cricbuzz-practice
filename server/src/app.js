import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import securityMiddleware from "./middleware/security.middleware.js";
import googleOAuthMiddleware from "./middleware/googleOAuth.middleware.js";
import authRouter from "./modules/auth/auth.routes.js";

function createApp() {
  const app = express();

  securityMiddleware(app);

  googleOAuthMiddleware(app);

  if (env.NODE_ENV === "development") app.use(morgan("dev"));

  app.use("/api/auth", authRouter);

  app.get("/health", (_req, res) => {
    res.json({
      message: "Healthy",
    });
  });

  return app;
}

export default createApp;
