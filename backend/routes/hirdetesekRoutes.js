import express from "express";
import { getAllHirdetesek, getHirdetesById, createHirdetes, updateHirdetes, deleteHirdetes } from "../controllers/hirdetesekController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import multer from 'multer';

const router = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({ storage: storage });
  

router.get("/", getAllHirdetesek);
router.get("/:id", getHirdetesById);
router.post("/", authenticateToken, upload.array('kepek', 10), createHirdetes); // Fájlok fogadása
router.put("/:id", authenticateToken, updateHirdetes);
router.delete("/:id", authenticateToken, deleteHirdetes);

export default router;