import cors from "cors";
import express from "express";
import morgan from "morgan";
import { z } from "zod";

import router from "./router";
import { createNewUser, loginUser } from "./controllers/user";
import { validationMiddleware } from "./middlewares/validators";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

const userRegistrationSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

app.post(
  "/register",
  validationMiddleware(userRegistrationSchema),
  createNewUser
);
app.post("/login", loginUser);

export default app;
