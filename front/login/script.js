document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (password.length < 8 || password.length > 16) {
      alert("A senha deve ter entre 8 e 16 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirecionar para a página tasks
        window.location.href = "../tasks/index.html";
      } else {
        const responseData = await response.json();
        console.error("Erro de login:", responseData.error);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error.message);
    }
  });
