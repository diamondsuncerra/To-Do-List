document.addEventListener("DOMContentLoaded", function() {


    let input = document.getElementById("input-task");
    let submitInput = document.getElementById("add-task-button");
    let taskList = document.getElementById("task-list");

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (savedTasks.length === 0)
        document.querySelector(".all-done-container").style.display="block";

    savedTasks.forEach(function(taskText) {
        addTaskToDOM(taskText);
    });

    submitInput.addEventListener("click", function() {
        let inputValue = input.value;
        if (inputValue.trim() !== "") {
            addTaskToDOM(inputValue);

            // Add task to localStorage
            savedTasks.push(inputValue);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            if (savedTasks.length !== 0)
                document.querySelector(".all-done-container").style.display="none";
            input.value = "";
        }
    });

    taskList.addEventListener("change", function(event) {
        if (event.target.type === "checkbox") {

            let span = event.target.closest("li").querySelector(".task");
            if (event.target.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "";
            }
        }
    });

    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            let taskItem = event.target.closest("li");
            let taskText = taskItem.querySelector(".task").textContent;

            // Remove task from localStorage
            savedTasks = savedTasks.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            if (savedTasks.length === 0)
                document.querySelector(".all-done-container").style.display="block";
            taskItem.remove();
        }
    });

    function addTaskToDOM(taskText) {
        let newTask = document.createElement("li");

        let labelElem = document.createElement("label");
        let inputElem = document.createElement("input");
        inputElem.setAttribute("type", "checkbox");
        labelElem.appendChild(inputElem);

        let spanElem = document.createElement("span");
        spanElem.setAttribute("class", "task");
        spanElem.textContent = taskText;

        let buttonElem = document.createElement("button");
        buttonElem.setAttribute("class", "delete-btn");

        newTask.appendChild(labelElem);
        newTask.appendChild(spanElem);
        newTask.appendChild(buttonElem);

        taskList.appendChild(newTask);
    }
});