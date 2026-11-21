import express from "express";
import env from "./config/env.js";
import morgan from "morgan";

function createApp() {
  const app = express();

  app.use(express.json());
  if (env.NODE_ENV === "development") app.use(morgan("dev"));

  return app;
}

export default createApp;
