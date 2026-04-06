# Todo List Project

## Disclaimer

As of 07-April 2026 this project will be the most basic implementation possible which will include:

- Creating a task
- Removing a task
- Save all tasks
- Display all on completed and still going

Later on I will add more and more ideas as I get to more advance concepts of TheOdinProject.

## Brainstorming Ideas

So I have used some todo list applications and I have seen myself with the following:

- Most of the apps doesn't have a "Note" or something similar to brainstorm a project before starting it.
- Some applications doesn't let you assign subtasks
- Saving the project always require an account, I would to use something that already exists, like google account
any maybe store the information inside of it.
- The visual on phone users are bad. [Clickup](https://clickup.com/) for example cannot be used as an admin on the phone.
- None of them let you do documentation too.

What I would like to keep from the apps:

- General design is great, might need to create custom date picker as I didn't find anything that I like.
- Collaborate, might be a little bit challenging.

Some new ideas to add:

- A template for a task or project can be amazing.
- Notification about tasks that need to be completed.
- Some gadets like timers for tasks (something like [pomofocus](https://pomofocus.io/))

## System Design

### Task

```json
{
  "project-id": "UUID",
  "id": "UUID But can also be just a number",
  "title": "hello",
  "description": "longer text would be here",
  "creation": "date of creation",
  "end-date": "the end date assigned to the task",
  "completed": false,
  "archived": false,
}
```

For the beginning I think I would focous more on how the task would be outside of a group. Only later on I should implement anything about grouping.

- Should display completed tasks on another list rather than the same list.
