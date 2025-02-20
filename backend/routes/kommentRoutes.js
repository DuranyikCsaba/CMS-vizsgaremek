import { Router } from "express";
import kommentController from "../controllers/kommentController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const KommentRouter = Router();

KommentRouter.post("/", authenticateToken, kommentController.KommentPost);
KommentRouter.get("/:posztId", kommentController.KommentGet);
KommentRouter.delete("/:id", authenticateToken, kommentController.KommentIdDelete);
KommentRouter.patch("/:id", authenticateToken, kommentController.KommentIdPatch);

export default KommentRouter;