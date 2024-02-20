import "dotenv/config";
import { Router, Request, Response } from "express";
import multer from 'multer'
import storage from "../utils/s3";

const router = Router();
const upload = multer({
  storage: storage
});

router.get(
  '/',
  (_req: Request, res: Response) => {
    res.json({ message: "Salaam 3alayk, Walaalka!" })
    res.status(200);
    res.end();
  }
);

router.post(
  '/',
  upload.single('file'),
  (req: Request, res: Response) => {
    console.log("TRANSLATE: file\n", req.file, "\nbody", req.body);
    res.json({ message: "success" });
    res.status(200);
    res.end();
  }
);

router.use((err, _req, res, _next) => {
  console.error("TRANSLATE: \n", err.stack);
  res.status(401).send('Unauthenticated!');
});

export default router;
