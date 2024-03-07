function toggleTaskInput() {
  const inputElement = document.getElementById("taskDescriptionInput");

  if (inputElement.style.display === "none") {
    inputElement.style.display = "inline-block";
  } else {
    inputElement.style.display = "none";
  }
}

function addTask() {
  const taskDescription = document
    .getElementById("taskDescriptionInput")
    .value.trim();

  if (!taskDescription) {
    return;
  }

  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const taskData = {
    title: null,
    description: taskDescription,
    isCompleted: false,
    emailUser: storedUserData.email,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  };

  fetch("http://localhost:3000/tasks/", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao criar a tarefa");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Tarefa criada com sucesso:", data);
    })
    .catch((error) => {
      console.error("Erro ao criar a tarefa:", error);
    });

  let div = document.createElement("div");
  div.classList.add("tasks");

  let checkIcon = document.createElement("i");
  checkIcon.classList.add("fa-solid", "fa-circle-check");

  let editDeleteDiv = document.createElement("div");
  editDeleteDiv.classList.add("edit-delete");

  let taskPara = document.createElement("p");
  taskPara.textContent = taskDescription;

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

document.addEventListener("DOMContentLoaded", function () {
  function formatTask(task) {
    let div = document.createElement("div");
    div.classList.add("tasks");

    let checkIcon = document.createElement("i");
    checkIcon.classList.add("fa-solid", "fa-circle-check");

    let editDeleteDiv = document.createElement("div");
    editDeleteDiv.classList.add("edit-delete");

    let taskPara = document.createElement("p");
    taskPara.textContent = task.description;

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
      const idTask = task.idTask;

      deleteTask(idTask);

      div.remove();
    });

    iconsDiv.appendChild(editIcon);
    iconsDiv.appendChild(deleteIcon);
    editDeleteDiv.appendChild(checkIcon);
    editDeleteDiv.appendChild(taskPara);
    editDeleteDiv.appendChild(iconsDiv);
    div.appendChild(editDeleteDiv);

    return div;
  }

  function deleteTask(idTask) {
    fetch(`http://localhost:3000/tasks/${idTask}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir a tarefa");
        }
        console.log("Tarefa excluída com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir a tarefa:", error);
      });
  }

  function getUserTasks() {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const email = storedUserData.email;

    fetch(`http://localhost:3000/tasks/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao obter as tarefas do usuário");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tarefas do usuário:", data);
        const taskContainer = document.getElementById("taskContainer");
        taskContainer.innerHTML = "";

        data.forEach((task) => {
          const formattedTask = formatTask(task);
          taskContainer.appendChild(formattedTask);
        });
      })
      .catch((error) => {
        console.error("Erro ao obter as tarefas do usuário:", error);
      });
  }

  getUserTasks();

  function openSidebar() {
    document.getElementById("sidebar").style.display = "block";
  }

  function closeSidebar() {
    document.getElementById("sidebar").style.display = "none";
  }

  function updateUsername() {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      document.getElementById("username").textContent = storedUserData.username;
    }
  }

  const editIcon = document.getElementById("editIcon");
  if (editIcon) {
    editIcon.addEventListener("click", function () {
      openSidebar();
    });
  } else {
    console.error("Elemento editIcon não encontrado.");
  }

  const closeIcon = document.querySelector(".closebtn");
  if (closeIcon) {
    closeIcon.addEventListener("click", function () {
      closeSidebar();
    });
  } else {
    console.error("Elemento closeIcon não encontrado.");
  }

  const gearIcon = document.getElementById("editIcon");
  if (gearIcon) {
    gearIcon.addEventListener("click", function () {
      openSidebar();
    });
  } else {
    console.error("Elemento gearIcon não encontrado.");
  }

  const settingsText = document.querySelector(".btnConfig");
  if (settingsText) {
    settingsText.addEventListener("click", function () {
      openSidebar();
    });
  } else {
    console.error("Elemento settingsText não encontrado.");
  }

  document
    .getElementById("editForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      var newUsername = document.getElementById("editUsername").value;
      var newActivity = document.getElementById("editActivity").value;

      if (newUsername && newActivity) {
        try {
          const storedUserData = JSON.parse(localStorage.getItem("userData"));
          const email = storedUserData.email;

          const getResponse = await fetch(
            `http://localhost:3000/users/${email}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (getResponse.ok) {
            const userData = await getResponse.json();
            console.log("Dados do usuário (atualizados):", userData);

            const putResponse = await fetch(
              `http://localhost:3000/users/${email}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...userData,
                  username: newUsername,
                  favoriteActivity: newActivity,
                }),
              }
            );

            if (putResponse.ok) {
              document.getElementById("username").textContent = newUsername;
              document.getElementById("favoriteActivity").textContent =
                newActivity;
              closeSidebar();
            } else {
              console.error(
                "Erro ao atualizar usuário:",
                putResponse.statusText
              );
            }
          } else {
            console.error(
              "Erro ao obter dados do usuário:",
              getResponse.statusText
            );
          }
        } catch (error) {
          console.error("Erro ao enviar dados para a API:", error.message);
        }
      } else {
        console.error("Por favor, preencha todos os campos.");
      }
    });

  document
    .getElementById("deleteIcon")
    .addEventListener("click", async function () {
      var confirmDelete = confirm("Tem certeza que deseja excluir sua conta?");
      if (confirmDelete) {
        try {
          const storedUserData = JSON.parse(localStorage.getItem("userData"));
          const email = storedUserData.email;

          const deleteResponse = await fetch(
            `http://localhost:3000/users/${email}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (deleteResponse.ok) {
            localStorage.removeItem("userData");
            window.location.href = "../login/";
          } else {
            const errorMessage = await deleteResponse.json();
            if (errorMessage.error.includes("foreign key constraint")) {
              alert(
                "Exclua primeiro suas tasks, para depois excluir sua conta"
              );
            } else {
              console.error(
                "Erro ao excluir conta:",
                deleteResponse.statusText
              );
            }
          }
        } catch (error) {
          console.error("Erro ao enviar solicitação DELETE:", error.message);
        }
      }
    });

  updateUsername();

  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      localStorage.removeItem("userData");
      window.location.href = "../login/";
    });
});
