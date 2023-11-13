import { Router } from "express";
import {
  checkUserDetails,
  deleteUser,
  getUnAssignedUser,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.get("/", verifyToken, getUsers);
user_router.get("/unassigned",verifyToken,getUnAssignedUser)
user_router.put("/", verifyToken, updateUser);
user_router.get("/check_user_details", verifyToken, checkUserDetails);

user_router.post("/login", loginUser);
user_router.get("/:id", verifyToken, getUser);
user_router.delete("/:id", verifyToken, deleteUser);

export default user_router;
