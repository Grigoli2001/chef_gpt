import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  chats?: mongoose.Types.ObjectId[];
  preferences?: mongoose.Types.ObjectId;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat", // reference to the Chat model
      },
    ],

    preferences: {
      type: Schema.Types.ObjectId,
      ref: "UserPreferences",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export default UserModel;
