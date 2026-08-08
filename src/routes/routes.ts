import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";

const router: Router = Router();

// Auth routes
router.use("/auth", authRoutes);

export default router;
