import express from "express";

const router = express.Router();

//Get todos of user
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });

  res.json(todos);
});

//Add new todo
router.post("/", async (req, res) => {
  const { task } = req.body;

  const newTodo = await prisma.todo.create({
    data: {
      userId: req.userId,
      task,
    },
  });

  res.json(newTodo);
});

//Update todo
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { userId } = req;

  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId,
    },
    data: {
      completed: !!completed,
    },
  });

  res.json(updatedTodo);
});

//Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId,
    },
  });

  res.json({ message: "Todo deleted" });
});

export default router;
