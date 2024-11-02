import { Router } from "express";
import GPTController from "../controllers/gpt.controller";
import verifySession from "../middlewares/session";
import verifyToken from "../middlewares/authentication";

const router = Router();

router.post("/chat", verifyToken, verifySession, GPTController.createChat);
router.post(
  "/chatResponse",
  verifyToken,
  verifySession,
  GPTController.getChatResponse
);
router.get(
  "/chat/history/:chatId",
  verifyToken,
  verifySession,
  GPTController.getChatHistory
);
router.get("/chats", verifyToken, verifySession, GPTController.getUserChats);

export default router;
