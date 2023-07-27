import { Router } from "express";
import bot from "./controller/bot.js";

const router = Router();

router.get("/bot", bot);

router.use("*", (req, res) => {
  res.status(404).json({
    message: "Verify the endpoints",
    url: req.originalUrl,
    method: req.method,
  });
});

export default router;