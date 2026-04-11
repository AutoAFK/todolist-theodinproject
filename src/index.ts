import { TodoManager } from "./todomanager.ts";
import {RenderTodos} from "./render.ts";
import { TodoStatus } from "./todo.ts";

const manager = new TodoManager();
manager.displayAllTodos();
const testingSave = false;
if (testingSave) {
  manager.addTodo("Example 1: In Progress", TodoStatus.InProgress);
  manager.addTodo("Example 2: Urgent", TodoStatus.Urgent);
  manager.addTodo("Example 3: Completed", TodoStatus.Completed);
  manager.saveTodosDB();
}

RenderTodos();