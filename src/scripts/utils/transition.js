const transition = (showPage, hidePage) => {
  const app = document.querySelector('.app')
  app.style.opacity = 0

  setTimeout(() => {
    hidePage.classList.add('d-none')
    showPage.classList.remove('d-none')
    app.style.opacity = 1
  }, 300)
}

export default transition