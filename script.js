const input=document.querySelector("#task-input");
const addBtn=document.querySelector("#add-btn");
const list=document.querySelector("#task-list");
let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function renderTasks(){
    list.innerHTML="";
    tasks.forEach((task,index)=>{
        const li=document.createElement("li");
        li.textContent=task.text;
        if(task.done) li.classList.add("completed");
        li.addEventListener("click",()=>{
            tasks[index].done=!tasks[index].done;
            saveTasks();
            renderTasks();
        });
        const delBtn=document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.addEventListener("click",(e)=>{
            e.stopPropagation();
            tasks.splice(index,1);
            saveTasks();
            renderTasks();
        });
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
addBtn.addEventListener("click",()=>{
    const text=input.value.trim();
    if(text==="") return;
    tasks.push({text:text,done:false});
    saveTasks();
    input.value="";
    renderTasks();
});renderTasks();