import { Router } from "express";
import { authController } from "./auth.controller.js";

const router: Router = Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.delete("/delete", authController.deleteUser);
router.patch("/user/:id", authController.updatedUser);
router.get("/users", authController.getAllUsers);

export const authRoutes = router;
