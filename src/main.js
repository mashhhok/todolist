'use strict'

const form = document.getElementById('form')
const input = document.getElementById('task-input')
const list = document.getElementById('task-list')
const clearAllButton = document.getElementById('clear-all')

let tasks = JSON.parse(localStorage.getItem('tasks')) ?? []

function Task (description) {
  this.description = description
  this.completed = false
  this.id = generateID()
}

const updateList = () => {
  list.innerHTML = ''
  if (!tasks.length) return

  const sortedTasks = [...tasks].reverse().sort(function (a, b) { return a.completed - b.completed })
  sortedTasks.forEach((item) => {
    const task = createTask(item)
    list.appendChild(task)
  })
}

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function update () {
  updateList()
  updateLocalStorage()
}

function generateID () {
  let id = Number(localStorage.getItem('id'))
  return () => {
    id++
    localStorage.setItem('id', id)
    return String(id)
  }
}

const completeTask = id => {
  const item = tasks.find((item) => item.id === id)
  item.completed = !item.completed
  update()
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!input.value) return

  const newTask = new Task(input.value)
  tasks.push(newTask)
  update()
  input.value = ''
  console.log(tasks)
})

const deleteTask = id => {
  tasks = tasks.filter((item) => item.id !== id)
  update()
}

clearAllButton.addEventListener('click', () => {
  tasks = []
  update()
})

function createCheckmark () {
  const checkMark = document.createElement('span')
  checkMark.classList.add('checkmark')

  return checkMark
}

function createLabel () {
  const label = document.createElement('label')
  label.classList.add('tasks')

  return label
}

function createTask (item, index) {
  const task = document.createElement('li')
  task.classList.add('task-item')
  task.classList.toggle('done', item.completed)

  const deleteButton = createDeleteButton()
  const label = createLabel()
  const checkbox = createCheckbox(item)
  const text = createText(item)
  const checkMark = createCheckmark()

  deleteButton.addEventListener('click', () => deleteTask(item.id))

  checkbox.addEventListener('click', () => completeTask(item.id))

  label.appendChild(checkbox)
  label.appendChild(text)
  label.appendChild(checkMark)

  task.appendChild(deleteButton)
  task.appendChild(label)

  return task
}

function createText (item) {
  const text = document.createElement('span')
  text.classList.add('task-name')
  text.innerHTML = item.description

  return text
}

function createCheckbox (item) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = item.completed

  return checkbox
}

function createDeleteButton () {
  const button = document.createElement('button')
  button.classList.add('delete')
  button.innerHTML = '<img class="trash" src="pics/trash.svg" alt="delete">'

  return button
}

updateList()