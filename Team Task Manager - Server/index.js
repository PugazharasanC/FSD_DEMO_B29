import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

const app = express();
app.use(express.json());
app.use(express.static("./public"));
// debug helper => consoles req type, req url, req time
app.use((req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleString());
  next();
});
app.get("/", (req, res) => {
  res.send("<h1>Application is working</h1>");
});
// route configurations
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server Started at port ", PORT);
  connectDB();
});
