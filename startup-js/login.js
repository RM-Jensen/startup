function login() {
    const nameEl = document.querySelector("#username");
    const pwdEl = document.querySelector("#password");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pwdEl.value);
    window.location.href = "play.html";
  }