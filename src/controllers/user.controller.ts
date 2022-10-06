import { Request, Response } from "express";

export const signup = (req: Request, res: Response): void => {};

export const login = (req: Request, res: Response): void => {
  const { email, password }: { email: string, password: string } = req.body;


};

export const logout = (req: Request, res: Response): void => {};

export const refreshToken = (req: Request, res: Response): void => {};
