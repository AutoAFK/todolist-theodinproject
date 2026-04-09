class Task {
  /** @enum {string} */
  static TaskStatus = {
    1: "In Progress",
    2: "Completed",
    3: "Urgent",
  };

  /**
   *
   * @param {*} id - ID is provided by crypto library
   * @param {string} description - The task description
   * @param {TaskStatus[keyof TaskStatus]} status
   */
  constructor({ id = crypto.randomUUID(), description = "", status }) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

  /**
   * @param {TaskStatus[keyof TaskStatus]} status
   */
  setStatus(status) {
    this.status = status;
  }

  setDescription(description) {
    this.description = description;
  }

  static fromJSON(id, data) {
    return Task(id, data.description, data.status);
  }
}

class TaskManager {
  tasksObj = {};

  constructor() {
    if (TaskManager.instance) return TaskManager.instance;
    TaskManager.instance = this;
  }

  /**
   * @param {string} description
   * @param {TaskStatus} status
   */
  addTask(description, status) {
    const task = new Task({ description, status });
    tasksObj[task.id] = task;
  }

  removeTask(id) {
    delete this.tasksObj[id];
  }

  /**
   *
   * @param {*} id
   * @param {TaskStatus} status
   */
  changeStatus(id, status) {
    this.tasksObj[id].setStatus(status);
  }

  changeDescription(id, description){
    this.tasksObj[id].setDescription(description);
  }
}