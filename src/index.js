class Task {
  /** @enum {string} */
  static TaskStatus = {
    1: "In Progress",
    2: "Completed",
    3: "Urgent",
  };

  /**
   *
   * @param {*} id - ID is provided by crypto library
   * @param {string} description - The task description
   * @param {TaskStatus[keyof TaskStatus]} status
   */
  constructor(id = crypto.randomUUID(), description = "", status) {
    this.id = id;
    this.description = description;
    this.status = status;
  }

  /**
   * @param {TaskStatus[keyof TaskStatus]} status
   */
  setStatus(status) {
    this.status = status;
  }

  setDescription(description) {
    this.description = description;
  }

  static fromJSON(id, data) {
    return Task(id, data.description, data.status);
  }
}
