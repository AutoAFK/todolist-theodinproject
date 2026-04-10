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
    return new Task({ id, description: data.description, status: data.status });
  }
}

class TaskManager {
  tasksObj = {};

  constructor() {
    if (TaskManager.instance) return TaskManager.instance;
    TaskManager.instance = this;
    this.loadTasksFromDB();
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

  saveTasksDB() {
    const stringify = JSON.stringify(this.tasksObj);
    localStorage.setItem("tasks", stringify);
  }

  loadTasksFromDB() {
    const db = localStorage.getItem("tasks");
    if (db === null) return;

    const parsedDB = JSON.parse(db);
    for (const [key, value] of Object.entries(parsedDB)) {
      parsedDB[key] = Task.fromJSON(value.id, value);
    }
    Object.assign(this.tasksObj, parsedDB);
  }
}

const manager = new TaskManager();

const testingSave = false;

manager.displayAllTasks();

if (testingSave) {
  manager.addTask("Example 1: In Progress", Task.TaskStatus.inProgress)
  manager.addTask("Example 2: Urgent", Task.TaskStatus.urgent);
  manager.addTask("Example 3: Completed", Task.TaskStatus.completed);
  manager.saveTasksDB();
}