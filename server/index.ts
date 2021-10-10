import express, { Response, Request } from "express";
import morgan from "morgan";
import { router as userRouter } from "@/routes/user.route";

const app = express();

app.use(morgan("dev"));
app.use("/api", userRouter);

app.get("/", (_, response: Response) => {
  response.send("Welcome to the Conduit API");
});

app.use((request: Request, response: Response) => {
  return response.status(404).json({
    status: 404,
    title: "Hmmm..there doesn't seem to be anything here.",
    description: `Path: ${request.path} does not exist on this server.`,
  });
});

app.use((error: any, _: Request, response: Response) => {
  return response.status(error.status).send({
    status: error.status,
    title: error.title,
    description: `Error: ${error.message}`,
  });
});

app.listen(4000, () =>
  console.info("Started server on: http://localhost:4000")
);
