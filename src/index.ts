import { TaskManager } from "./taskmanager.ts";
import {RenderTasks} from "./render.ts";
import { TaskStatus } from "./task.ts";

const manager = new TaskManager();
manager.displayAllTasks();
const testingSave = false;
if (testingSave) {
  manager.addTask("Example 1: In Progress", TaskStatus.InProgress);
  manager.addTask("Example 2: Urgent", TaskStatus.Urgent);
  manager.addTask("Example 3: Completed", TaskStatus.Completed);
  manager.saveTasksDB();
}

RenderTasks();