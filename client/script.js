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
   todoList.innerHTML = ""; // Clear existing todos

   todos.forEach((todo) => {
     const li = document.createElement("li");
     li.textContent = todo.title;
     todoList.appendChild(li);
   });

// list.innerHTML = listHTML 
//   console.log(list)
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

  todoInput.value = ""; // Clear input field
  fetchTodos();  
});

// Load todos when page loads
fetchTodos();
