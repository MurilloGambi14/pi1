document.addEventListener('DOMContentLoaded', () => {
  const carouselContent = document.getElementById('carouselContent')

  async function fetchAndRenderFeedbacks() {
    try {
      const response = await fetch('http://127.0.0.1:3333/feedbacks')
      if(!response.ok) {
        throw new Error('Erro ao buscar feedbacks')
      }

      const data = await response.json()
      const feedbacks = data.feedbacks

      if(feedbacks.length === 0) {
        carouselContent.innerHTML = `<p class="text-muted">Nenhum feedback disponível no momento.</p>`
        return
      }

      feedbacks.forEach((feedback, index) => {
        const isActive = index === 0 ? 'active' : ''
        const slide = `<div class="carousel-item ${isActive}">
            <div class="row d-flex justify-content-center">
              <div class="col-lg-8">
                <h5 class="mb-3">${feedback.username}</h5>
                <p class="text-muted">
                  <i class="fas fa-quote-left pe-2"></i>
                  ${feedback.comment}
                </p>
              </div>
            </div>
          </div>`

        carouselContent.insertAdjacentHTML('beforeend', slide)
      })
    } catch (e) {
      console.error('Erro ao buscar feedbacks:', e.message)
      carouselContent.innerHTML = `<p class="text-muted">Ocorreu um erro ao buscar os feedbacks.</p>`
    }
  }

  fetchAndRenderFeedbacks()
})