import { off } from "node:cluster";
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
    const pageNum = Number(req.query.page) || 1;
    const limitNum = Number(req.query.limit) || 10;
    const offset = (pageNum - 1) * limitNum;
    const { title, status, sort, order } = req.query;
    const allowedSortFields = ["created_at", "updated_at", "points", "title"];
    const sortfields = allowedSortFields.includes(sort as string) ? sort : 'created_at';
    const sortorder = order === 'asc' ? 'ASC' : 'DESC';

    let queryarr = [userId];
    let cond = "";
    if (title) {
      cond += ` AND title ILIKE $${queryarr.length + 1}`;
      queryarr.push(`%${title}%`);
    }
    if (status) {
      cond += ` AND status = $${queryarr.length + 1}`;
      queryarr.push(status);
    }
    cond += ` ORDER BY ${sortfields} ${sortorder}`;
    cond += ` LIMIT $${queryarr.length + 1}`;
    queryarr.push(limitNum);

    cond += ` OFFSET $${queryarr.length + 1}`;
    queryarr.push(offset);
    const result = await pool.query(
      `SELECT * FROM tasks where user_id = $1` + cond,
      queryarr,
    );
    return res.status(200).json({
      message: "Tasks fetched successfully",
      data: result.rows,
      limit:limitNum,
      page:pageNum
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
    const { taskId } = req.params;
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
        `UPDATE tasks SET title=$2,description=$3,status=$4,points=$5,updated_at = now() WHERE id=$1 AND user_id = $6`,
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

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { taskId } = req.params;
    const result = await pool.query(
      `SELECT * FROM tasks where user_id = $1 AND id = $2`,
      [userId, taskId],
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Tasks not Found.",
      });
    } else {
      const taskdelete = await pool.query(
        `DELETE FROM tasks WHERE id=$1 AND user_id = $2`,
        [taskId, userId],
      );
      if (taskdelete) {
        return res.status(200).json({
          message: "Tasks Removed successfully",
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
