import mongoose, { Document, Schema } from "mongoose";

interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface IChat {
  user: mongoose.Types.ObjectId; // Reference to the User model
  messages: IMessage[]; // Array of messages in the chat
  chat_session_id?: string; // ID of the chat session
  created_at?: Date;
  updated_at?: Date;
}

export interface IChatDocument extends IChat, Document {}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Chat schema definition
const chatSchema = new Schema<IChatDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [messageSchema],
    chat_session_id: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

// Export the model
const ChatModel = mongoose.model<IChatDocument>("Chat", chatSchema);

export default ChatModel;
