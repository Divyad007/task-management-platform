import express from "express";
import { getusers, registeruser, loginuser } from "../controllers/userController";
import {verifytoken} from "../middleware/authMiddleware";

const route = express.Router();
route.get("/users",verifytoken,getusers);
//added register api
route.post("/register", registeruser);
route.post("/login", loginuser);
export default route;
