import { Router } from "express";
import {
  getAllLocal,
  getLocal,
  createLocal,
  updateLocal,
  deleteLocal,
} from "../controllers/local.controller";

const router = Router();

router.get("/", getAllLocal);
router.get("/:id", getLocal);
router.post("/", createLocal);
router.put("/:id", updateLocal);
router.delete("/:id", deleteLocal);

export default router;
