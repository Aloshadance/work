const taskList = []
let filteredTaskList = []
let statusElements = []
const createTask = document.querySelector('#create_task'),
addButton = document.querySelector('#add_task'),
addPriority = document.querySelector('#add_priority'),
tasks = document.querySelector('#tasks'),
filters = document.querySelector('#filters')

function Task(text, priority, date, status) {
  this.text = text
  this.priority = priority
  this.date = date
  this.status = status
}
  // ДОБАВЛЕНИЕ ЗАДАЧИ
addButton.onclick = addTask

function addTask () {
  if(!createTask.value) return (alert("Заполните поле текста задачи!"))
  filters.querySelector('#filter_prior').value = ''
  filters.querySelector('#filter_input').value = ''
  taskList.push(new Task(createTask.value, addPriority.value, new Date().toLocaleString(), "actively"))
  filteredTaskList = taskList.slice()
  //outputTasks(taskList)
  fillHtmlList(taskList)
  createTask.value = ''
}


// ФИЛЬТРЫ И СОРТИРОВКИ
filters.oninput = filterTasks

function filterTasks() {
  const priority = filters.querySelector('#filter_prior').value,
  statuses = [...filters.querySelectorAll('#status input:checked')].map(n => n.value),
  // sort__dates = filters.querySelector('#date_sort').classList.contains('active'),
  // sort__priorities = filters.querySelector('#priority_sort').classList.contains('active'),
  filter__tasks = filters.querySelector('#filter_input').value

  filteredTaskList = taskList.filter(n => (
    (!priority || n.priority === priority) &&
    (!statuses.length || statuses.includes(n.status)) &&
    //(!sort__dates || (sort__dates) ? taskList.sort(function(a,b) {a.date - b.date}) : taskList.sort(function(a,b) {b.date - a.date}))  && 
    //(!filter__priorities || n.filter__priorities === filter__priorities) && |sort_priority
    (!filter__tasks || n.text.toLowerCase().indexOf(filter__tasks) > -1)
  ))
  fillHtmlList(filteredTaskList)
}

// const filterStatusTasks = () => {
//   const activedTasks = taskList.length && taskList.filter(item => item.status === 'actively')
//   const completedTasks = taskList.length && taskList.filter(item => item.status === 'completed')
//   const cancelledTasks = taskList.length && taskList.filter(item => item.status === 'cancelled')
//   taskList = [...completedTasks,...activedTasks,,...cancelledTasks]
// }

// function outputTasks(array) {
//   tasks.innerHTML = array.map((n,i) => 
//     `<div class="task" id="task_task">
//         <div class="task-priority task-item" id="item_${i}">${n.priority}</div>
//         <div class="task-for-status task-item">
//         <div class="task-text task-item">${n.text}</div>
//         <small class="task-date task-item">${n.date}</small>
//         <div class="task-item task-icons">
//         <button class="fa fa-angle-down complete" id="complete_task" aria-hidden="true"></button><br>
//         <button class="fa fa-times cancel" id="cancel_task" aria-hidden="true"></button>
//         </div>
//         </div>
//         <button class="fa fa-trash task-item delete" id="delete_task" aria-hidden="true"></button>
//     </div>
//     `).join('')
// }

const createTemplate = (n, index) => {
  outputPriority(n)
  return `
  <div class="task" id="task_task">
    <div class="task-priority task-item" id="item_${index}">${priority}</div>
    <div class="task-for-status task-item ">
        <div class="task-text task-item">${n.text}</div>
        <small class="task-date task-item">${n.date}</small>
      <div class="task-item task-icons">
        <button class="fa fa-angle-down" onclick="completeTask(${index})" id="complete_task" aria-hidden="true"></button><br>
        <button class="fa fa-times" onclick="cancelTask(${index})" id="cancel_task" aria-hidden="true"></button>
      </div>
    </div>
    <button class="fa fa-trash task-item" onclick="deleteTask(${index})" id="delete_task" aria-hidden="true"></button>
</div>`
}

const fillHtmlList = array => {
  tasks.innerHTML = ""
  if(array.length > 0) {
    // filterStatusTasks()
    array.forEach((item, index) => {
      tasks.innerHTML += createTemplate(item, index)
      outputStatus(array,index)
    })
  }
}

// fillHtmlList(filteredTaskList)

function outputPriority(n) {
    if (n.priority === 'high') {
      priority = '<label  class ="priority high-priority">Высокий</label>'
    } else if (n.priority === 'middle') {
      priority = '<label class ="priority mid-priority">Средний</label>'
    } else {
      priority = '<label class ="priority poor-priority">Низкий</label>'
    } 
  }

function outputStatus(array,index) {
  statusElements = document.querySelectorAll('.task-for-status')
      if(array[index].status === 'completed') {
        statusElements[index].classList.remove('cancelled-task')
        statusElements[index].classList.add('completed-task')
      } else if (array[index].status === 'cancelled') {
        statusElements[index].classList.remove('completed-task')
        statusElements[index].classList.add('cancelled-task')
      } else {
        statusElements[index].classList.remove('completed-task')
        statusElements[index].classList.remove('cancelled-task')
      }
}

// СВЯЗАТЬ С ФИЛЬТРАМИ

// const editTask = index => {
//   console.log(index)
//     taskList[index].text = input.value
//   }

const deleteTask = index => {
  const result = confirm("Вы точно хотите удалить этот элемент?")
  if (result) {
  filteredTaskList.splice(index, 1)
  taskList.splice(index, 1)
  }
  fillHtmlList(filteredTaskList)
}

const cancelTask = index => {
  if (filteredTaskList[index].status === "cancelled") {
    filteredTaskList[index].status = "actively" 
  } else {
    filteredTaskList[index].status = "cancelled" 
  } 
  fillHtmlList(filteredTaskList)
}

const completeTask = index => {
  if (filteredTaskList[index].status === "completed") {
    filteredTaskList[index].status = "actively" 
  } else {
    filteredTaskList[index].status = "completed" 
  }
  fillHtmlList(filteredTaskList)
}

