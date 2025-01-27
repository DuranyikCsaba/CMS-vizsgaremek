import {express} from "express";
import hirdetesekController from "../controllers/hirdetesekController";
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.router();

router.get('/', hirdetesekController.getAll); 
router.get('/:id', hirdetesekController.getById); 
router.post('/', hirdetesekController.create); 
router.put('/:id', hirdetesekController.update); 
router.delete('/:id',hirdetesekController.delete); 

export default router;