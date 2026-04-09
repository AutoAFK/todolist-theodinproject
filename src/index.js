class Task {
  /** @enum {string} */
  static TaskStatus = {
    inProgress: "In Progress",
    completed: "Completed",
    urgent: "Urgent",
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
  addTask(description, status = Task.TaskStatus.inProgress) {
    const task = new Task({ description, status });
    this.tasksObj[task.id] = task;
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

  changeDescription(id, description) {
    this.tasksObj[id].setDescription(description);
  }

  displayAllTasks() {
    for (const task of Object.values(this.tasksObj)) {
      console.table({
        ID: task.id,
        DESCRIPTION: task.description,
        STATUS: task.status,
      });
    }
  }
}

const manager = new TaskManager();
manager.addTask("First task");
manager.addTask("Second task");

manager.displayAllTasks();