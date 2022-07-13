import transition from "../utils/transition";
import Localstorage from "./Localstorage";

class Leaderboard {
  leaderboard = document.querySelector('.leaderboard')
  mainPage = document.querySelector('.start-page')
  backToMainBtn = document.querySelector('.leaderboard__back')
  select = document.querySelector('#leaderboard-select')

  initialize = () => {
    this.backToMainBtn.addEventListener('click',
      () => transition(this.mainPage, this.leaderboard))

    this.select.addEventListener('change', this.onChangeMode)
  }

  onChangeMode = () => {
    if (this.select.value === 'practice') {
      this.renderItem('practice')
    } else {
      this.renderItem('timeAttack')
    }
  }

  renderItem = (mode) => {
    const leaderboardList = document.querySelector('.leaderboard__list')
    const gameMode = mode ? mode : Localstorage.getCurrentGameData('mode')
    const storage = Localstorage.getData(gameMode)

    this.select.value = gameMode ? gameMode : 'practice'

    leaderboardList.innerHTML = ''

    storage.sort((a, b) => b.score - a.score)

    storage.forEach(item => {
      leaderboardList.append(this.createItem(item.name, item.score))
    })
  }

  createItem = (name, score) => {
    const playerItem = document.createElement('li')
    const playerName = document.createElement('p')
    const playerScore = document.createElement('p')
    const line = document.createElement('div')

    playerItem.setAttribute('class', 'leaderboard__item')
    playerName.setAttribute('class', 'leaderboard__name')
    playerScore.setAttribute('class', 'leaderboard__score')
    line.setAttribute('class', 'leaderboard__line')

    playerName.textContent = name
    playerScore.textContent = score

    playerItem.append(playerName, line, playerScore)

    return playerItem
  }
}

export default Leaderboard