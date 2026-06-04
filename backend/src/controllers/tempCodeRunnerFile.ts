
// export const updateTask = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user.id;
//     const { taskId, title, description, status, points } = req.body;
//     const result = await pool.query(
//       `SELECT * FROM tasks where user_id = $1 AND id = $2`,
//       [userId, taskId],
//     );
//     if (result.rowCount === 0) {
//       return res.status(404).json({
//         message: "Tasks not Found.",
//       });
//     } else {
//       const taskUpdate = await pool.query(
//         `UPDATE tasks SET title=$2,descripttion=$3,status=$4,points=$5 WHERE id=$1 AND user_id = $6`,
//         [taskId, title, description, status, points, userId],
//       );
//       if (taskUpdate) {
//         return res.status(200).json({
//           message: "Tasks Update successfully",
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "server error",
//       err: error,
//     });
//   }
// };