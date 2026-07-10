import pool from "../config/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getusers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

export const registeruser = async (req: Request, res: Response) => {
  try {
    const { name, email, password,confirmpwd } = req.body;
    const encryptpwd = await bcrypt.hash(password, 10);
    if(password != confirmpwd){
      return res.status(409).json({ message: "please Enter confirm password same as password." });
    }
    const getuserdata = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    if (getuserdata.rowCount) {
      return res.status(409).json({ message: "Email already exists." });
    } else {
      const result = await pool.query(
        `INSERT INTO users (name,email,password) values($1,$2,$3)`,
        [name, email, encryptpwd],
      );
      if (result.rowCount) {
        return res.status(201).json({ message: "Added user successfully." });
      }
    }
  } catch (error) {
   return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};

export const loginuser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const getuserdata = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    if (!getuserdata.rowCount) {
      return res.status(404).json({ message: "user not found." });
    }
    const user = getuserdata.rows[0];
    const pwd = await bcrypt.compare(password, user.password);
    if (!pwd) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const token = jwt.sign({id:user.id,email:user.email},"secretkey",{expiresIn : "1h"});
    return res.status(200).json({ message: "Login successful.", token : token});
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};
