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

export const getuserTasks = async (req: Request, res: Response) => {
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

export const getTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { taskId } = req.query;
    const result = await pool.query(
      `SELECT * FROM tasks where user_id = $1 AND id = $2`,
      [userId, taskId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Tasks not Found.",
      });
    } else {
      return res.status(200).json({
        message: "Tasks fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { taskId} = req.params;
    const { title, description, status, points } = req.body;
    const result = await pool.query(
      `SELECT * FROM tasks where user_id = $1 AND id = $2`,
      [userId, taskId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Tasks not Found.",
      });
    } else {
      const taskUpdate = await pool.query(
        `UPDATE tasks SET title=$2,description=$3,status=$4,points=$5 WHERE id=$1 AND user_id = $6`,
        [taskId, title, description, status, points, userId],
      );
      if (taskUpdate) {
        return res.status(200).json({
          message: "Tasks Update successfully",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      err: error,
    });
  }
};
