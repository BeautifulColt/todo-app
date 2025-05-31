const addTaskBtn = document.getElementById("addTask");
const todoList = document.querySelector(".todo-list");
const deleteTaskBtn = document.getElementById("deleteTask");

addTaskBtn.addEventListener("click", () => {
  const newItem = document.createElement("div");
  newItem.classList.add("todo-item");

  newItem.innerHTML = `
  <input type="checkbox" />
  <input type="text" class="task-text" placeholder="New Task" />
  <select class="priority">
    <option value="high">High 🔥</option>
    <option value="medium" selected>Medium 🟡</option>
    <option value="low">Low 🟢</option>
  </select>
  <input type="date" class="due-date" />
  <button class="delete-btn">🗑️</button>
`;


  todoList.appendChild(newItem);

  updateCheckboxListeners();
  updateDeleteButtons();
});

deleteTaskBtn.addEventListener("click", () => {
  const items = document.querySelectorAll(".todo-item");

  if (items.length > 1) {
    const lastItem = items[items.length - 1];
    lastItem.remove();
  } else {
    alert("Nothing more to delete!");
  }
});

function updateDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const taskItem = btn.closest(".todo-item");
      taskItem.remove();
    });
  });
}

function updateCheckboxListeners() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const taskInput = checkbox.nextElementSibling;

      if (checkbox.checked) {
        taskInput.classList.add("completed");
      } else {
        taskInput.classList.remove("completed");
      }
    });
  });
}
 
