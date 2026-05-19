import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";

export const verifytoken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"Access denied."});
    }
    try{
     const verified = jwt.verify(token,"secretkey");
     next();
    }catch(error){
        return res.status(401).json({message:"Invalid token."});
    }

};