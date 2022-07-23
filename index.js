import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import ModelRunner from "./Models/ModelRunner.js";
import createHttpError from "http-errors";

import Auth_Router from "./Routes/Auth_Route";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Running....");
});

app.use("/api", Auth_Router);

app.use(async (req, res, next) => {
  next(createHttpError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen("4000", () => {
  console.log("Server is Up and Running...");
});
