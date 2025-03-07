// Get DOM HTML Elements
let form = document.getElementById('todoForm')
let input = document.getElementById('todoInput')
let btn = document.getElementsByTagName('button')
let list = document.getElementById('todoList')
// Fetch all todos when page loads
async function fetchTodos() {
  // add your code
  try {
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
 
}

// Display todos in the list
function displayTodos(todos) {
  // add your code
 todos = fetchTodos()

  list.append(todos)
  console.log(list)
}

// Handle form submission
todoForm.addEventListener("submit", async (e) => {
  // add your code
  e.preventDefault();
  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: input.value }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
  displayTodos()
});

// Load todos when page loads
fetchTodos();
