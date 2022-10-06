// Catching the fields from where we will control the input
let inputText = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let resultDiv = document.querySelector(".tasks");
let doneDiv = document.querySelector(".done");
let deleteAllBtn = document.querySelector(".clear-all");
let popUpAlert = document.querySelector(".alert");
let popUpAlertCloseBtn = document.querySelector(".pop-up");

// Clear all from the Local Storage
deleteAllBtn.onclick = () => {
    window.location.reload();
    window.localStorage.clear();
    resultDiv.innerHTML = "";
    doneDiv.innerHTML = "";
};

// Create an empty array to store the tasks
let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

// Clicking on the adding button
addBtn.onclick = () => {
    resultDiv.innerHTML = "";
    if (inputText.value !== "") {
        addTask(inputText.value);
        inputText.value = "";
    } else {
        popUpAlert.style.display = "block";
        popUpAlertCloseBtn.onclick = () => {
            popUpAlert.style.display = "none";
        };
    }
};

// Creating the task object and adding it to the array
const addTask = (value) => {
    const task = {
        id: Date.now(),
        text: value,
        completed: false,
    };

    // Adding the new task to the array to be shown
    arrayOfTasks.push(task);

    // Creating a div for each element inside the to-do array
    creatingDiv(arrayOfTasks);

    // Storing the array in the local storage
    storeElementsInTheLocalStorage(arrayOfTasks);
};

// Check the delete function of the delete button
resultDiv.addEventListener("click", (e) => {
    if (e.target.innerHTML === "Delete") {
        e.target.parentElement.classList.remove("new-task");
        e.target.parentElement.classList.add("old-task");
        e.target.parentElement.remove();
        changeTheCompleted(e.target.parentElement);
    }
});

// Change the completed value inside the object of the task
let changeTheCompleted = (task) => {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == task.getAttribute("data-id")) {
            arrayOfTasks[i].completed = true;
            storeElementsInTheLocalStorage(arrayOfTasks);
            creatingDiv(arrayOfTasks);
        }
    }
};

// Creating the div function

const creatingDiv = (arrayOfTasks) => {
    resultDiv.innerHTML = "";
    doneDiv.innerHTML = "";
    arrayOfTasks.forEach((element) => {
        // If the element is not completed
        if (!element.completed) {
            // Creating the div element
            let mainDiv = document.createElement("div");
            mainDiv.className = "new-task";
            mainDiv.setAttribute("data-id", element.id);
            mainDiv.appendChild(document.createTextNode(element.text));

            // Creating the delete span element
            const spanDelete = document.createElement("span");
            spanDelete.appendChild(document.createTextNode("Delete"));
            spanDelete.className = "delete";
            mainDiv.appendChild(spanDelete);

            // Appending everything in the main div that will be shown inside the result div
            resultDiv.appendChild(mainDiv);
        } else {
            let deletedDiv = document.createElement("div");
            deletedDiv.className = "old-task";
            deletedDiv.appendChild(document.createTextNode(element.text));

            const spanDelete = document.createElement("span");
            spanDelete.appendChild(document.createTextNode("Delete"));
            spanDelete.className = "delete";
            deletedDiv.appendChild(spanDelete);

            doneDiv.appendChild(deletedDiv);
        }
    });
};

// Storing the elements inside the Local Storage
const storeElementsInTheLocalStorage = (arrayOfTasks) => {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

// Getting the elements from the local storage to display them inside the page
const getElementsFromTheLocalStorage = () => {
    creatingDiv(JSON.parse(localStorage.getItem("tasks")));
};

getElementsFromTheLocalStorage();
