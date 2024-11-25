import { Request, Response } from "express";
import userModel, { IUserDocument, IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { Session, SessionData } from 'express-session';
import { AuthRequest } from "../types/customRequests.interface";
import statusCodes from "../constants/statusCodes";
import logger from "../middlewares/winston";

// const generateAccessToken = (user: { id: string; email: string }) => {
//   return jwt.sign({ user }, process.env.JWT_SECRET_KEY as string, {
//     expiresIn: "7d", // TODO: Access token should expire in 1h
//   });
// };

// const generateRefreshToken = (user: { id: string; email: string }) => {
//   return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET_KEY as string, {
//     expiresIn: "7d",
//   });
// };

const signup = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: "missing information" });
  }

  const hash = bcrypt.hashSync(password, 10);

  try {
    const User = new userModel({
      email,
      username,
      password: hash,
    });
    const savedUser = await User.save();
    logger.info("User saved successfully");
    return res.status(statusCodes.success).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "User already exists" });
    }

    logger.error("Error while saving user", error.message);
    return res
      .status(statusCodes.queryError)
      .json({ message: "failed to save user", error });
  }
};

const signin = async (req: AuthRequest, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: "missing information" });
  }

  try {
    const user: IUserDocument | null = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "User not found" });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "Email or password don't match" });
    }

    req.session.user = {
      _id: user._id.toString(),
    };

    // Generate tokens
    const accessToken = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" },
    );

    const refreshToken = jwt.sign(
      { user: { id: user._id, email: user.email } },
      process.env.JWT_REFRESH_SECRET_KEY as string,
      { expiresIn: "7d" },
    );
    res.cookie("refreshToken", refreshToken);
    return res.status(statusCodes.success).json({ accessToken });
  } catch (error) {
    logger.error("Error while getting user from DB", error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: "Failed to get user" });
  }
};

// Refresh access token with a refresh token
const refreshAccessToken = async (
  req: AuthRequest,
  res: Response,
): Promise<Response> => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res
      .status(statusCodes.badRequest)
      .json({ error: "No refresh token provided" });
  }

  try {
    // Verify the refresh token and check if it is equal to user's id and email
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET_KEY as string,
    ) as { user: { id: string; email: string } };

    if (decoded.user.id !== req.session.user._id) {
      return res
        .status(statusCodes.unauthorized)
        .json({ error: "Invalid refresh token" });
    }
    // Generate a new access token
    const accessToken = jwt.sign(
      { user: { id: decoded.user.id, email: decoded.user.email } },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" },
    );

    return res.status(statusCodes.success).json({ accessToken });
  } catch (error) {
    logger.error("Error while refreshing access token", error.message);
    return res
      .status(statusCodes.unauthorized)
      .json({ error: "Failed to refresh access token" });
  }
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: IUser | null = await userModel
      .findById(req.session.user._id, {
        password: 0,
      })
      .populate("chats");
    if (!user) {
      return res
        .status(statusCodes.badRequest)
        .json({ message: "User not found" });
    }

    return res.status(statusCodes.success).json(user);
  } catch (error) {
    logger.error("Error while getting user from DB", error.message);
    return res
      .status(statusCodes.queryError)
      .json({ error: "Failed to get user" });
  }
};

const signout = (req: Request, res: Response): Response => {
  if (req.session.user) {
    delete req.session.user;
  }
  return res.status(statusCodes.success).json({ message: "Disconnected" });
};

export default { signup, signin, refreshAccessToken, getUser, signout };
