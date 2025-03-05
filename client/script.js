// Get DOM HTML Elements
let form = document.getElementById('todoForm')
let input = document.getElementById('todoInput')
let btn = document.getElementsByTagName('button')
let list = document.getElementById('todoList')
// Fetch all todos when page loads
async function fetchTodos() {
  // add your code
  fetch("/api/todos")
}

// Display todos in the list
function displayTodos(todos) {
  // add your code
}

// Handle form submission
todoForm.addEventListener("submit", async (e) => {
  // add your code
});

// Load todos when page loads
fetchTodos();
