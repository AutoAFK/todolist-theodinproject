import { RenderTodos } from "./render";
import { Todo, TodoStatus } from "./todo";

export default function MainPage(container: Element) {

  let filter = null;

  const filterContainer = document.createElement("div");
  filterContainer.classList.add("todo-filter-container");

  const dropdownFilterLabel = document.createElement("label");
  dropdownFilterLabel.textContent = "Status Filter:";
  dropdownFilterLabel.classList.add("todo-filter-label");
  dropdownFilterLabel.htmlFor = "todosFilter"

  const dropdownFilter = document.createElement("select");
  dropdownFilter.id = "todosFilter";
  dropdownFilter.classList.add("todo-filter");
  dropdownFilter.addEventListener("change", (event)=>{
    const target = event.target as HTMLOptionElement;
    filter = target.value === "" ? null : target.value as TodoStatus;
    document.querySelector("#todos-container")?.remove();
    RenderTodos(container,filter);
  });

  const optionAll = document.createElement("option");
  optionAll.value = "";
  optionAll.textContent = "All";
  dropdownFilter.append(optionAll);

  for (const status of Object.keys(TodoStatus)) {
    const option = document.createElement("option");
    option.value = status;
    option.textContent = status;
    dropdownFilter.append(option);
  }

  filterContainer.append(dropdownFilterLabel,dropdownFilter);

  container.append(filterContainer);

  RenderTodos(container,filter);
}