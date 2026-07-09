import { Request, Response } from "express";

export const register = async (_req: Request, res: Response) => {
  res.json({
    message: "Register API"
  });
};

export const login = async (_req: Request, res: Response) => {
  res.json({
    message: "Login API"
  });
};