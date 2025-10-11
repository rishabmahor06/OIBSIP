document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const pendingTasksList = document.getElementById("pending-tasks-list");
  const completedTasksList = document.getElementById("completed-tasks-list");
  const toastContainer = document.getElementById("toast-container"); // Get the toast element

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || {
    pending: [],
    completed: [],
  };

  // --- Toast Notification Function ---
  const showToast = (message) => {
    toastContainer.textContent = message;
    toastContainer.classList.add("show");
    // Hide the toast after 3 seconds
    setTimeout(() => {
      toastContainer.classList.remove("show");
    }, 3000);
  };

  // Function to save tasks to local storage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to render tasks on the page
  const renderTasks = () => {
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    tasks.pending.forEach((task, index) => {
      const li = createTaskElement(task, index, "pending");
      pendingTasksList.appendChild(li);
    });

    tasks.completed.forEach((task, index) => {
      const li = createTaskElement(task, index, "completed");
      completedTasksList.appendChild(li);
    });
  };

  // Function to create a task list item element
  const createTaskElement = (task, index, type) => {
    const li = document.createElement("li");
    if (type === "completed") {
      li.classList.add("completed");
    }

    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = task.text;

    const taskTimestamp = document.createElement("span");
    taskTimestamp.classList.add("task-timestamp");
    taskTimestamp.textContent = `Added: ${task.added}`;

    taskContent.appendChild(taskText);
    taskContent.appendChild(taskTimestamp);

    if (task.completed) {
      const completedTimestamp = document.createElement("span");
      completedTimestamp.classList.add("task-timestamp");
      completedTimestamp.textContent = `Completed: ${task.completed}`;
      taskContent.appendChild(completedTimestamp);
    }

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    if (type === "pending") {
      const completeBtn = document.createElement("button");
      completeBtn.classList.add("btn-complete");
      completeBtn.innerHTML = "✔️";
      completeBtn.setAttribute("title", "Complete Task");
      completeBtn.addEventListener("click", () => completeTask(index));
      taskActions.appendChild(completeBtn);
    }

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn-edit");
    editBtn.innerHTML = "✏️";
    editBtn.setAttribute("title", "Edit Task");
    editBtn.addEventListener("click", (e) => {
      // Prevent button from being disabled if already in edit mode
      if (li.classList.contains("editing")) return;
      editTask(li, taskText, index, type);
    });
    taskActions.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn-delete");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.setAttribute("title", "Delete Task");
    deleteBtn.addEventListener("click", () => deleteTask(index, type));
    taskActions.appendChild(deleteBtn);

    li.appendChild(taskContent);
    li.appendChild(taskActions);

    return li;
  };

  // Function to format the current date and time
  const getTimestamp = () => {
    return new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Add a new task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      tasks.pending.push({ text: text, added: getTimestamp() });
      taskInput.value = "";
      saveTasks();
      renderTasks();
      showToast("Task added successfully! 🎉");
    }
  });

  // Mark a task as complete
  const completeTask = (index) => {
    const [task] = tasks.pending.splice(index, 1);
    task.completed = getTimestamp();
    tasks.completed.push(task);
    saveTasks();
    renderTasks();
  };

  // Delete a task
  const deleteTask = (index, type) => {
    tasks[type].splice(index, 1);
    saveTasks();
    renderTasks();
    showToast("Task deleted. 🗑️");
  };

  // Edit a task
  const editTask = (li, taskTextElement, index, type) => {
    li.classList.add("editing"); // Add class to indicate editing state
    const currentText = tasks[type][index].text;
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("edit-input");

    taskTextElement.replaceWith(input);
    input.focus();
    // Move cursor to the end of the input
    input.setSelectionRange(currentText.length, currentText.length);

    const saveEdit = () => {
      const newText = input.value.trim();
      if (newText && newText !== currentText) {
        tasks[type][index].text = newText;
        showToast("Task updated successfully! 👍"); // Show toast on successful save
      }
      // Always save and render to remove the input field
      saveTasks();
      renderTasks();
    };

    input.addEventListener("blur", saveEdit);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        input.blur(); // Trigger the blur event to save
      }
    });
  };

  // Initial render
  renderTasks();
});
