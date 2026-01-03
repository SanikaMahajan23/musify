import express from "express";

const router = express.Router();

// test route
router.get("/health", (req, res) => {
  res.json({ status: "API is running 🚀" });
});

export default router;
