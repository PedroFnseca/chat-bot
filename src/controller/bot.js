import { Router } from "express";
import chatbotGreetins from "../service/greetins.js";

const bot = Router();

bot.get("/:message", async (req, res) => {
  const { message } = req.params;

  if (!message) {
    res.status(400).json({
      message: "Message not found",
    });
  }

  try {
    const response = await chatbotGreetins(message);
    
    res.status(200).json({
      message: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default bot;