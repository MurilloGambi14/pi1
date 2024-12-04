document.getElementById('searchBar').addEventListener('input', function() {
  const query = this.value.toLowerCase()
  const items = document.querySelectorAll('.bordas_jogos')

  items.forEach(item => {
    const legenda = item.querySelector('.legenda_jogos').textContent.toLowerCase()

    if(legenda.includes(query)) {
      item.style.display = ''
    } else {
      item.style.display = 'none'
    }
  })
})