import { Router } from "express";
import posztController from "../controllers/forumController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const PosztRouter = Router();

PosztRouter.post("/", authenticateToken, posztController.PosztPost);
PosztRouter.get("/", posztController.PosztGet);
PosztRouter.delete("/:id", authenticateToken, posztController.PosztIdDelete);
PosztRouter.patch("/:id", authenticateToken, posztController.PosztIdPatch);
PosztRouter.get("/:id", posztController.PosztIdGet); 

export default PosztRouter;