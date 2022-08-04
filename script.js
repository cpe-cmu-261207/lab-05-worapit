const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") {
    return;
  } else {
    if (inputAdd.value !== "") {
      addTodo(inputAdd.value, null);
      inputAdd.value = "";
    } else {
      return alert("Todo cannot be empty");
    }
  }
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  //append to todoCtn
  todoCtn.prepend(div);

  //mouse
  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  //define buttons event..
  doneBtn.onclick = () => {
    if (span.style.textDecoration == "line-through") {
      span.style.textDecoration = "";
    } else if (span.style.textDecoration !== "line-through") {
      span.style.textDecoration = "line-through";
    }
  };

  deleteBtn.onclick = () => {
    div.remove();
  };
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    todoObj.title = todoDiv.children[0].innerText;
    data.push(todoObj);
  }
  const dataStr = JSON.stringify(data);
  localStorage.setItem("TodoListData", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("TodoListData");
  const data = JSON.parse(dataStr);

  for (const todoObj of data) {
    addTodo(todoObj.title);
  }
}

loadTodo();
