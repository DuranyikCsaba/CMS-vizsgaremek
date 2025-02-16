import express from "express";
import { getAllHirdetesek, getHirdetesById, createHirdetes, updateHirdetes, deleteHirdetes } from "../controllers/hirdetesekController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllHirdetesek);
router.get("/:id", getHirdetesById);
router.post("/", authenticateToken, createHirdetes);
router.put("/:id", authenticateToken, updateHirdetes);
router.delete("/:id", authenticateToken, deleteHirdetes);

export default router;