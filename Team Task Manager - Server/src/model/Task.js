// {
//   title: String,
//   description: String,
//   status: String (Pending | In Progress | Completed),
//   dueDate: Date,
//   assignedTo: ObjectId (User),
//   createdBy: ObjectId (User)
// }

import { model, Schema } from "mongoose";

const taskSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Task title is required"],
      minlength: [3, "Title should atleast have 3 chars"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description Should Be added"],
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned user is required"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creater is required"],
    },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);
export default Task;
