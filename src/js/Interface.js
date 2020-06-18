
export default class Interface {
  constructor() {
    this.inputField = null;
    this.pinnedContainer = null;
    this.tasksContainer = null;
    this.noTask = null;
    this.noPinned = null;
    this.pinnedListeners = [];
    this.tasks = [];
    this.pinnedTasks = [];
    this.error = null;
  }

  init() {
    const inputField = document.querySelector('.input_task');
    const pinnedTasks = document.querySelector('.pinned_tasks_container');
    const allTasks = document.querySelector('.all_tasks_container');
    this.pinnedContainer = pinnedTasks;
    this.inputField = inputField;
    this.tasksContainer = allTasks;
    const noTask = document.createElement('span');
    noTask.classList.add('clear_list');
    noTask.textContent = 'No tasks found';
    this.noTask = noTask;
    const noPinned = document.createElement('span');
    noPinned.classList.add('clear_list');
    noPinned.textContent = 'No pinned tasks';
    this.noPinned = noPinned;
    this.pinnedContainer.append(noPinned);
    this.tasksContainer.append(noTask);
    const error = document.querySelector('.input_error');
    this.error = error;
  }

  redrawAllTasks() {
    while (this.tasksContainer.firstChild) {
      this.tasksContainer.removeChild(this.tasksContainer.firstChild);
    }

    while (this.pinnedContainer.firstChild) {
      this.pinnedContainer.removeChild(this.pinnedContainer.firstChild);
    }

    for (let i = 0; i < this.tasks.length; i += 1) {
      this.createTask(this.tasks[i]);
    }

    if (!this.pinnedContainer.firstChild) {
      this.pinnedContainer.append(this.noPinned);
    }
  }

  clearAllTasks() {
    while (this.tasksContainer.firstChild) {
      this.tasksContainer.removeChild(this.tasksContainer.firstChild);
    }
  }

  clearPinnedTasks() {
    while (this.pinnedContainer.firstChild) {
      this.pinnedContainer.removeChild(this.pinnedContainer.firstChild);
    }
  }

  drawTasks(inputArr) {
    for (let i = 0; i < inputArr.length; i += 1) {
      this.createTask(inputArr[i]);
    }
    if (!this.pinnedContainer.firstChild) {
      this.pinnedContainer.append(this.noPinned);
    }
    if (!this.tasksContainer.firstChild) {
      this.tasksContainer.append(this.tasks);
    }
  }

  createTask(input) {
    const newTask = document.createElement('div');
    newTask.classList.add('task_item');
    const newTaskText = document.createElement('span');
    newTaskText.classList.add('task_text');
    newTaskText.textContent = input.textForUI;
    newTask.append(newTaskText);
    const newTaskCheckBox = document.createElement('span');
    newTaskCheckBox.classList.add('task_checkbox');
    newTask.append(newTaskCheckBox);
    newTaskCheckBox.addEventListener('click', (event) => this.onPinClick(event));
    if (input.pinned === false) {
      this.tasksContainer.append(newTask);
    } else {
      newTaskCheckBox.textContent = 'V';
      this.pinnedContainer.append(newTask);
    }
  }

  addPinListener(callback) {
    this.pinnedListeners.push(callback);
  }


  onPinClick(event) {
    const task = event.currentTarget.parentNode.querySelector('.task_text');
    for (const item of this.tasks) {
      if (item.textForUI === task.textContent) {
        if (item.pinned === false) {
          item.pinned = true;
        } else {
          item.pinned = false;
        }
      }
    }
    this.clearAllTasks();
    this.clearPinnedTasks();
    this.drawTasks(this.tasks);
    this.filter();
  }

  filter() {
    const filteredItems = [];
    for (const item of this.tasks) {
      if (item.pinned === false) {
        if (item.textForSearch.startsWith(this.inputField.value.toLowerCase())) {
          filteredItems.push(item);
        }
      }
    }
    this.clearAllTasks();
    if (filteredItems.length === 0) {
      this.tasksContainer.append(this.noTask);
    } else {
      this.drawTasks(filteredItems);
    }
  }
}
