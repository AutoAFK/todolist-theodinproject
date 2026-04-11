export enum TaskStatus {
  InProgress = "In Progress",
  Completed = "Completed",
  Urgent = "Urgent",
};

export class Task {
  id: string;
  description: string;
  status: TaskStatus;

  constructor({ id = crypto.randomUUID() as string, description = "", status = TaskStatus.InProgress }) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

  /**
   * @param {TaskStatus[keyof TaskStatus]} status
   */
  setStatus(status: TaskStatus) {
    this.status = status;
  }

  setDescription(description: string) {
    this.description = description;
  }

  static fromJSON(id: string, data: Task) {
    return new Task({ id, description: data.description, status: data.status });
  }
}