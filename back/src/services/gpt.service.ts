/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadModel, createCompletionStream } from "gpt4all";
import ChatModel, { IChatDocument } from "../models/chat.model";
import { IUserPreferences } from "../models/userPreferences.model";
import logger from "../middlewares/winston";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";

class GPTService {
  private model: any;
  private chatSessions: Map<string, any> = new Map();

  constructor() {
    this.initializeModel();
  }

  async initializeModel(): Promise<void> {
    if (!this.model) {
      this.model = await loadModel("Meta-Llama-3-8B-Instruct.Q4_0.gguf", {
        verbose: false,
        device: "cpu",
        nCtx: 2048,
      });
      logger.info("Model loaded and ready to use!");
    } else {
      logger.info("model is already initialized");
    }

    // // Create a chat session
    // this.chat = await this.model.createChatSession({
    //   temperature: 0.8,
    //   systemPrompt: this.systemMessage,
    // });
    // console.log("chat ready to use");
  }
  async createChatSession(
    chef_name: string,
    preferences: IUserPreferences,
    userId: string,
    chatId?: string
  ): Promise<string> {
    const {
      vegetarian,
      vegan,
      glutenFree,
      dairyFree,
      healthy,
      likes,
      dislikes,
    } = preferences;
    const preferenceDescription = `
    Preferences:
    - Vegetarian: ${vegetarian ? "Yes" : "No"}
    - Vegan: ${vegan ? "Yes" : "No"}
    - Gluten-Free: ${glutenFree ? "Yes" : "No"}
    - Dairy-Free: ${dairyFree ? "Yes" : "No"}
    - Healthy Choices: ${healthy ? "Yes" : "No"}
    - Likes: ${likes.length ? likes.join(", ") : "None"}
    - Dislikes: ${dislikes.length ? dislikes.join(", ") : "None"}
  `;
    let systemMessage = `You are ${chef_name}, a world-renowned chef. Respond with the same attitude, expertise, and style as ${chef_name} would, and feel free to use strong language. 
  You have been asked to prepare a meal for a customer with the following dietary preferences:
  ${preferenceDescription}
  Use this information to suggest meals and interact with the user.`;

    let id;

    if (chatId) {
      id = chatId;
      // Retrieve the chat session for the user
      const chatDocument = await ChatModel.findOne({
        chat_session_id: chatId,
        user: userId,
      });
      if (!chatDocument) {
        throw new Error("Chat not found.");
      }

      // add previous messages to system message in this format "user: message" or "assistant: message"
      const messages = chatDocument.messages.map(
        (message) => `${message.role}: ${message.content}`
      );

      systemMessage = `${systemMessage}\n\n These are the previous messages between you and the user: \n${messages.join("\n")} \n \n make sure to use this information to continue the conversation.`;
    } else {
      const newChatId = uuidv4();
      id = newChatId;

      const chatDocument = new ChatModel({
        user: userId,
        messages: [],
        chat_session_id: newChatId,
      });
      await chatDocument.save();
    }
    const chat = await this.model.createChatSession({
      temperature: 0.8,
      systemPrompt: systemMessage,
    });
    this.chatSessions.set(`${id}_${userId}`, chat);
    logger.info(`Chat session for user ${userId} is ready to use.`);
    return id;
  }
  async generateResponse(
    message: string,
    userId: string,
    res: Response,
    chatId: string
  ): Promise<void> {
    const chat = this.chatSessions.get(`${chatId}_${userId}`);
    if (!this.model || !chat) {
      throw new Error("Model or chat session is not initialized.");
    }

    const chatDocument = await ChatModel.findOne({ chat_session_id: chatId });
    if (!chatDocument) {
      throw new Error("Chat not found.");
    }

    // Append user input to chat history
    chatDocument.messages.push({ role: "user", content: message });

    // Create a completion using the chat session
    logger.info("generating completion");
    const stream = createCompletionStream(chat, message);

    // Start streaming the response
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    let result: any;
    let streamEnded: boolean = false;
    stream.tokens.on("data", (data: any) => {
      logger.info(`Received chunk: ${data}`);
      res.write(data); // Write each chunk to the HTTP response stream
    });

    stream.tokens.on("end", async () => {
      if (streamEnded) return;
      streamEnded = true;
      result = await stream.result;
      logger.info("Stream finished");
      logger.info(JSON.stringify(result, null, 2));
      res.end(); // Signal that the stream is complete
      // Wait for the completion to finish
      chatDocument.messages.push({
        role: "assistant",
        content: result.choices[0].message.content.toString(),
      });
      await chatDocument.save(); // Save the completed chat to the database
    });
    stream.tokens.on("error", (error: any) => {
      logger.error("Error during streaming", error);
      res.status(500).send({ error: "Error generating response" });
    });
  }

  async getChatHistory(
    userId: string,
    chatId: string
  ): Promise<IChatDocument | null> {
    return await ChatModel.findById(chatId).where({ user: userId });
    // .populate("user");
  }

  async getUserChats(userId: string): Promise<IChatDocument[]> {
    return await ChatModel.find({ user: userId });
  }

  async disposeModel(): Promise<void> {
    if (this.model) {
      await this.model.dispose();
      logger.info("Model disposed.");
    }
  }
}

export default new GPTService();
