async function loadGamesTexts() {
  const response = await fetch('http://127.0.0.1:3333/texts/games', {
    method: 'GET',
  })

  const data = await response.json()
  const texts = data.texts

  console.log(texts)

  const container = document.getElementById('text-container')

  container.innerHTML = `<p>${texts[0].content}</p>`
}

document.addEventListener('DOMContentLoaded', loadGamesTexts)