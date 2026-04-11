import { Task, TaskStatus } from "./task.ts";

interface TasksList {
  [id: string]: Task;
}

export class TaskManager {
  tasksObj: TasksList = {};
  private static instance: TaskManager;

  constructor() {
    if (TaskManager.instance) return TaskManager.instance;
    TaskManager.instance = this;
    this.loadTasksFromDB();
  }

  static getInstance() {
    return this.instance;
  }

  addTask(description: string, status = TaskStatus.InProgress) {
    const task = new Task({ description, status });
    this.tasksObj[task.id] = task;
  }

  removeTask(id: string) {
    delete this.tasksObj[id];
  }

  changeStatus(id: string, status: TaskStatus) {
    const task = this.tasksObj[id];
    task?.setStatus(status);
  }

  changeDescription(id: string, description: string) {
    const task = this.tasksObj[id];
    task?.setDescription(description);
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

    const parsedDB: TasksList = JSON.parse(db);
    for (const [key, value] of Object.entries(parsedDB)) {
      parsedDB[key] = Task.fromJSON(value.id, value);
    }
    Object.assign(this.tasksObj, parsedDB);
  }
}

