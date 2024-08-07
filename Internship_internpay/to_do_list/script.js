const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todolist = document.getElementById("todoList");
const removebtn=document.getElementsByClassName("btn")
// const removebtn=document.querySelectorAll("button")
let editTodo = null;
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something in your to do");
    return false;
  }
  if (addBtn.value === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
   //console.log(editTodo.target.parentElement)
   deleteLocalTodos(editTodo.target.parentElement)
   saveLocalTodos(inputText)
   for(let i=0;i<removebtn.length;i++)
    {
       
        removebtn.item(i).disabled=false;
    }
    addBtn.value = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("btn", "editbtn");
    li.appendChild(edit);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deletebtn");
    li.appendChild(deleteBtn);
    todolist.appendChild(li);
    inputBox.value = "";
    saveLocalTodos(inputText);
  }
};
const updateTodo = (e) => {
  if (e.target.innerHTML === "Remove") {
    todolist.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement)
  }
  if (e.target.innerHTML === "Edit") {

    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    //console.log(removebtn)
    for(let i=0;i<removebtn.length;i++)
        {
           
            removebtn.item(i).disabled=true;
        }
// removebtn.forEach(btn => {
//         console.log(btn);
//     });
   
    addBtn.value = "Edit";

    editTodo = e;
  }
};

const saveLocalTodos = (todo) => {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  //console.log(todos)
};
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const edit = document.createElement("button");
      edit.innerText = "Edit";
      edit.classList.add("btn", "editbtn");
      li.appendChild(edit);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deletebtn");
      li.appendChild(deleteBtn);
      todolist.appendChild(li);
    });
  }
};

const deleteLocalTodos=(todo)=>{
    let todos = [];
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todotext=todo.children[0].innerHTML;
    let todoIndex=todos.indexOf(todotext);
    todos.splice(todoIndex,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodos)

todolist.addEventListener("click", updateTodo);
addBtn.addEventListener("click", addTodo);
