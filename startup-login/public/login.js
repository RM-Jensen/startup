
function login() {
  const nameEl = document.querySelector("#username");
  const pwdEl = document.querySelector("#password");
  localStorage.setItem("userName", nameEl.value);
  await(loginOrCreate(nameEl, pwdEl, `/api/auth/create`))
  window.location.href = "play.html";
}

function register() {
  const nameEl = document.querySelector("#newUsername");
  const pwdEl = document.querySelector("#newPassword");
  localStorage.setItem("userName", nameEl.value);
  await(loginOrCreate(nameEl, pwdEl, `/api/auth/create`))
  window.location.href = "play.html";
}

async function loginOrCreate(userName, password, endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ email: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
    window.location.href = 'play.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}