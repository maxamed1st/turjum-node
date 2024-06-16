import express from "express";
import translate from "./routes/translate";
import log from "./utils/logger"

const app = express()
const port = process.env.PORT || 3000

app.use("/translate", translate);

app.get('/', (_req, res) => {
  res.json({ message: "Hello, Walaalka!" });
  res.end();
});

app.use((err, _req, res, _next) => {
  log("TRANSLATE", err.stack);
  res.status(500).send("internal server error");
});

app.listen(port, () => {
  log("app", `listening on port ${port}`);
});
