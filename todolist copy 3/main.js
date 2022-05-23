'use strict'

const addTaskButton = document.getElementById('addTask')
const lineTaskInput = document.getElementById('taskInput')
const toDoList = document.getElementById('task-list')
const clearing = document.getElementById('clearAll')

let tasks = JSON.parse(localStorage.getItem('tasks')) ?? []

function Task (description) {
  this.description = description
  this.completed = false
}

// eslint-disable-next-line no-unused-vars
let toDoElem = []

const updateList = () => {
  toDoList.innerHTML = ''
  if (tasks.length > 0) {
    tasks.forEach((item, index) => {
      const taskLine = completedItem(item)

      const deleteButton = createButton(index, taskLine)

      const taskLabel = document.createElement('label')
      taskLabel.classList.add('tasks')

      const checkBoxComplete = tickCheckbox(item, index)

      const taskName = createTask(item)

      const checkMark = document.createElement('span')
      checkMark.classList.add('checkmark')

      taskLabel.appendChild(checkBoxComplete)
      taskLabel.appendChild(taskName)
      taskLabel.appendChild(checkMark)

      taskLine.appendChild(deleteButton)
      taskLine.appendChild(taskLabel)

      toDoList.appendChild(taskLine)
    })
    toDoElem = document.querySelectorAll('.task-item')
  };
}

export default updateList()
const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = index => {
  tasks[index].completed = !tasks[index].completed
  updateLocal()
  updateList()
}

addTaskButton.addEventListener('click', () => {
  tasks.push(new Task(lineTaskInput.value))
  updateLocal()
  updateList()
  lineTaskInput.value = ''
})

const deleteTask = index => {
  tasks.splice(index, 1)
  updateLocal()
  updateList()
}

clearing.addEventListener('click', () => {
  tasks = []
  updateLocal()
  updateList()
})

document.querySelector('#taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    tasks.push(new Task(lineTaskInput.value))
    updateLocal()
    updateList()
    lineTaskInput.value = ''
  }
})

function completedItem (item) {
  const taskLine = document.createElement('li')
  taskLine.classList.add('task-item')
  if (item.completed) {
    taskLine.classList.add('done')
  } else {
    taskLine.classList.remove('done')
  };
  return taskLine
}

function createTask (item) {
  const taskName = document.createElement('span')
  taskName.classList.add('task-name')
  taskName.innerHTML = item.description
  return taskName
}

function tickCheckbox (item, index) {
  const checkBoxComplete = document.createElement('input')
  checkBoxComplete.classList.add('complete')
  checkBoxComplete.type = 'checkbox'
  checkBoxComplete.checked = item.completed
  checkBoxComplete.addEventListener('click', function () {
    completeTask(index)
  })
  return checkBoxComplete
}

function createButton (index, taskLine) {
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete')
  deleteButton.innerHTML = '<img class="trash" src="pics/trash.svg" alt="delete">'
  deleteButton.addEventListener('click', function () {
    deleteTask(index)
  })
  taskLine.appendChild(deleteButton)
  return deleteButton
}
