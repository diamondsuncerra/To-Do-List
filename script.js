let btns = [];
let checks = [];
document.addEventListener("DOMContentLoaded", function () {

    let input = document.getElementById("input-task");
    let submitInput = document.getElementById("add-task-button");
    let taskList = document.getElementById("task-list");
    
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // let color = JSON.parse(localStorage.getItem("color")) || 'lightcoral';
    
    if (savedTasks.length === 0)
        document.querySelector(".all-done-container").style.display = "block";

    savedTasks.forEach(function (taskText) {
        addTaskToDOM(taskText);
    });

    submitInput.addEventListener("click", function () {
        let inputValue = input.value;
        if (inputValue.trim() !== "") {
            addTaskToDOM(inputValue);

            // Add task to localStorage
            savedTasks.push(inputValue);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            if (savedTasks.length !== 0)
                document.querySelector(".all-done-container").style.display = "none";
            input.value = "";
        }
        changeColorTheme(color);
    });

    taskList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {

            let span = event.target.closest("li").querySelector(".task");
            if (event.target.checked) {
                span.style.textDecoration = "line-through";
                event.target.style.backgroundColor = color;
            } else {
                span.style.textDecoration = "";
                event.target.style.backgroundColor = '';
            }
        }
        
        checkboxes.forEach(checkbox => {

            if (checkbox.checked) {
                checkbox.style.backgroundColor = color;
                checkbox.style.borderColor = color;
            }

        });
    });

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            let taskItem = event.target.closest("li");
            let taskText = taskItem.querySelector(".task").textContent;

            // Remove task from localStorage
            savedTasks = savedTasks.filter(task => task !== taskText);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            if (savedTasks.length === 0)
                document.querySelector(".all-done-container").style.display = "block";
            taskItem.remove();
        }
    });

    function addTaskToDOM(taskText) {
        let newTask = document.createElement("li");

        let labelElem = document.createElement("label");
        let inputElem = document.createElement("input");
        inputElem.setAttribute("type", "checkbox");
        labelElem.appendChild(inputElem);
        checks.push(inputElem);
        let spanElem = document.createElement("span");
        spanElem.setAttribute("class", "task");
        spanElem.textContent = taskText;

        let buttonElem = document.createElement("button");
        buttonElem.setAttribute("class", "delete-btn");

        newTask.appendChild(labelElem);
        newTask.appendChild(spanElem);
        newTask.appendChild(buttonElem);
        btns.push(buttonElem);
        taskList.appendChild(newTask);
        
    }

    const colorWheel = document.querySelector('.color-wheel');
    
    function changeColorTheme (selectedColor) {
        const themeElement = document.querySelector('.theme-element');
        const btn = document.getElementById("add-task-button");
        const footer = document.getElementById("footer");
        const title = document.querySelector("h1");
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        
        themeElement.style.setProperty('color', selectedColor);
        btn.style.setProperty('background-color', selectedColor);
        footer.style.setProperty('background-color', selectedColor);

        title.addEventListener('mouseover', () => {
            title.style.color = selectedColor;
        });

        title.addEventListener('mouseout', () => {
            title.style.color = ''; // Reset to the default background color
        });
        checkboxes.forEach(checkbox => {

            if (checkbox.checked) {
                checkbox.style.backgroundColor = selectedColor;
                checkbox.style.borderColor = selectedColor;
            }

        });
        const changeTxt = document.getElementById('change-color-theme');
        changeTxt.addEventListener('mouseover', () => {
            changeTxt.style.color = selectedColor;
        });

        changeTxt.addEventListener('mouseout', () => {
            changeTxt.style.color = ''; // Reset to the default background color
        });
        btns.forEach(value => value.style.setProperty('background-color',selectedColor
        ));
        const borderWidth = '2px';   // Border width

        checks.forEach(value => {
            value.style.setProperty('border', `${borderWidth} solid ${selectedColor}`);
        });
    }
    
    colorWheel.addEventListener('click', (event) => {
        
        const boundingRect = colorWheel.getBoundingClientRect();
        const angle = Math.atan2(
            event.clientY - boundingRect.top - boundingRect.height / 2,
            event.clientX - boundingRect.left - boundingRect.width / 2
        );
        const hue = (angle * 180 / Math.PI + 180) % 360;
        const selectedColor = `hsl(${hue}, 100%, 50%)`;
        color = selectedColor;
        changeColorTheme(selectedColor);


    });
    
    const colorThemeBtn = document.getElementById("change-color-theme");
 
    colorThemeBtn.addEventListener('click', function () {
        if (colorWheel.style.display === 'none') {
            colorWheel.style.display = 'block';
        } else colorWheel.style.display = 'none';
    }) ;

   
});


