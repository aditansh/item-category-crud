import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import routes  from "./routes";
// import { loadConstants } from "./constants";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// loadConstants();

app.use(cors());
app.use(express.json());

app.use("/", routes);

app.get("/ping", (_req: Request, res: Response) => {
  return res.send({ status: "success", message: "pong!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
