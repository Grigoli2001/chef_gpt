import express from "express";
import userPreferencesServices from "../controllers/userPreferences.controller";
import verifySession from "../middlewares/session";
const router = express.Router();

router.post(
  "/userPreferences",
  verifySession,
  userPreferencesServices.createUserPreferences
);
router.get(
  "/userPreferences",
  verifySession,
  userPreferencesServices.getUserPreferences
);
router.put(
  "/userPreferences",
  verifySession,
  userPreferencesServices.updateUserPreferences
);
router.delete(
  "/userPreferences",
  verifySession,
  userPreferencesServices.deleteUserPreferences
);

export default router;
