import type { TodoStatus } from "./todo.ts";
import { TodoManager } from "./todomanager.ts";

export function RenderTodos(parent: Element | null,filter: TodoStatus | null) {
  if (parent === null) return;
  document.querySelector("#todos-container")?.remove();
  let todos = TodoManager.getInstance().getAllTodosObjects();
  todos =
    filter === null ? todos : todos.filter((todo) => todo.status === filter);
  const container = document.createElement("div");
  container.id = "todos-container"
  todos.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    todoContainer.dataset.id = todo.id;

    const description = document.createElement("p");
    description.classList.add("todo-description");
    description.textContent = todo.description;

    const status = document.createElement("p");
    status.classList.add("todo-status");
    status.textContent = todo.status;

    todoContainer.append(description, status);
    container.append(todoContainer);
  });
  parent.append(container);
  console.log(container);
}

