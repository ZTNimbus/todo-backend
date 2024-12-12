import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

//Register new user /auth/register
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    //Register new user
    const insertUser = db.prepare(`INSERT INTO users (username, password)
        VALUES (?, ?)`);
    const insertResult = insertUser.run(username, hashedPassword);

    //Add their first todo for guide
    const beginnerTodo = "Welcome! Begin by adding your first todo.";
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
        VALUES (?, ?)`);
    insertTodo.run(insertResult.lastInsertRowid, beginnerTodo);

    //JWT token
    const token = jwt.sign(
      { id: insertResult.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({ token });
  } catch (error) {
    console.log(error.message);

    res.sendStatus(503);
  }
});

//Login existing user /auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  try {
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);

    if (!user) return res.status(404).send({ message: "User not found" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;
