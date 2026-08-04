import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import notFound from "./middleware/notFound.js";
import globalError from "./middleware/globalError.js";

// import routes from './routes/routes.js'

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  console.log("app is running successfully");

  res.send({
    success: true,
    message: "app is running",
  });
});

app.use("/api/v1", router);

app.use(notFound);

app.use(globalError);

export default app;

// const port = 500;

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
