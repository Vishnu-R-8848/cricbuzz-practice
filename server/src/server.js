import createApp from "./app.js";
import env from "./config/env.js";
import logger from "./config/logger.js";
import { connectDB } from "./database/mongoDB.js";

const app = createApp();

function startServer() {
  connectDB().then(() => {
    app.listen(env.PORT, () => {
      logger.info(`server is running on port: ${env.PORT}`);
    });
  }).catch((err)=>{
    logger.error({ err}, "error while running server..!")
  })
}

startServer();
