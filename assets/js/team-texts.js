async function loadTeamHeaderTexts() {
  const response = await fetch('http://127.0.0.1:7777/texts/teamHeader', {
    method: 'GET',
  })

  const data = await response.json()
  const texts = data.texts

  const container = document.getElementById('header-container')

  container.innerHTML = `<p style="color:  white ; font-size: 16px; font-weight: 900" class="rounded-3 p-2 mb-3">${texts[0].content}
                        </p>`
}

async function loadStepsTexts() {
  const response = await fetch('http://127.0.0.1:7777/texts/team', {
    method: 'GET',
  });

  const data = await response.json();
  const texts = data.texts;
  const container = document.getElementById('content-container');

  for (let i = 0; i < texts.length; i++) {
    const divRow = document.createElement('div');
    divRow.className = 'row';

    if (i % 2 === 0) {
      const colLeft = document.createElement('div');
      colLeft.className = `col-md-6 p-3 ${i % 2 === 0 ? 'fotos' : ''}`;

      const box = document.createElement('div');
      box.id = `box_equipe${i + 1}`;

      const paragraph = document.createElement('p');
      paragraph.textContent = `${texts[i].content}`;

      if(i === 0) {
        paragraph.id = 'box_equipe2'
      }

      box.appendChild(paragraph);
      colLeft.appendChild(box);

      const colRight = document.createElement('div');
      colRight.className = 'col-md-6 p-0';

      divRow.appendChild(colLeft);
      divRow.appendChild(colRight);
    } else {
      const colLeft = document.createElement('div');
      colLeft.className = 'col-md-6 p-0';

      const colRight = document.createElement('div');
      colRight.className = `col-md-6 p-3 ${i % 2 === 0 ? '' : 'fotos'}`;

      const box = document.createElement('div');
      if(i !== 1) {
        box.id = `box_equipe${i + 1}`;
      }

      const paragraph = document.createElement('p');
      paragraph.textContent = `${texts[i].content}`;

      if(i === 1) {
        paragraph.id = 'box_equipe'
      }

      box.appendChild(paragraph);
      colRight.appendChild(box);

      divRow.appendChild(colLeft);
      divRow.appendChild(colRight);
    }

    container.appendChild(divRow);
  }
}

document.addEventListener('DOMContentLoaded', loadTeamHeaderTexts)
document.addEventListener('DOMContentLoaded', loadStepsTexts)