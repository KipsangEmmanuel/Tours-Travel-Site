import { Router } from "express";
import { getUsers, loginUser, registerUser } from "../controllers/userController";

const user_router = Router();

user_router.post("/register", registerUser)
user_router.post("/login", loginUser)
user_router.get("/", ()=>{
    console.log('Getting all users')
})



export default user_router;