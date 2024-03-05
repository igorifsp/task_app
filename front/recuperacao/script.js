document
  .getElementById("recoveryForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = document.getElementById("recoveryEmail").value;
    var favoriteActivityInput =
      document.getElementById("favoriteActivity").value;
    var newPasswordField = document.getElementById("newPasswordField");
    var newPassword = document.getElementById("newPassword").value;
    var emailError = document.getElementById("emailError");
    var activityError = document.getElementById("activityError");
    var passwordError = document.getElementById("passwordError");

    emailError.textContent = "";
    activityError.textContent = "";
    passwordError.textContent = "";

    if (!email) {
      emailError.textContent = "Por favor, preencha o e-mail.";
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("Dados do usuário:", userData);

        if (!userData || !userData.favoriteActivity) {
          emailError.textContent = "Este e-mail não está cadastrado.";
          return;
        }

        document.getElementById("favoriteActivityField").style.display =
          "block";

        if (favoriteActivityInput) {
          if (userData.favoriteActivity === favoriteActivityInput) {
            newPasswordField.style.display = "block";

            if (!newPassword) {
              passwordError.textContent =
                "Por favor, preencha o campo Nova Senha.";
              return;
            }

            if (newPassword.length < 8 || newPassword.length > 16) {
              alert("A senha deve ter entre 8 e 16 caracteres.");
              return;
            }

            try {
              const putResponse = await fetch(
                `http://localhost:3000/users/${email}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ...userData, // Manter os dados originais do usuário
                    password: newPassword, // Atualizar apenas a senha
                  }),
                }
              );

              if (putResponse.ok) {
                console.log("Senha atualizada com sucesso.");
                // Redirecionar para a página de login
                window.location.href = "../login/index.html";
              } else {
                console.error("Erro ao atualizar a senha.");
              }
            } catch (error) {
              console.error("Erro ao enviar a solicitação PUT:", error.message);
            }
          } else {
            activityError.textContent =
              "A atividade favorita não corresponde ao usuário.";
            newPasswordField.style.display = "none";
          }
        }
      } else {
        emailError.textContent =
          "Não foi possível encontrar um usuário com esse e-mail.";
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error.message);
    }
  });
