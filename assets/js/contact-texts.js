async function loadGamesTexts() {
  const response = await fetch('http://127.0.0.1:7777/texts/donate', {
    method: 'GET',
  })

  const data = await response.json()
  const texts = data.texts

  console.log(texts)

  const container = document.getElementById('contact-container')

  container.innerHTML = `<p style="color:  #ffffffd4; font-size: 20px" class="rounded-3 p-4 mx-5">
                            ${texts[0].content}
                        </p>`
}

document.addEventListener('DOMContentLoaded', loadGamesTexts)