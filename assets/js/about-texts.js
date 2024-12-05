async function loadAboutTexts() {
  const response = await fetch('http://127.0.0.1:7777/texts/about', {
    method: 'GET',
  })

  const data = await response.json()
  const texts = data.texts

  const container = document.getElementById('about-container')

  container.innerHTML = `<p style="color: black; font-weight: 700; border-color: #F2BB13; border-style: solid; border-width: 3px; background-color: #F2BB13;"
                        class="rounded-3 p-4 ">${texts[0].content}
                    </p>`
}

document.addEventListener('DOMContentLoaded', loadAboutTexts)