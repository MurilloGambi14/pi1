document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault()

  const username = document.getElementById('username').value
  const password = document.getElementById('password').value

  try {
    const response = await fetch('http://127.0.0.1:7777/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    })

    console.log(response.status)
    const data = await response.json()
    console.log(data)

    if(response.ok) {
      showToast('Login realizado com sucesso! Redirecionando...', 'success')
      setTimeout(() => {
        window.location.href = '../dashboard.html'
      }, 2000)
    } else {
      showToast('Erro durante a realização do login!', 'error')
    }
  } catch (e) {
    showToast('Erro durante a realização do login', 'error')
  }
})

function showToast(message, type) {
  VanillaToasts.create({
      text: message,
      type: type === "success" ? "success" : "error",
      timeout: 6000,
      positionClass: "bottomRight"
  });
}