const addTaskBtn = document.getElementById("addTask");
const deleteTaskBtn = document.getElementById("deleteTask");
const todoList = document.querySelector(".todo-list");
let sortingEnabled = true;

// Add new task
addTaskBtn.addEventListener("click", () => {
  const newItem = document.createElement("div");
  newItem.classList.add("todo-item");
  newItem.dataset.index = Date.now();



  newItem.innerHTML = `
    <input type="checkbox" />
    <input type="text" class="task-text" placeholder="New Task" />
    <input type="date" class="due-date" />
    <select class="priority-select">
      <option value="low">Low</option>
      <option value="medium" selected>Medium</option>
      <option value="high">High</option>
    </select>
    <button class="delete-btn">🗑️</button>
  `;

  todoList.appendChild(newItem);
  updateCheckboxListeners();
  updateDeleteButtons();
  
  if (sortingEnabled) sortTasks(); // Keep it sorted on add
});

// Delete last task (backup button)
deleteTaskBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".todo-item");
  if (items.length > 1) {
    items[items.length - 1].remove();
  } else {
    alert("Nothing more to delete!");
  }
});

const toggleSortBtn = document.getElementById("toggleSort");

toggleSortBtn.addEventListener("click", () => {
  sortingEnabled = !sortingEnabled;
  toggleSortBtn.classList.toggle("active", sortingEnabled);
  sortTasks();
});


// Delete specific task
function updateDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.onclick = () => {
      const taskItem = btn.closest(".todo-item");
      taskItem.remove();
      sortTasks(); // Keep it sorted after delete
    };
  });
}

// Cross out completed task
function updateCheckboxListeners() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const taskInput = checkbox.nextElementSibling;
      taskInput.classList.toggle("completed", checkbox.checked);
    });
  });
}

// Sort tasks by priority then due date
function sortTasks() {
  const items = Array.from(document.querySelectorAll(".todo-item"));

  if (!sortingEnabled) {
    // If sorting is off, sort by original index
    items.sort((a, b) => Number(a.dataset.index) - Number(b.dataset.index));
  } else {
    // Sort by priority then date
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    items.sort((a, b) => {
      const aPriority = a.querySelector(".priority-select").value;
      const bPriority = b.querySelector(".priority-select").value;

      const aDate = a.querySelector(".due-date").value || "9999-12-31";
      const bDate = b.querySelector(".due-date").value || "9999-12-31";

      if (priorityOrder[aPriority] !== priorityOrder[bPriority]) {
        return priorityOrder[aPriority] - priorityOrder[bPriority];
      } else {
        return aDate.localeCompare(bDate);
      }
    });
  }

  items.forEach((item) => todoList.appendChild(item));
}

