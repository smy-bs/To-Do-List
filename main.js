let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let topUnderline = document.getElementById("under-line");
let taskList = [];
let task = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});

taskInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    Filter(event);
  });
}
function addTask() {
  //let taskContent = taskInput.value;

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
            <div class="task-done"><span>${list[i].taskContent}</span></div>
           
            <div>
               <button onclick="toggleComplete('${list[i].id}')" class="check"><i class="fa-solid fa-check"></i></button>
               <button onclick="deleteTask('${list[i].id}')" class="delete"><i class="fa-solid fa-trash"></i></button>
           </div>
           
           </div>
            `;
    } else {
      resultHTML += `<div class="task">
        <div> ${list[i].taskContent}</div>
       
        <div>
           <button onclick="toggleComplete('${list[i].id}')" class="check"><i class="fa-solid fa-check"></i></button>
           <button onclick="deleteTask('${list[i].id}')" class="delete"><i class="fa-solid fa-trash"></i></button>
       </div>
       
       </div>
       
        `;
    }

    //     resultHTML += `<div class="task">
    //     <div> ${taskList[i].taskContent}</div>

    //     <div>
    //        <button onclick="toggleComplete('${taskList[i].id}')" class="check"><i class="fa-solid fa-check"></i></button>
    //        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    //    </div>

    //    </div>

    //     `;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }

  console.log(taskList);
  //  render();
  Filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  // render();
  Filter();
}

function Filter(e) {
  if (e) {
    mode = e.target.id;
    topUnderline.style.width = e.target.offsetWidth + "px";
    topUnderline.style.left = e.target.offsetLeft + "px";
    topUnderline.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("going", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
