// Get DOM HTML Elements
const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

// Fetch all todos when page loads
async function fetchTodos() {
  // add your code
 const response = await fetch("/api/todos");
 const todos = await response.json();
 displayTodos(todos);
 
}

// Display todos in the list
function displayTodos(todos) {
  // add your code
   todoList.innerHTML = ""; 

   todos.forEach((todo) => {
     const li = document.createElement("li");
     li.textContent = todo.title;
     li.id = todo._id;
     const deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
     deleteButton.classList.add("delete-btn"); 
     deleteButton.addEventListener("click", () => {
       // Call the deleteTodo function when clicked
       deleteTodo(todo._id);
     });

     const upButton = document.createElement('button')
     upButton.textContent = "update"

      upButton.addEventListener("click", () => {
        const upTitle = prompt("Edit your todo:", todo.title);
        if (upTitle) {
          updateTodo(todo._id, upTitle);
        }
      });

      li.appendChild(upButton)
     li.appendChild(deleteButton);
     todoList.appendChild(li);
   });


// list.innerHTML = listHTML 
//   console.log(list)
}



async function deleteTodo(todoId) {
  // Send a DELETE request to the backend
  await fetch(`/api/todos/${todoId}`, {
    method: "DELETE",
  });

  // After deletion, fetch the updated list of todos
  fetchTodos();
}

async function updateTodo(id, upTitle) {
  try {
    const updatedTodo = { title: upTitle };
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Todo updated!");
      fetchTodos(); // Refresh the todo list
    } else {
      alert("Failed to update todo");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
  }

  
}

// Handle form submission
todoForm.addEventListener("submit", async (e) => {
  // add your code
  e.preventDefault();

  const todoTitle = todoInput.value.trim();
  if (!todoTitle) {
    alert("Please enter a todo!");
    return;
  }

  const newTodo = { title: todoTitle };

  await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });

  todoInput.value = ""; 
  fetchTodos();  
});







// 
// Load todos when page loads
fetchTodos();
