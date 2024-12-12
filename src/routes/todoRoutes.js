import express from "express";
import db from "../db.js";

const router = express.Router();

//Get todos of user
router.get("/", (req, res) => {
  const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  const todos = getTodos.all(req.userId);
  res.json(todos);
});

//Add new todo
router.post("/", (req, res) => {
  const { task } = req.body;

  const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
    VALUES (?, ?)`);
  const todoResult = insertTodo.run(req.userId, task);

  res.json({
    id: todoResult.lastInsertRowid,
    task,
    completed: 0,
  });
});

//Update todo
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  const updateTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
  updateTodo.run(completed, id);

  res.json({ message: "Todo completed" });
});

//Delete todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  const deleteTodo = db.prepare(
    "DELETE FROM todos WHERE id = ? AND user_id = ?"
  );

  deleteTodo.run(id, userId);

  res.json({ message: "Todo deleted" });
});

export default router;
