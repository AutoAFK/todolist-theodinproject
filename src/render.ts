import { TodoManager } from "./todomanager.ts";

export function RenderTodos(parent: Element | null,filter = null) {
  if (parent === null) return;
  let todos = TodoManager.getInstance().getAllTodosObjects();
  todos =
    filter === null ? todos : todos.filter((todo) => todo.status === filter);
  const container = document.createElement("div");
  todos.forEach((todo) => {
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

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