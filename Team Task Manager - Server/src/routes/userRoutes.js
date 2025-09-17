import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { deleteUser, getAllUsers, updateUserRole } from "../controller/userController.js";
import authorizeRole from "../middleware/roleMiddleware.js";


const userRouter = Router()

userRouter.use(protect, authorizeRole("Admin"))

userRouter.get("/", getAllUsers);
userRouter.put("/:id/role", updateUserRole)
userRouter.delete("/:id", deleteUser)

export default userRouter;