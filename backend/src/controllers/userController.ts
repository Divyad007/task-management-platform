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