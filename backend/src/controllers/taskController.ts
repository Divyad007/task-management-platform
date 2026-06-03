import pool from "../config/db";
import { Request, Response } from "express";

export const tasks = async (req: Request, res: Response) => {
  try {
    const { title, description, points, status } = req.body;
    const userId = (req as any).user.id;
    const result = await pool.query(
      `
    INSERT INTO tasks (user_id,title,description,points,status) values($1,$2,$3,$4,$5)`,
      [userId, title, description, points, status],
    );
    return res.status(201).json({
      message: "Task added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await pool.query(`SELECT * FROM tasks where user_id = $1`, [
      userId,
    ]);
    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};
