let tasks = [];

const tasksDiv = document.getElementById("tasks")
const inputField = document.getElementById("taskInput")
const storageKey = "tasks";

function displayTasks() {
    tasksDiv.innerHTML = null;

    for (const [idx, task] of Object.entries(tasks)) {
        const taskContainer = document.createElement("div")
        taskContainer.style.marginBottom = "10px"
        
        const taskText = document.createElement("p")
        taskText.style.display = "inline"
        taskText.style.marginRight = "10px"
        taskText.textContent = task;

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.onclick = () => removeTask(idx)

        taskContainer.appendChild(taskText)
        taskContainer.appendChild(deleteButton)
        
        tasksDiv.appendChild(taskContainer)
    }
}

function loadTasks() {
    const storedTasks = localStorage.getItem(storageKey)
    if (storedTasks) tasks = JSON.parse(storedTasks)
    displayTasks()
}

function saveTasks() {
    const serializedTasks = JSON.stringify(tasks);
    localStorage.setItem(storageKey, serializedTasks)
}


function addTask() {
    const value = inputField.value;
    if (!value) {
        alert("Please enter a task")
        return
    }
    tasks.push(value)
    displayTasks()
    inputField.value = ""
    saveTasks()
}

function removeTask(idx) {
    tasks.splice(idx, 1)
    displayTasks()
    saveTasks()
}

document.addEventListener("DOMContentLoaded", loadTasks)
