import { Router } from "express";

import userRoutes from "./user.routes";
import translationRoutes from "./translation.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/translations", translationRoutes);

export default router;
