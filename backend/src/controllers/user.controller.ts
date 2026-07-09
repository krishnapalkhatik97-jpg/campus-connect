import { Request, Response } from "express";

export const getProfile = async (
  req: Request & { user?: any },
  res: Response
) => {
  res.json(req.user);
};