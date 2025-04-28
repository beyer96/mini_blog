import express from "express";

const PORT = 3000;
const app = express();

app.get("/", (_, res) => {
  res.send("Index");
});

app.listen(PORT, () => console.log("Server is running..."));
