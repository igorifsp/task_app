document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    document.getElementById("username").textContent = userData.username;
    document.getElementById("favoriteActivity").textContent =
      userData.favoriteActivity;
  }

  // "Sair"
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      localStorage.removeItem("userData");
      window.location.href = "../login/index.html";
    });
});
