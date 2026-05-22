import { connectToDatabase, getTodoModel } from "../db.js";

export default async function handler(req, res) {
  await connectToDatabase();
  const Todo = getTodoModel();

  const { id } = req.query || {};
  if (!id) {
    return res.status(400).json({ message: "Missing id parameter" });
  }

  if (req.method === "DELETE") {
    try {
      const todo = await Todo.findByIdAndDelete(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.status(200).json({ message: "Todo deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete todo" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedTodo)
        return res.status(404).json({ message: "Todo not found" });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ message: "Error updating todo", error });
    }
  }

  if (req.method === "GET") {
    try {
      const todo = await Todo.findById(id);
      if (!todo) return res.status(404).json({ message: "Todo not found" });
      return res.status(200).json(todo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
