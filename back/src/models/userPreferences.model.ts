import mongoose, { Document, Schema } from "mongoose";

export interface IUserPreferences {
  user: mongoose.Types.ObjectId;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  healthy: boolean;
  likes: string[];
  dislikes: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface Preferences {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  healthy: boolean;
  likes: string[];
  dislikes: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserPreferencesDocument extends IUserPreferences, Document {}

const userPreferencesSchema = new Schema<IUserPreferencesDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    vegan: {
      type: Boolean,
      default: false,
    },
    glutenFree: {
      type: Boolean,
      default: false,
    },
    dairyFree: {
      type: Boolean,
      default: false,
    },
    healthy: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const UserPreferencesModel = mongoose.model<IUserPreferencesDocument>(
  "UserPreferences",
  userPreferencesSchema,
);

export default UserPreferencesModel;
