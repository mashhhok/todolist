"use strict";

const addTaskButton = document.getElementById('addTask');
const lineTaskInput = document.getElementById('taskInput');
const toDoList = document.getElementById('tasklist');
const clearing = document.getElementById('clearAll');
const checkBoxCover = document.getElementById('clearAll');


let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
	this.description = description;
	this.completed = false
}

let toDoElem = [];

const updateHTML = () => {
		toDoList.innerHTML = "";
		if(tasks.length > 0){
			tasks.forEach((item, index) => {
				let taskLine = document.createElement('li');
	taskLine.classList.add("task-item");

	let deleteButton = document.createElement('button');
	deleteButton.classList.add("delete");
	deleteButton.innerHTML = '<input type="image" class="trash" src="pics/trash.svg" name="delete" alt="delete">';
	deleteButton.onclick = function() {deleteTask(index)};

	let taskLabel = document.createElement('label');
	taskLabel.classList.add("tasks");

	let checkBoxComplete = document.createElement('input');
	checkBoxComplete.classList.add("complete");
	checkBoxComplete.type = 'checkbox';
	checkBoxComplete.onclick = function() {completeTask(index)};

	let taskName = document.createElement('span');
	taskName.classList.add("task-name");
	taskName.innerHTML = item.description;

	let checkMark = document.createElement('span');
	checkMark.classList.add("checkmark");

	taskLabel.appendChild(checkBoxComplete);
	taskLabel.appendChild(taskName);
	taskLabel.appendChild(checkMark);

	taskLine.appendChild(deleteButton);
	taskLine.appendChild(taskLabel);

	toDoList.appendChild(taskLine);
	
			})
			toDoElem = document.querySelectorAll('.task-item'); 
		}
}
updateHTML();
	const updateLocal = () => {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
	tasks[index].completed = !tasks[index].completed; 
	if(tasks[index].completed) {
		toDoElem[index].classList.add('done'); 
	}
	else {
		toDoElem[index].classList.remove('done');
	}
	updateLocal();
	updateHTML();
}

addTaskButton.addEventListener('click', () => {
	tasks.push(new Task(lineTaskInput.value));
	updateLocal();
	updateHTML();
	lineTaskInput.value = '';
});

const deleteTask = index => {
	tasks.splice(index, 1);
	updateLocal();
	updateHTML();
}

clearing.addEventListener("click", () => {
	tasks = [];
	updateLocal();
	updateHTML();
});

document.querySelector('#taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      tasks.push(new Task(lineTaskInput.value));
	updateLocal();
	updateHTML();
	lineTaskInput.value = '';
    }
});