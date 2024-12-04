async function isUserLoggedIn() {
  try {
    const response = await fetch('http://127.0.0.1:3333/auth/verify', {
      method: 'GET',
      credentials: 'include'
    });

    const data = await response.json();
    return data.loggedIn;
  } catch (e) {
    return false;
  }
}

async function validateOrRedirect() {
  if(!await isUserLoggedIn()) {
    window.location.href = 'tela_login.html'
  }
}

async function sendFeedback() {
  const username = document.getElementById('name').value
  const comment = document.getElementById('feedbackTextarea').value
  
  if(!username || !comment) {
    alert('Por favor, preencha todos os campos.')
    return
  }

  const data = { username, comment }

  try {
    const response = await fetch('http://127.0.0.1:3333/feedbacks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    console.log(response)

    if(response.ok) {
      alert('Feedback enviado com sucesso!')
      window.location.reload()
      document.getElementById('name').value = ''
      document.getElementById('feedbackTextarea').value = ''
    } else {
      alert('Erro ao enviar feedback.')
    }
  } catch (e) {
    alert('Erro ao enviar feedback.')
  }
}

async function loadFeedbacks() {
  try {
    const response = await fetch('http://127.0.0.1:3333/feedbacks');
    const feedbacks = await response.json();

    const tableBody = document.getElementById('feedbackTableBody');
    tableBody.innerHTML = '';

    feedbacks.feedbacks.forEach(feedback => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${feedback.username}</td>
        <td>${feedback.comment}</td>
        <td><button class="btn btn-danger" onclick="deleteFeedback('${feedback._id}')">Remover</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert('Erro ao carregar os feedbacks.');
    console.log(error)
  }
}

async function deleteFeedback(feedbackId) {
  try {
    const response = await fetch(`http://127.0.0.1:3333/feedbacks/${feedbackId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Feedback removido com sucesso!');
      loadFeedbacks();
    } else {
      alert('Erro ao remover feedback.');
      console.log(response)
    }
  } catch (error) {
    alert('Erro na conexão com o servidor.');
  }
}

async function logout() {
    await fetch('http://127.0.0.1:3333/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });

    window.location.href = 'tela_login.html'
}

async function updateNavbarForLoggedInUser() {
  const loginLinkDesktop = document.getElementById("loginLink");
  const loginLinkMobile = document.getElementById("loginLinkMobile");

  const loggedIn = await isUserLoggedIn();

  if (loggedIn) {
    if (loginLinkDesktop) {
      loginLinkDesktop.textContent = "Logout";
      loginLinkDesktop.onclick = logout
    }

    if (loginLinkMobile) {
      loginLinkMobile.textContent = "Logout";
      loginLinkMobile.onclick = logout
    }
  } else {
    if (loginLinkDesktop) {
      loginLinkDesktop.textContent = "Logout";
      loginLinkDesktop.onclick = logout
    }

    if (loginLinkMobile) {
      loginLinkMobile.textContent = "Logout";
      loginLinkMobile.onclick = logout
    }
  }
}

const categoryMapping = {
  'main': 'Primeira página',
  'games': 'Página de jogos',
  'about': 'Página sobre',
  'teamHeader': 'Cabeçalho página equipe',
  'team': 'Página da equipe',
  'donate': 'Página de contato'
};

async function loadTexts() {
  try {
    const response = await fetch('http://127.0.0.1:3333/texts');
    const data = await response.json();

    const tableBody = document.getElementById('textTableBody');

    data.texts.forEach(text => {
      console.log(text)
      const categoryName = categoryMapping[text.category] || text.category;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${categoryName}</td>
        <td><textarea class="form-control" rows="4" id="text-${text._id}" data-category="${text.category}">${text.content}</textarea></td>
        <td><button class="btn btn-success" onclick="saveText('${text._id}')">Salvar</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert('Erro ao carregar os textos.');
  }
}

async function saveText(id) {
  const content = document.getElementById(`text-${id}`).value; // Obter o conteúdo do texto

  const data = {
    content: content
  };

  try {
    const response = await fetch(`http://127.0.0.1:3333/texts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Texto salvo com sucesso!');
    } else {
      alert('Erro ao salvar texto. Tente novamente.');
    }
  } catch (error) {
    alert('Erro na conexão com o servidor.');
  }
}

async function fetchGames() {
  try {
      const response = await fetch('http://127.0.0.1:3333/games');
      const data = await response.json();
      return data.games;
  } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      return [];
  }
}

const gameSelect = document.getElementById('gameSelect');
const imageLinkInput = document.getElementById('imageLink');

async function populateGameSelect() {
    try {
        const games = await fetchGames();
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game._id;
            option.textContent = game.name;
            gameSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar jogos para o dropdown:', error);
    }
}

async function updateGameImage() {
    const gameId = gameSelect.value;
    const newImageLink = imageLinkInput.value.trim();

    if (!gameId || !newImageLink) {
        alert('Por favor, selecione um jogo e insira o link da nova imagem.');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:3333/games/${gameId}/photo`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ photoLink: newImageLink }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Imagem atualizada com sucesso!');
            imageLinkInput.value = '';
            gameSelect.value = '';
            const games = await fetchGames();
            renderGames(games);
        } else {
            const errorData = await response.json();
            console.error('Erro ao atualizar imagem:', errorData);
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição para atualizar imagem:', error);
    }
}

populateGameSelect();


window.onload = function () {
  validateOrRedirect();
  loadFeedbacks()
  updateNavbarForLoggedInUser()
  loadTexts()
};