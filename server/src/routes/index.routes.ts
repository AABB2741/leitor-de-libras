import { Router } from "express";

import userRoutes from "./user.routes";
import translationRoutes from "./translation.routes";
import uploadRoutes from "./upload.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/translations", translationRoutes);
router.use("/upload", uploadRoutes);

export default router;
