const addTaskButton = document.getElementById('addTask');
const deskTaskInput = document.getElementById('taskInput');
const toDoList = document.getElementById('tasklist');
const clearing = document.getElementById('clearAll');


let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
	this.description = description;
	this.completed = false
}

let toDoElem = [];

const createTask = (task, index) => {
	return `<div class="task-item ">
                  <button class="delete" onclick="deleteTask(${index})"><input type="image" class="trash" src="pics/trash.svg" name="delete" alt="delete"></button>
                  <label class="tasks">
                     <input type="checkbox" onclick="completeTask(${index})" class="complete" ${task.completed ? 'checked' : ''}>
					 <span class="task-name ${task.completed ? 'done' : ''}">${task.description}</span>
                     <span class="checkmark"></span>
                  </label>
               </div>
			   `
}


const updateHTML = () => {
		toDoList.innerHTML = "";
		if(tasks.length > 0){
			tasks.forEach((item, index) => {
				toDoList.innerHTML += createTask(item, index);
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
	console.log(index)
}

addTaskButton.addEventListener('click', () => {
	tasks.push(new Task(deskTaskInput.value));
	updateLocal();
	updateHTML();
	deskTaskInput.value = '';
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