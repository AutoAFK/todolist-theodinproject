import { TodoManager } from "./todomanager.ts";
import { TodoStatus } from "./todo.ts";
import "./styles/main.css";
import MainPage from "./MainPage.ts";

const content = document.querySelector("#content");

const manager = new TodoManager();
manager.displayAllTodos();
const testingSave = false;
if (testingSave) {
  manager.addTodo("Example 1: In Progress", TodoStatus.InProgress);
  manager.addTodo("Example 2: Urgent", TodoStatus.Urgent);
  manager.addTodo("Example 3: Completed", TodoStatus.Completed);
  manager.saveTodosDB();
}

MainPage(content!);