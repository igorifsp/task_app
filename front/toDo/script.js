function createTask() {
  let div = document.createElement("div");
  div.classList.add("tasks");

  let checkIcon = document.createElement("i");
  checkIcon.classList.add("fa-solid", "fa-circle-check");

  let editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit-delete");

  let taskPara = document.createElement("p");
  taskPara.textContent = "Praticar 30 minutos de yoga";

  let iconsDiv = document.createElement("div");
  iconsDiv.classList.add("icons");

  let editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editIcon.style.color = "blue";
  editIcon.style.cursor = "pointer";
  editIcon.addEventListener("click", function () {
    console.log("Editar tarefa");
  });

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "delete");
  deleteIcon.style.color = "red";
  deleteIcon.style.cursor = "pointer";
  deleteIcon.addEventListener("click", function () {
    console.log("Excluir tarefa");
    div.remove();
  });

  iconsDiv.appendChild(editIcon);
  iconsDiv.appendChild(deleteIcon);

  editDeleteDiv.appendChild(checkIcon);
  editDeleteDiv.appendChild(taskPara);
  editDeleteDiv.appendChild(iconsDiv);

  div.appendChild(editDeleteDiv);

  document.getElementById("taskContainer").appendChild(div);
}

function openSidebar() {
  document.getElementById('sidebar').style.display = "block";
}

function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}

document
  .getElementById("editForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Obter os valores do formulário
    var newUsername = document.getElementById("editUsername").value;
    var newActivity = document.getElementById("editActivity").value;
    // Atualizar os valores na página
    document.getElementById("username").textContent = newUsername;
    document.getElementById("favoriteActivity").textContent = newActivity;
    closeSidebar();
  });

