import express from "express";
import logger from "./utils/logger.js";
import routes from "./routes.js";
import { config } from "dotenv";
import "./whatsappClient/message.js";

config();

const app = express();

app.use(logger);
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});

app.use("/api", routes);