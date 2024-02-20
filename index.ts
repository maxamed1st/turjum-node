import express from "express";
import translate from "./routes/translate";

const app = express()
const port = process.env.PORT || 3000

app.use("/translate", translate);

app.get('/', (_req, res) => {
  res.json({ message: "Hello, Walaalka!" });
  res.end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
