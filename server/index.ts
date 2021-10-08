import { App } from "@tinyhttp/app";
import morgan from "morgan";

const app = new App();

app.use(morgan("dev"));

app.get("/", (_, response) => {
  response.send("henlo from tinyhttp");
});

app.listen(4000, () => console.info("Started server on http://localhost:4000"));
