import express from "express";
import {tasks,getTasks} from "../controllers/taskController";
import {verifytoken} from "../middleware/authMiddleware";

const route = express.Router();
route.post("/tasks",verifytoken,tasks);
route.get("/getTasks",verifytoken,getTasks);
export default route;