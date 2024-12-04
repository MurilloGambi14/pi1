const container = document.querySelector('main .container');
const searchBar = document.getElementById('searchBar');

function createGameCard(game) {
    return `
        <div class="col-md-3 mx-3 bordas_jogos mb-3">
            <a href="${game.href}" class="d-block text-decoration-none">
                <img src="${game.photoLink}" alt="Imagem do jogo ${game.name}" class="imagens">
                <p class="d-flex align-items-center justify-content-center legenda_jogos">${game.name}</p>
            </a>
        </div>
    `;
}

function renderGames(games) {
    let htmlContent = '';
    for (let i = 0; i < games.length; i += 3) {
        const row = games.slice(i, i + 3)
            .map(game => createGameCard(game))
            .join('');
        htmlContent += `<div class="row d-flex mt-5 align-items-center justify-content-center">${row}</div>`;
    }
    container.innerHTML = htmlContent;
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

searchBar.addEventListener('input', async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const games = await fetchGames();
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm)
    );
    renderGames(filteredGames);
});

(async function init() {
    const games = await fetchGames();
    renderGames(games);
})();
