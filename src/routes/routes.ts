import express, { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes.js";

const router: Router = express.Router();

router.use("/auth", authRoutes);

export default router;
