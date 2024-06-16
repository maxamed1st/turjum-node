import "dotenv/config";
import { Router } from "express";
import translate from "../controller/translate";

const router = Router();

router.get('/', translate);

router.post("/", (_req, res) => {
  res.json("walaalka");
  res.end();
})

export default router;
