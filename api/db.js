import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI environment variable");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // Recommended options
      bufferCommands: false,
      // useNewUrlParser/useUnifiedTopology are defaults in mongoose 6+
    };
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

export function getTodoModel() {
  return mongoose.models.Todo || mongoose.model("Todo", todoSchema);
}
