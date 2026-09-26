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
    document.getElementById("taskCount").textContent = remaining + " tasks left";
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTaskElement(task.text, task.done));
    updateCount();
}