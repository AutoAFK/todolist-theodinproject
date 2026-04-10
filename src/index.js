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

  /**
   * @returns {Array<Task>} - the task objects array
   */
  getAllTasksObjects() {
    return Object.values(this.tasksObj);
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

manager.displayAllTasks();

const testingSave = false;
if (testingSave) {
  manager.addTask("Example 1: In Progress", Task.TaskStatus.inProgress);
  manager.addTask("Example 2: Urgent", Task.TaskStatus.urgent);
  manager.addTask("Example 3: Completed", Task.TaskStatus.completed);
  manager.saveTasksDB();
}

const testingChangeStatus = false;
if (testingChangeStatus) {
  manager.changeStatus(
    Object.keys(manager.tasksObj)[0],
    Task.TaskStatus.inProgress,
  );
  console.clear();
  manager.displayAllTasks();
}

const testingRemoveTask = false;
if (testingRemoveTask) {
  manager.addTask("Dummy Task");
  console.clear();
  manager.displayAllTasks();
  const keysArray = Object.keys(manager.tasksObj);
  manager.removeTask(keysArray[keysArray.length - 1]);
  manager.displayAllTasks();
}

const testingChangeDescription = false;
if (testingChangeDescription) {
  manager.addTask("Dummy Task");
  console.clear();
  manager.displayAllTasks();
  const keysArray = Object.keys(manager.tasksObj);
  manager.changeDescription(
    keysArray[keysArray.length - 1],
    "Dummy description changed",
  );
  manager.displayAllTasks();
}

/**
 * 
 * @param {TaskStatus} filter - status to filter. 
 */
function RenderTasks(filter = null) {
  let tasks = manager.getAllTasksObjects();
  tasks =
    filter === null ? tasks : tasks.filter((task) => task.status === filter);
  const container = document.createElement("div");
  tasks.forEach((task) => {
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const description = document.createElement("p");
    description.classList.add("task-description");
    description.textContent = task.description;

    const status = document.createElement("p");
    status.classList.add("task-status");
    status.textContent = task.status;

    taskContainer.append(description, status);
    container.append(taskContainer);
  });
  console.log(container);
}

RenderTasks();