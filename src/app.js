const express = require("express");

const morgan = require("morgan");
const cookieParse = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const tasksRoutes = require("./routes/tasks.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);



app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParse());

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

module.exports = app;
