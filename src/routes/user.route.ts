import express from "express";
import { createUser, getUsers, confirmationUser, loginUser, sendUserConfirmationEmail, forgotPassword, resetPassword } from "../controllers/user.controller";

const router = express.Router();

router.get("/confirmation", confirmationUser);
router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/resend_confirmation", sendUserConfirmationEmail)
router.post("/forgot_password", forgotPassword)
router.post("/reset_password", resetPassword)
router.post("/", createUser);

export default router;
