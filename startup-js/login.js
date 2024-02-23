function login() {
    const nameEl = document.querySelector("#loginUsername");
    const pwdEl = document.querySelector("#loginPwd");
    localStorage.setItem("userName", nameEl.value);
    localStorage.setItem("password", pwdEl.value);
    window.location.href = "play.html";
  }