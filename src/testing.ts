// import { Task } from "./task.js";
// import { manager } from "./taskmanager.js";

// export const Testing = {
//   changeStatus: testChangeStatus,
//   removeTask: testRemoveTask,
//   changeDescription: testChangeDescription,
// };

// /**
//  * 
//  * @returns The key to the dummy task.
//  */
// function addTestingTask(){
//   manager.addTask("Dummy Task");
//   let dummyTaskKey = Object.keys(manager.getAllTasksObjects);
//   dummyTaskKey = dummyTaskKey[dummyTaskKey.length - 1];
//   return dummyTaskKey;
// }

// function testChangeStatus() {
//   const dummyKey = addTestingTask();
//   manager.changeStatus(
//     dummyKey,
//     Task.TaskStatus.completed,
//   );
  
//   console.clear();
//   manager.displayAllTasks();
// }
// function testRemoveTask() {
//   console.clear();
//   manager.displayAllTasks();
//   const keysArray = Object.keys(manager.tasksObj);
//   manager.removeTask(keysArray[keysArray.length - 1]);
//   manager.displayAllTasks();
// }

// function testChangeDescription() {
//   manager.addTask("Dummy Task");
//   console.clear();
//   manager.displayAllTasks();
//   const keysArray = Object.keys(manager.tasksObj);
//   manager.changeDescription(
//     keysArray[keysArray.length - 1],
//     "Dummy description changed",
//   );
//   manager.displayAllTasks();
// }
