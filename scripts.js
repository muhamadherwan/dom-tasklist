// Get element vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners function
function loadEventListeners() {
    // load event from ls
    document.addEventListener('DOMContentLoaded', getTasks);
    // create task event
    form.addEventListener('submit', addTask);

    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear task event
    clearBtn.addEventListener('click', clearTask);

    // filter task event
    filter.addEventListener('keyup', filterTask);
}

// load task from ls
function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element
        const li = document.createElement('li');
        // add class
        li.className = 'collection-item';
        // create new text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link 
        const link = document.createElement('a');
        // add class to the link
        link.className = 'delete-item secondary-content';
        // add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);
    });
}

// add event function
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!');
    }

    // create new li element
    const li = document.createElement('li');
    // add a class to the li
    li.className = 'collection-item';
    // create new text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link elemtnt to the li
    const link = document.createElement('a');
    // add a class to the link
    link.className = 'delete-item secondary-content';
    // add icon html to the link
    link.innerHTML = '<i class= "fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);

    // store in ls
    storeTaskInLs(taskInput.value);
    // clear input
    taskInput.value = '';

    e.preventDefault();
}

// store in ls
function storeTaskInLs(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLs(e.target.parentElement.parentElement);
        }
    }
}

// remove task from LS
function removeTaskFromLs(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task event
function clearTask() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear all task from ls
    localStorage.clear();
}

// filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}