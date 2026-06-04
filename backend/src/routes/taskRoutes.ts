import express from "express";
import {tasks,getuserTasks,getTask,updateTask} from "../controllers/taskController";
import {verifytoken} from "../middleware/authMiddleware";

const route = express.Router();
route.post("/tasks",verifytoken,tasks);
route.get("/getuserTasks",verifytoken,getuserTasks);
route.get("/getTask",verifytoken,getTask);
route.put("/updateTask/:taskId",verifytoken,updateTask);
export default route;