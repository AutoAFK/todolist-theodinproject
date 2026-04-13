import { RenderTodos } from "../todo/render";
import { TodoStatus } from "../todo/todo";
import { TodoManager } from "../todo/todomanager";

export function RenderAddTodo(parent: Element) {
  const btnAddTodo = document.createElement("button");
  btnAddTodo.textContent = "ADD TODO";
  const dialogAddTodoContainer = document.createElement("dialog");

  const todoDescription = document.createElement("input");
  todoDescription.type = "text";

  const todoStatus = document.createElement("select");
  for (const status of Object.keys(TodoStatus)) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    todoStatus.append(option);
  }

  const clearInputs = () => {
    todoDescription.value = "";
    todoStatus.value = TodoStatus.InProgress;
  }

  const addTodo = document.createElement("button");
  addTodo.textContent = "Add";
  addTodo.onclick = () => {
    TodoManager.getInstance().addTodo(todoDescription.value, todoStatus.value as TodoStatus);
    clearInputs();
    RenderTodos(parent,null);
    dialogAddTodoContainer.close();
  }

  const closeDialog = document.createElement("button");
  closeDialog.textContent = "Close";
  closeDialog.onclick = () => {
    clearInputs();
    dialogAddTodoContainer.close();
  }

  dialogAddTodoContainer.append(todoDescription, todoStatus, addTodo, closeDialog);

  btnAddTodo.addEventListener("click", () => {
    dialogAddTodoContainer.showModal();
  })

  parent.append(btnAddTodo,dialogAddTodoContainer);
}