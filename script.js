let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(status){

let title = prompt("Enter task title");
if(!title) return;

let priority = prompt("Enter priority (low / medium / high)","medium");

let task={
id:Date.now(),
title:title,
status:status,
priority:priority
};

tasks.push(task);

saveTasks();
renderTasks();

}

function deleteTask(id){

tasks = tasks.filter(task=>task.id!=id);

saveTasks();
renderTasks();

}

function editTask(id){

let task = tasks.find(t=>t.id==id);

let newTitle = prompt("Edit task",task.title);

if(newTitle){
task.title=newTitle;
}

saveTasks();
renderTasks();

}

function renderTasks(){

document.querySelectorAll(".task-list").forEach(col=>{
col.innerHTML="";
});

tasks.forEach(task=>{

let div=document.createElement("div");
div.className="task";
div.draggable=true;
div.dataset.id=task.id;

div.innerHTML=`
<span class="priority ${task.priority}">${task.priority}</span>
${task.title}
<button onclick="editTask(${task.id})">✏</button>
<button onclick="deleteTask(${task.id})">❌</button>
`;

div.addEventListener("dragstart",dragStart);

document.getElementById(task.status).appendChild(div);

});

}

function dragStart(e){
e.dataTransfer.setData("id",e.target.dataset.id);
}

document.querySelectorAll(".task-list").forEach(col=>{

col.addEventListener("dragover",e=>{
e.preventDefault();
});

col.addEventListener("drop",dropTask);

});

function dropTask(e){

let id=e.dataTransfer.getData("id");

let task=tasks.find(t=>t.id==id);

task.status=e.target.closest(".task-list").id;

saveTasks();
renderTasks();

}

function toggleTheme(){
document.body.classList.toggle("dark");
}

function searchTask(){

let input=document.getElementById("search").value.toLowerCase();

document.querySelectorAll(".task").forEach(task=>{

let text=task.innerText.toLowerCase();

task.style.display=text.includes(input)?"block":"none";

});

}

renderTasks();