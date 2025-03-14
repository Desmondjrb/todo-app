import mongoose from "mongoose";
import express from "express";
const router = express.Router();

// Todo Schema and Model
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});
const Todo = mongoose.model("Todo", todoSchema);

// GET all todos
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE todo
router.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo" });
  }
});


export { router as todoRouter };
