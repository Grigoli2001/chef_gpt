import { Request, Response } from "express";
import userPrefernces, {
  IUserPreferencesDocument,
  Preferences,
} from "../models/userPreferences.model";
import { UserPreferencesRequest } from "../types/customRequests.interface";
import statusCodes from "../constants/statusCodes";
import logger from "../middlewares/winston";

const createUserPreferences = async (
  req: UserPreferencesRequest,
  res: Response,
): Promise<Response> => {
  const { preferences } = req.body;
  const userId = req.session?.user?._id;
  if (!preferences) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: "missing information" });
  }

  try {
    const UserPreferences: IUserPreferencesDocument = new userPrefernces({
      user: userId,
      ...preferences,
    });
    const savedUserPreferences = await UserPreferences.save();
    logger.info("User preferences saved successfully");
    return res.status(statusCodes.success).json(savedUserPreferences);
  } catch (error) {
    return res
      .status(statusCodes.queryError)
      .json({ message: "failed to save user preferences", error });
  }
};

const getUserPreferences = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.session?.user?._id;

  try {
    const userPreferences: IUserPreferencesDocument =
      await userPrefernces.findOne({ user: userId });
    if (!userPreferences) {
      return res
        .status(statusCodes.notFound)
        .json({ message: "User preferences not found" });
    }
    return res.status(statusCodes.success).json(userPreferences);
  } catch (error) {
    return res
      .status(statusCodes.queryError)
      .json({ message: "failed to retrieve user preferences", error });
  }
};

const updateUserPreferences = async (
  req: UserPreferencesRequest,
  res: Response,
): Promise<Response> => {
  const userId = req.session?.user?._id;
  const { preferences } = req.body;

  if (!userId || !preferences) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: "missing information", preferences });
  }

  try {
    const updatedUserPreferences = await userPrefernces.findOneAndUpdate(
      { user: userId }, // Find the user preferences document by userId
      { $set: preferences }, // Set the new preferences values
      { new: true }, // Return the updated document after the update
    );

    return res.status(statusCodes.success).json(updatedUserPreferences);
  } catch (error) {
    return res
      .status(statusCodes.queryError)
      .json({ message: "failed to update user preferences", error });
  }
};

const deleteUserPreferences = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId = req.session?.user?._id;

  try {
    // reset user preferences to default values
    // Set default values for the preferences
    const defaultPreferences: Preferences = {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      healthy: false,
      likes: [],
      dislikes: [],
    };

    const userPreferences = await userPrefernces.findOneAndUpdate(
      { user: userId }, // Find the user preferences document by userId
      { $set: defaultPreferences }, // Set the new preferences values
      { new: true }, // Return the updated document after the update
    );

    if (!userPreferences) {
      return res
        .status(statusCodes.notFound)
        .json({ message: "User preferences not found" });
    }

    return res
      .status(statusCodes.success)
      .json({ message: "User preferences reseted successfully" });
  } catch (error) {
    return res
      .status(statusCodes.queryError)
      .json({ message: "failed to reset user preferences", error });
  }
};

export default {
  createUserPreferences,
  getUserPreferences,
  updateUserPreferences,
  deleteUserPreferences,
};
