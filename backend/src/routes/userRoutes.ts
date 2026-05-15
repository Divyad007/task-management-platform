import express from "express";
import {getusers} from "../controllers/userController";

const route = express.Router();
route.get("/users", getusers);
export default route;