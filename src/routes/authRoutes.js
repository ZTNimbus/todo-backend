import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

//Register new user /auth/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    //Register new user
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    //Add their first todo for guide
    const beginnerTodo = "Welcome! Begin by adding your first todo.";
    await prisma.todo.create({
      data: {
        task: beginnerTodo,
        userId: user.id,
      },
    });

    //JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    console.log(error.message);

    res.sendStatus(503);
  }
});

//Login existing user /auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

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
