
import Task from './Task';

export default class TaskLogic {
  constructor(userItnerface) {
    this.ui = userItnerface;
  }

  init() {
    this.ui.inputField.addEventListener('keyup', this.inputTask.bind(this));
  }

  inputTask(event) {
    if (event.key === 'Enter') {
      if (this.ui.inputField.value.search(/\w/i) !== -1 || this.ui.inputField.value.search(/[а-я]/i) !== -1) {
        if (!this.ui.error.classList.contains('invisible')) {
          this.ui.error.classList.add('invisible');
        }
        const newTask = new Task(this.ui.inputField.value);
        this.ui.tasks.push(newTask);
        this.ui.inputField.value = '';
        this.ui.clearAllTasks();
        this.ui.clearPinnedTasks();
        this.ui.drawTasks(this.ui.tasks);
      } else {
        this.ui.error.classList.remove('invisible');
      }
    } else {
      this.ui.filter();
    }
  }
}
