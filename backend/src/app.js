const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

// API VERSIONING
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

module.exports = app;
