document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);
    saveTasks();
    input.value = "";
}

function createTaskElement(taskText, isDone) {
    const li = document.createElement("li");
    if (isDone) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = function() {
        li.classList.toggle("done");
        saveTasks();
    };
    span.ondblclick = function() {
        const newText = prompt("Edit task:", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveTasks();
        }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            done: li.classList.contains("done")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCount();
}

function updateCount() {
    const remaining = document.querySelectorAll("#taskList li:not(.done)").length;
    const taskWord = remaining === 1 ? "task" : "tasks";
    document.getElementById("taskCount").textContent = remaining + " " + taskWord + " left";
}

function filterTasks(type) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    document.querySelectorAll("#taskList li").forEach(li => {
        const isDone = li.classList.contains("done");
        if (type === "all") {
            li.classList.remove("hidden");
        } else if (type === "active") {
            li.classList.toggle("hidden", isDone);
        } else if (type === "done") {
            li.classList.toggle("hidden", !isDone);
        }
    });
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.done));
    updateCount();
}