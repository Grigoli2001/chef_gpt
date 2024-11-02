import { Router, Request, Response } from "express";
import statusCodes from "../constants/statusCodes";

const router = Router();

export const healthCheck = (_req: Request, res: Response): void => {
  res.status(statusCodes.success).json({
    message: "All up and running !!",
  });
};

export const healthAsyncCheck = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  Promise.resolve().then(() => {
    res.status(statusCodes.success).json({
      message: "All up and running !!",
    });
  });
};

router.get("/api/health", healthCheck);
router.get("/api/health-async", healthAsyncCheck);

export default router;
