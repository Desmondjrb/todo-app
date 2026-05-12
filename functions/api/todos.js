export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const method = request.method;
  const pathParts = url.pathname.split("/");
  const id = pathParts[pathParts.length - 1]; // for /api/todos/:id

  const DATA_API_URL = env.MONGODB_URI.replace("mongodb+srv://", "https://data.mongodb-api.com/app/").replace("/?appName=Cluster0", "/endpoint/data/v1/action");
  const API_KEY = env.API_KEY;
  const DATA_SOURCE = env.DATA_SOURCE;
  const DATABASE = env.DATABASE;
  const COLLECTION = env.COLLECTION;

  try {
    if (method === "GET") {
      // GET all todos
      const response = await fetch(`${DATA_API_URL}/action/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
        },
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: COLLECTION,
          filter: {},
          sort: { _id: -1 },
        }),
      });
      const data = await response.json();
      return new Response(JSON.stringify(data.documents || []), {
        headers: { "Content-Type": "application/json" },
      });
    } else if (method === "POST") {
      // CREATE todo
      const body = await request.json();
      const { title } = body;
      if (!title) {
        return new Response(JSON.stringify({ message: "Title required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const response = await fetch(`${DATA_API_URL}/action/insertOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
        },
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: COLLECTION,
          document: { title },
        }),
      });
      const data = await response.json();
      return new Response(JSON.stringify({ _id: data.insertedId, title }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } else if (method === "DELETE") {
      // DELETE todo
      const response = await fetch(`${DATA_API_URL}/action/deleteOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: API_KEY,
        },
        body: JSON.stringify({
          dataSource: DATA_SOURCE,
          database: DATABASE,
          collection: COLLECTION,
          filter: { _id: { $oid: id } },
        }),
      });
      const data = await response.json();
      if (data.deletedCount > 0) {
        return new Response(JSON.stringify({ message: "Todo deleted" }), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ message: "Todo not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else if (method === "PUT") {
      // UPDATE todo
      const body = await request.json();
      const { title } = body;
      if (!title) {
        return new Response(JSON.stringify({ message: "Title required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
      const response = await fetch(`${env.DATA_API_URL}/action/updateOne`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: env.API_KEY,
        },
        body: JSON.stringify({
          dataSource: env.DATA_SOURCE,
          database: env.DATABASE,
          collection: env.COLLECTION,
          filter: { _id: { $oid: id } },
          update: { $set: { title } },
        }),
      });
      const data = await response.json();
      if (data.modifiedCount > 0) {
        return new Response(JSON.stringify({ _id: id, title }), {
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ message: "Todo not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
    } else {
      return new Response(JSON.stringify({ message: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
