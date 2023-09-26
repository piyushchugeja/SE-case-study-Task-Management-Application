var taskList = document.getElementById("task-list");

function addTask() {
    var task = document.getElementById("task").value;
    var taskCount = document.getElementsByClassName("task").length;
    if (task == "") {
        alert("Please enter a task");
        return;
    }
    var taskDiv = `
        <div class="task-item" id=task${taskCount}>
            <span class="task">${task}</span>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-success" onclick="completeTask(${taskCount})">
                    &check;
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${taskCount})">
                    &times;
                </button>
            </div>
        </div>
        `;
    taskList.innerHTML += taskDiv;
    document.getElementById("task").value = "";
    saveTasks(task);
}

function saveTasks(task) {
    var tasks = localStorage.getItem("tasks");
    if (!tasks) {
        tasks = [];
    } else {
        tasks = JSON.parse(tasks);
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    var tasks = localStorage.getItem("tasks");
    if (!tasks) {
        return;
    }
    tasks = JSON.parse(tasks);
    tasks.forEach((task, index) => {
        var taskDiv = `
        <div class="task-item" id=task${index}>
            <span class="task">${task}</span>
            <div class="btn-group">
                <button type="button" class="btn btn-outline-success" onclick="completeTask(${index})">
                    &check;
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteTask(${index})">
                    &times;
                </button>
            </div>
        </div>
        `;
        taskList.innerHTML += taskDiv;
    });
}

function clearTasks() {
    localStorage.removeItem("tasks");
    taskList.innerHTML = "";
}

function deleteTask(index) {
    var tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById(`task${index}`).remove();
}

function completeTask(index) {
    var task = document.getElementById(`task${index}`);
    task.classList.toggle("completed");
    task.querySelector(".btn-outline-success").classList.toggle("disabled");
    task.querySelector(".btn-outline-danger").classList.toggle("disabled");
}

renderTasks();