// Get references to DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Initialize an empty array to hold tasks
let tasks = [];

// Add event listener for adding new tasks
addTaskButton.addEventListener('click', () => {
  const taskDescription = taskInput.value.trim();
  if (taskDescription) {
    addTask(taskDescription);
    taskInput.value = '';
  }
});

// Add event listener for task list
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('complete-task')) {
    toggleTaskCompletion(event.target.parentNode.dataset.taskId);
  } else if (event.target.classList.contains('edit-task')) {
    editTask(event.target.parentNode.dataset.taskId);
  } else if (event.target.classList.contains('delete-task')) {
    deleteTask(event.target.parentNode.dataset.taskId);
  }
});

// Functions
function addTask(description) {
  const task = {
    id: Date.now(),
    description,
    completed: false
  };
  tasks.push(task);
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.taskId = task.id;
    li.classList.toggle('completed', task.completed);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.classList.add('complete-task');

    const description = document.createElement('span');
    description.classList.add('task-description');
    description.textContent = task.description;

    const actions = document.createElement('div');
    actions.classList.add('actions');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-task');
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.textContent = 'Delete';

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    li.appendChild(checkbox);
    li.appendChild(description);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find(t => t.id === parseInt(taskId));
  task.completed = !task.completed;
  renderTasks();
}

function editTask(taskId) {
  const task = tasks.find(t => t.id === parseInt(taskId));
  const newDescription = prompt('Edit task description:', task.description);
  if (newDescription) {
    task.description = newDescription;
    renderTasks();
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== parseInt(taskId));
  renderTasks();
}