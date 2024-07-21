import "dotenv/config";
import { Router } from "express";
import translate from "../controller/translate";

const router = Router();

router.post('/', translate);

export default router;
