import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const taskRouter = Router();

// GET /api/tasks All
taskRouter.get("/", protect, getAllTasks);
// POST /api/tasks // Manager & Admin
taskRouter.post("/", protect, authorizeRole("Admin", "Manager"), createTask);
// PUT /api/tasks/:id // Manager & Admin , Employee (status alone)
taskRouter.put(
  "/:id",
  protect,
  authorizeRole("Admin", "Manager", "Employee"),
  updateTask
);
// DELETE /api/tasks/:id // Admin Only
taskRouter.delete("/:id", protect, authorizeRole("Admin"), deleteTask);

export default taskRouter;
