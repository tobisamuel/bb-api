import { Request, Response } from "express";

import prisma from "../config/db";
import { comparePasswords, createJWT, hashPassword } from "../middlewares/auth";

export const createNewUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
    },
  });

  const token = createJWT(user);

  res.json({ token });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(404);
    res.send("User not found");
    return;
  }

  const passwordMatches = await comparePasswords(password, user.password);

  if (!passwordMatches) {
    res.status(401);
    res.send("Password is incorrect");
    return;
  }

  const token = createJWT(user);

  res.json({ token });
};
