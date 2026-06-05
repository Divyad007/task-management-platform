import express from "express";
import {tasks,getuserTasks,getTask,updateTask,deleteTask} from "../controllers/taskController";
import {verifytoken} from "../middleware/authMiddleware";

const route = express.Router();
route.post("/tasks",verifytoken,tasks);
route.get("/getuserTasks",verifytoken,getuserTasks);
route.get("/getTask",verifytoken,getTask);
route.put("/updateTask/:taskId",verifytoken,updateTask);
route.delete("/deleteTask/:taskId",verifytoken,deleteTask);
export default route;