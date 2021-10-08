import { App } from "@tinyhttp/app";

const app = new App();

app.get("/", (request, response) => {
  response.send("henlo from tinyhttp");
});

app.listen(4000, () => console.info("Started server on http://localhost:4000"));
