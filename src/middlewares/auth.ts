import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

import environment from "../config/environment";

interface RequestWithUserRole extends Request {
  user?: {};
}

export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    environment.jwtSecret!
  );

  return token;
};

export const protect = (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret!);

    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized");
    return;
  }
};

export const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
