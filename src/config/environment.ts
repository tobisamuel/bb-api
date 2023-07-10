import * as dotenv from "dotenv";

dotenv.config();

const environment = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
};

export default environment;
