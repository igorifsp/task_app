document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Capturando os valores dos campos do formulário
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var username = document.getElementById("username").value;
    var favoriteActivity = document.getElementById("favoriteActivity").value;

    try {
      // Enviando os dados para a API
      const response = await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
          favoriteActivity: favoriteActivity,
        }),
      });

      if (response.ok) {
        // Se o usuário foi criado com sucesso, redirecione para outra página, por exemplo, a página de login
        window.location.href = "../login/index.html";
      } else {
        // Se houver algum erro na criação do usuário, exiba uma mensagem de erro
        const responseData = await response.json();
        console.error("Erro:", responseData.error);
        // Exemplo de exibição de erro na página HTML
        // document.getElementById('error-message').textContent = responseData.error;
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error.message);
      // Exemplo de exibição de erro na página HTML
      // document.getElementById('error-message').textContent = 'Erro ao enviar dados para a API';
    }
  });
