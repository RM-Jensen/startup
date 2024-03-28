
async function login() {
  const userName = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  localStorage.setItem("userName", userName);
  await loginOrCreate(userName, password, `/api/auth/login`);
  window.location.href = "play.html";
}

async function register() {
  const userName = document.querySelector("#newUsername").value;
  const password = document.querySelector("#newPassword").value;
  localStorage.setItem("userName", userName);
  await loginOrCreate(userName, password, `/api/auth/create`);
  window.location.href = "play.html";
}

async function loginOrCreate(userName, password, endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    credentials: 'include', // Don't forget to specify this if you need cookies
    body: JSON.stringify({ userName: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', userName);
//    window.location.href = 'play.html';
  } else {
    const body = await response.json();
    const modalEl = document.querySelector('#msgModal');
    modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
    const msgModal = new bootstrap.Modal(modalEl, {});
    msgModal.show();
  }
}