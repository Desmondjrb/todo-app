import { connectToDatabase, getTodoModel } from "../db.js";

export default async function handler(req, res) {
  await connectToDatabase();
  const Todo = getTodoModel();

  if (req.method === "GET") {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const todo = new Todo(req.body);
      const newTodo = await todo.save();
      return res.status(201).json(newTodo);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
