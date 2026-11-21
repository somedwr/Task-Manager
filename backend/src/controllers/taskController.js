const prisma = require("../lib/prisma");

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// READ (all)
async function getTasks(req, res) {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  res.json(tasks);
}

// READ (one)
async function getTask(req, res) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const task = await prisma.task.findFirst({
    where: { id, userId: req.user.id },
  });
  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
}

// CREATE
async function createTask(req, res) {
  const { title, description } = req.body ?? {};

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      description: typeof description === "string" ? description : null,
      userId: req.user.id,
    },
  });
  res.status(201).json(task);
}

// UPDATE
async function updateTask(req, res) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const { title, description, done } = req.body ?? {};
  const data = {};

  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    data.title = title.trim();
  }
  if (description !== undefined) data.description = description;
  if (done !== undefined) {
    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "done must be true or false" });
    }
    data.done = done;
  }
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ error: "Nothing to update" });
  }

  const result = await prisma.task.updateMany({
    where: { id, userId: req.user.id },
    data,
  });
  if (result.count === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  const task = await prisma.task.findUnique({ where: { id } });
  res.json(task);
}

// DELETE
async function deleteTask(req, res) {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid task id" });

  const result = await prisma.task.deleteMany({
    where: { id, userId: req.user.id },
  });
  if (result.count === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
}

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };