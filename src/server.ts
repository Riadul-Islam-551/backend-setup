import app from "./app.js";
import { env } from "./config/env.js";

const port = env.port;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
