import { App } from "@tinyhttp/app";
import morgan from "morgan";

const app = new App({
  onError: (error, _, response) => {
    response.status(error.status).json({
      status: error.status,
      title: "There was an error processing your request.",
      detail: `Error ${error}`,
    });
  },
  noMatchHandler: (request, response) => {
    response.status(404).json({
      status: 404,
      title: "The path you requested could not be found on the server.",
      detail: `The path: ${request.path} could not be located. Is this the correct path?`,
    });
  },
});

app.use(morgan("dev"));

app.get("/", (_, response) => {
  response.send("Welcome to the Conduit API");
});

app.listen(4000, () =>
  console.info("Started server on: http://localhost:4000")
);
