async function loadMainTexts() {
  const response = await fetch('http://127.0.0.1:7777/texts/main', {
    method: 'GET',
  })

  const data = await response.json()
  const texts = data.texts

  const container = document.getElementById('content-container')

  for(let i = 0; i < texts.length; i++) {
    const divRow = document.createElement('div')
    divRow.className = 'row'

    const col1 = document.createElement('div')
    const col2 = document.createElement('div')

    if (i % 2 === 0) {
      col1.className = 'col-md-6 p-3 fotos'
      col2.className = 'col-md-6 p-0'

      const yellowBox = document.createElement('div')
      yellowBox.className = 'yellow-box'

      const paragraph = document.createElement('p')
      paragraph.textContent = texts[i].content

      yellowBox.appendChild(paragraph)
      col1.appendChild(yellowBox)
    } else {
      col1.className = 'col-md-6'
      col2.className = 'col-md-6 p-3'

      const yellowBox = document.createElement('div')
      yellowBox.className = 'yellow-box'

      const paragraph = document.createElement('p')
      paragraph.textContent = texts[i].content

      yellowBox.appendChild(paragraph)
      col2.appendChild(yellowBox)
    }

    divRow.appendChild(col1)
    divRow.appendChild(col2)
    container.appendChild(divRow)
  }
}

document.addEventListener('DOMContentLoaded', loadMainTexts)