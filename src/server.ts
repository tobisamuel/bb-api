import cors from "cors";
import express from "express";
import morgan from "morgan";

import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", router);

export default app;
