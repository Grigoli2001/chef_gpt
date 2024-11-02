import { Request } from "express";

export interface UserRequest extends Request {
  user?: {
    email: string;
  };
}

export interface AuthRequest extends Request {
  username?: string;
  email: string;
  password: string;
}

export interface UserPreferencesRequest extends Request {
  userPreferences: {
    preferences: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      dairyFree: boolean;
      healthy: boolean;
      likes: string[];
      dislikes: string[];
    };
  };
}
