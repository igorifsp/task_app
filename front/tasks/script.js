document
  .getElementById("editForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var newUsername = document.getElementById("editUsername").value;
    var newActivity = document.getElementById("editActivity").value;

    try {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      const email = storedUserData.email;

      // Enviar solicitação GET para obter os dados atualizados do usuário
      const getResponse = await fetch(`http://localhost:3000/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (getResponse.ok) {
        const userData = await getResponse.json();
        console.log("Dados do usuário (atualizados):", userData);

        // Enviar solicitação PUT para atualizar o perfil do usuário
        const putResponse = await fetch(
          `http://localhost:3000/users/${email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userData, // Utilizar dados originais do usuário
              username: newUsername,
              favoriteActivity: newActivity,
            }),
          }
        );

        if (putResponse.ok) {
          // Atualizar os valores na página
          document.getElementById("username").textContent = newUsername;
          document.getElementById("favoriteActivity").textContent = newActivity;
          closeSidebar();
        } else {
          console.error("Erro ao atualizar usuário:", putResponse.statusText);
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
  });

document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    document.getElementById("username").textContent = userData.username;
    document.getElementById("favoriteActivity").textContent =
      userData.favoriteActivity;
  }

  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      localStorage.removeItem("userData");
      window.location.href = "../login/index.html";
    });
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

          window.location.href = "../login/index.html";
        } else {
          console.error("Erro ao excluir conta:", deleteResponse.statusText);
        }
      } catch (error) {
        console.error("Erro ao enviar solicitação DELETE:", error.message);
      }
    }
  });
