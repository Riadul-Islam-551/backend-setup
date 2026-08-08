import http, { type Server } from "http";
import app from "./app.js";
import { env } from "./config/env.js";

const port = env.port;

//create http server for easy connection process of socket and many other services
let server: Server;

const bootstrap = async () => {
  try {
    const httpServer = http.createServer(app);

    server = httpServer.listen(port, () => {
      console.log(`http server is running on port ${port}`);
    });

    //gracefully shutdown => ongoing process
    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("sigterm gracefully shutdown!");
        process.exit(0);
      });
    });

    //close in development purpous
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("sigint gracefully shutdown!");
        process.exit(0);
      });
    });

    //error => which get outside of global error
    process.on("uncaughtException", (error) => {
      server.close(() => {
        console.log("uncaught Exception gracefully shutdown!", error);
        process.exit(1);
      });
    });

    process.on("unhandledRejection", (error) => {
      server.close(() => {
        console.log("unhandledRejection gracefully shutdown!", error);
        process.exit(1);
      });
    });



  } catch (error) {
    console.error("server stopped", error);
  }
};

bootstrap();

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
