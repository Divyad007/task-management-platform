import express from "express";
import { getusers, registeruser } from "../controllers/userController";

const route = express.Router();
route.get("/users", getusers);
//added register api
route.post("/register", registeruser);
export default route;
