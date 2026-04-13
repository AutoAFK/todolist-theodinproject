import { Todo, TodoStatus } from "./todo.ts";

interface ITodo {
  [id: string]: Todo;
}

export class TodoManager {
  todosObj: ITodo = {};
  private static instance: TodoManager;

  constructor() {
    if (TodoManager.instance) return TodoManager.instance;
    TodoManager.instance = this;
    this.loadTodosFromDB();
  }

  static getInstance() {
    return this.instance;
  }

  addTodo(description: string, status = TodoStatus.InProgress) {
    const todo = new Todo({ description, status });
    this.todosObj[todo.id] = todo;
  }

  removeTodo(id: string) {
    delete this.todosObj[id];
  }

  changeStatus(id: string, status: TodoStatus) {
    const todo = this.todosObj[id];
    todo?.setStatus(status);
  }

  changeDescription(id: string, description: string) {
    const todo = this.todosObj[id];
    todo?.setDescription(description);
  }

  /**
   * @returns {Array<Todo>} - the task objects array
   */
  getAllTodosObjects() {
    return Object.values(this.todosObj);
  }

  displayAllTodos() {
    for (const task of Object.values(this.todosObj)) {
      console.table({
        ID: task.id,
        DESCRIPTION: task.description,
        STATUS: task.status,
      });
    }
  }

  saveTodosDB() {
    const stringify = JSON.stringify(this.todosObj);
    localStorage.setItem("todos", stringify);
  }

  loadTodosFromDB() {
    const db = localStorage.getItem("todos");
    if (db === null) return;

    const parsedDB: ITodo = JSON.parse(db);
    for (const [key, value] of Object.entries(parsedDB)) {
      parsedDB[key] = Todo.fromJSON(value.id, value);
    }
    Object.assign(this.todosObj, parsedDB);
  }
}

