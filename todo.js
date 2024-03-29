let task = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");

function addToDom(tasks){
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" id="${tasks.id}" ${tasks.done ? 'checked':''}class="custom-checkbox">
        <label for="${tasks.id}">${tasks.tasktext}</label>
        <img src="bin.svg" class="delete" data-id="${tasks.id}" />
    `;
    taskList.append(li);
}
function renderList(){
    taskList.innerHTML = '';
    for(let i = 0; i <= task.length; i++){
        addToDom(task[i]);
    }
    taskCounter.innerHTML = task.length;

}

function markAsComplete(taskid){
    const markTask = task.filter((task)=>{
        return task.id == taskid
    });
    if(markTask.length > 0){
        currentTask = markTask[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("The task toggle successfully");
        return
    }
    showNotification("The task toggle was not Done");

}

function deleteTask(taskid){
    const newTask = task.filter(function(tasks){
        return tasks.id != taskid;
    });
    task = newTask;
    renderList();
    showNotification("Task Delete Successfully");
}

function addTask(tasks){
    if(tasks){
        task.push(tasks)
        renderList()
        showNotification("Task add successfully")
    }
    else{
        showNotification("Task will not added")
    }
}

function showNotification(text){
    alert(text)
}

function handelInput(e){
    if(e.key == 'Enter'){
        const text = e.target.value;
        if(!text){
            showNotification("Task text can not be empty");
            return
        }
        const task = {
            tasktext: text,
            id : Date.now().toString(),
            done : false
        }
        addTask(task)
        
        e.target.value="";
        
    }
    
}

addTaskInput.addEventListener('keyup', handelInput);