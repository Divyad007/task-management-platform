import pool from "../config/db";
import {Request,Response} from "express";

export const getusers = async (req:Request,res:Response) => {
  try{
   const result = await pool.query("SELECT * FROM users");
   res.status(200).json(result.rows);
  }catch(error){
   res.status(500).json({message:'server error'});
  }
};

export const registeruser = async (req:Request,res:Response) => {
  try{
   const {name,email,password} = req.body;
   const getuserdata = await pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,[email,password]);
   if(getuserdata.rowCount){
    res.status(409).json({message:"Email already exists."});
   }else{
   const result = await pool.query(`INSERT INTO users (name,email,password) values($1,$2,$3)`,[name,email,password]);
   if(result.rowCount){
    res.status(201).json({message:"Added user successfully."});
   }
  }
  }catch(error){
    res.status(500).json({
      message : "server error",
      err : error
    });
  }
}