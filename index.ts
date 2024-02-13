import express from "express";

const app = express()
const port = process.env.PORT || 3000

app.get('/', (_req, res) => {
  res.json({ message: "Hello, Walaalka!" })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
