import { Router } from "express";
import tf from "@tensorflow/tfjs";
import use from "@tensorflow-models/universal-sentence-encoder";

const bot = Router();

bot.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World",
  });
});

export default bot;