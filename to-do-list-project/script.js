// Get the input box where users type their to-do items
const inputBox = document.getElementById("input-box");

// Get the priority selector
const prioritySelect = document.getElementById("priority-select");

// Get the container that will hold the list of to-do items
const listContainer = document.getElementById("list-container");

// Get references to the completed and uncompleted counters
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// Load tasks from localStorage when page loads
window.addEventListener("DOMContentLoaded", loadTasks);

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  listContainer.querySelectorAll("li").forEach((li) => {
    const checkbox = li.querySelector("input[type='checkbox']");
    const taskLabel = li.querySelector(".task-label");
    const priority = li.getAttribute("data-priority");
    tasks.push({
      text: taskLabel.textContent,
      completed: checkbox.checked,
      priority: priority
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      createTaskElement(task.text, task.priority, task.completed);
    });
    updateCounters();
  }
}

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
  saveTasks(); // Save tasks whenever counters update
}

// Function to create a task element
function createTaskElement(taskText, priority, isCompleted = false) {
  const li = document.createElement("li");
  li.setAttribute("data-priority", priority);
  li.classList.add(`priority-${priority}`);
  if (isCompleted) {
    li.classList.add("completed");
  }
  li.innerHTML = `
    <label style="flex:1;display:flex;align-items:center;">
      <input type="checkbox" ${isCompleted ? "checked" : ""}>
      <span class="priority-badge ${priority}">${priority.toUpperCase()}</span>
      <span class="task-label">${taskText}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;
  listContainer.appendChild(li);

  // Get elements inside the new list item
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector(".task-label");
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
      
      // Also allow changing priority
      const newPriority = prompt("Set priority (high, medium, or low):", li.getAttribute("data-priority"));
      if (newPriority && ["high", "medium", "low"].includes(newPriority.toLowerCase())) {
        const priorityLower = newPriority.toLowerCase();
        li.classList.remove("priority-high", "priority-medium", "priority-low");
        li.classList.add(`priority-${priorityLower}`);
        li.setAttribute("data-priority", priorityLower);
        const priorityBadge = li.querySelector(".priority-badge");
        priorityBadge.className = `priority-badge ${priorityLower}`;
        priorityBadge.textContent = priorityLower.toUpperCase();
      }
      
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
}

// Now we will create our addTask function
function addTask() {
  // Get the trimmed value from the input box
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  // Get the selected priority
  const priority = prioritySelect.value;

  // Create a new list item for the task using the helper function
  createTaskElement(task, priority, false);
  
  inputBox.value = "";
  prioritySelect.value = "medium";

  updateCounters(); // Update counters after adding a new task
}