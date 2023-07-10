import { Router } from "express";

const router = Router();

router.post("/booking", () => {});

router.get("/booking", (req, res) => {
  res.json({ message: "hello" });
});
router.get("/booking/:id", () => {});
router.put("/booking/:id", () => {});
router.delete("/booking/:id", () => {});

router.post("/review", () => {});

export default router;
