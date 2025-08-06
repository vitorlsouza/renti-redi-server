import { Request, Response } from "express";

// Helper function to handle async operations with consistent error handling
export const asyncHandler = (fn: (req: Request, res: Response) => Promise<Response | void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Server Error",
      });
    }
  };
};