import { Router } from "express";

const router = Router();

router.use("*", (req, res) => {
  res.status(404).json({
    message: "Verify the endpoints",
    url: req.originalUrl,
    method: req.method,
  });
});

export default router;