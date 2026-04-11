import { TaskManager } from "./taskmanager.ts";

/**
 * 
 * @param {TaskStatus} filter - status to filter. 
 */
export function RenderTasks(filter = null) {
  let tasks = TaskManager.getInstance().getAllTasksObjects();
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