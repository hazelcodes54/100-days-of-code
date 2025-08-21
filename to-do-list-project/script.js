// Get the input box where users type their to-do items
const inputBox = document.getElementById("input-box");

// Get the container that will hold the list of to-do items
const listContainer = document.getElementById("list-container");

// Get references to the completed and uncompleted counters
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Function to update the counters
function updateCounters() {
  const tasks = listContainer.querySelectorAll("li");
  let completed = 0;
  let uncompleted = 0;
  tasks.forEach((li) => {
    const checkbox = li.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
      completed++;
    } else {
      uncompleted++;
    }
  });
  completedCounter.textContent = completed;
  uncompletedCounter.textContent = uncompleted;
}

// Now we will create our addTask function
function addTask() {
  // Get the trimmed value from the input box
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Create a new list item for the task
  const li = document.createElement("li");
  li.innerHTML = `
    <label style="flex:1;display:flex;align-items:center;">
      <input type="checkbox">
      <span class="task-label">${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;
  listContainer.appendChild(li);
  inputBox.value = "";

  // Get elements inside the new list item
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // Mark task as completed when checkbox is clicked
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters(); // Update counters when checkbox is toggled
  });

  // Edit the task when Edit button is clicked
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters(); // Update counters after editing
    }
  });

  // Delete the task when Delete button is clicked, with confirmation
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters(); // Update counters after deleting
    }
  });

  updateCounters(); // Update counters after adding a new task
}