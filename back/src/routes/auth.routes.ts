import express from "express";
import authServices from "../controllers/auth.controller";
import verifyToken from "../middlewares/authentication";
import verifySession from "../middlewares/session";

const router = express.Router();

router.post("/signup", authServices.signup);
router.post("/signin", authServices.signin);
router.get("/refresh", verifySession, authServices.refreshAccessToken);
router.get("/user", verifyToken, verifySession, authServices.getUser);
router.get("/signout", authServices.signout);

export default router;
