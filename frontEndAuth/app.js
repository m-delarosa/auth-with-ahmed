const loginForm = document.querySelector(".login")
const getUsersButton = document.querySelector("#get-users")

loginForm.addEventListener("submit", handleLogin)
getUsersButton.addEventListener("click", handleGetUsers)

function handleLogin(event) {
  // event.preventDefault()
  const loginFormData = new FormData(event.target)

  const username = loginFormData.get("username")
  const password = loginFormData.get("password")

  const loginBody = { username, password }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.token)
      localStorage.setItem("token", result.token)
      // localStorage.setItem takes a key ("token") and value (result.token) to
      // store it in localStorage. You can view this in DevTools by going to the
      // "Application" tab and then clicking on "Local Storage" in the sidebar.
    })

  event.target.reset()
}

function handleGetUsers() {
  fetch("http://localhost:3000/users", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  })
    .then((response) => response.json())
    .then(console.log)
}
