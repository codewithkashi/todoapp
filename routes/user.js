import express from "express";
import { login, register, getMyProfile, logout } from "../controllers/user.js";
const router = express.Router()
router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", getMyProfile)
export default router