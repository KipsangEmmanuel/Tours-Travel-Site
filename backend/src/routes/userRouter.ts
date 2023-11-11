import { Router } from "express";
import { registerUser } from "../controllers/userController";

const user_router = Router();

user_router.post("/register", registerUser)



export default user_router;