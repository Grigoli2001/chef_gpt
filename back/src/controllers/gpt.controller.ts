import { Request, Response } from "express";
import GPTService from "../services/gpt.service";
import userPreferences, {
  IUserPreferencesDocument,
} from "../models/userPreferences.model";
import statusCodes from "../constants/statusCodes";
// import logger from "../middlewares/winston";

class GPTController {
  async getChatResponse(req: Request, res: Response): Promise<Response> {
    const { message, chatId } = req.body;
    const userId = req.session?.user?._id;

    if (!message || !chatId) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      await GPTService.generateResponse(message, userId, res, chatId);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to process request", error: error.message });
    }
  }

  async createChat(req: Request, res: Response): Promise<Response> {
    const userId = req.session?.user?._id;
    const { chef_name, chatId } = req.body;

    const preferences: IUserPreferencesDocument | null =
      await userPreferences.findOne({
        user: userId,
      });

    try {
      const sessionId = await GPTService.createChatSession(
        chef_name,
        preferences,
        userId,
        chatId,
      );
      return res
        .status(statusCodes.success)
        .json({ message: "created a chat", sessionId });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to create chat", error: error.message });
    }
  }

  async getChatHistory(req: Request, res: Response): Promise<Response> {
    const userId = req.session?.user?._id;
    if (!userId) {
      return res.status(401).json({
        error:
          "You aren't authenticated and shouldn't have bypassed the middleware",
      });
    }
    const { chatId } = req.params;

    try {
      const chatHistory = await GPTService.getChatHistory(userId, chatId);
      return res.json({ chatHistory });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve chat history" + error });
    }
  }

  async getUserChats(req: Request, res: Response): Promise<Response> {
    const userId = req.session.user._id;

    try {
      const chats = await GPTService.getUserChats(userId);
      return res.json({ chats });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve chats", error });
    }
  }
}

export default new GPTController();
