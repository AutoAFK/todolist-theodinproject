export enum TodoStatus {
  InProgress = "InProgress",
  Completed = "Completed",
  Urgent = "Urgent",
};

export class Todo {
  id: string;
  description: string;
  status: TodoStatus;

  constructor({ id = crypto.randomUUID() as string, description = "", status = TodoStatus.InProgress }) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

  /**
   * @param {TodoStatus[keyof TodoStatus]} status
   */
  setStatus(status: TodoStatus) {
    this.status = status;
  }

  setDescription(description: string) {
    this.description = description;
  }

  static fromJSON(id: string, data: Todo) {
    return new Todo({ id, description: data.description, status: data.status });
  }
}